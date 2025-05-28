/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useContext, useMemo } from "react";

import HttpStatus from "@/shared-classes/HttpStatus";
import WebApi from "@/shared-modules/WebApi.mjs";
import axios from "axios";
import querystring from "query-string";
import Types from "@/shared-modules/Types.mjs";
import ConfigContext from "@/contexts/config/ConfigContext";

const DEFAULT_HEADERS = () => {
	let logKeyInSession = sessionStorage.getItem("LogKey");
	if (logKeyInSession) {
		return {
			LogKey: logKeyInSession
		}
	}
	return null;
};

const DEFAULT_JSON_HEADERS = {
	"Content-Type": "application/json",
};

const DEFAULT_FORM_HEADERS = {
	"Content-Type": "multipart/form-data",
};

const DEFAULT_RESPONSE_OPTS = {
	headers: false
}

/**
 * 呼叫 Web-API,
 * createdAt: 22.12.23
 */
export const useWebApi = (props) => {
	const {
		baseUrl,
		mode: defaultMode = "json",
		withStack = false,
		headers = DEFAULT_HEADERS,
	} = props || {};
	const config = useContext(ConfigContext);

	const _baseUrl = useMemo(() => {
		return baseUrl || config.API_URL || import.meta.env.VITE_URL_API || "/"
	}, [baseUrl, config.API_URL])

	const getUrl = useCallback(
		(relativePath, params) => {
			if (relativePath === undefined || relativePath === null) {
				return null;
			}
			if (!_baseUrl) {
				console.error("baseUrl and REACT_APP_URL_API are both empty");
				return;
			}
			// 應保留彈性, 不包含 PUBLIC_URL

			let result = `${_baseUrl.substring(0, 1) === "/" ? "" : "/"}${_baseUrl.substring(_baseUrl.length - 1) === "/"
				? `${_baseUrl.substring(0, _baseUrl.length - 1)}`
				: _baseUrl
				}/${relativePath.substring(0, 1) === "/"
					? relativePath.substring(1)
					: relativePath
				}`;

			if (params) {
				result += "?" + querystring.stringify(params);
			}

			return result;
		},
		[_baseUrl]
	);

	// const defaultGetOptions = useCallback((payload) => {
	// 	return payload["data"] || [];
	// }, []);

	// const getHeaders = useCallback(() => {
	// 	if (!headers) {
	// 		return null;
	// 	}
	// 	if (Types.isFunction(headers)) {
	// 		return headers();
	// 	}
	// 	return headers;
	// }, [headers]);

	// async 版本
	const sendAsync = useCallback(
		async ({
			url,
			method = "get",
			data,
			params,
			headers: _headers,
			bearer,
			mode = defaultMode,

			...rest
		}, opts = {}) => {
			const { response: responseOpts = DEFAULT_RESPONSE_OPTS } = opts;
			const apiUrl = getUrl(url);
			if (!apiUrl) {
				throw `url cannot be null`;
			}

			// GET 下無 params 而有 data, 就將 data 當成 params 使用
			const isUseDataAsParams =
				method.toLowerCase() === "get" && !params && !!data;
			const _params = isUseDataAsParams ? data : params;

			console.log(`${method.toUpperCase()} ${apiUrl}`);
			if (params) {
				console.log("\tparams", params);
			}
			if (data) {
				console.log("\tdata", data);
			}

			let formData;
			if (mode === "form") {
				formData = new FormData();
				for (const prop in data) {
					formData.append(prop, data[prop]);
				}
				console.log("formData", formData);
			}

			const isUseRawData = method !== "get" && mode !== "form";

			try {
				const axiosResponse = await axios({
					url: apiUrl,
					method: method,
					...(isUseRawData && {
						data,
					}),
					...(mode === "form" && {
						data: formData,
					}),
					params: _params,
					headers: {
						...(mode === "json" && DEFAULT_JSON_HEADERS),
						...(mode === "form" && DEFAULT_FORM_HEADERS),

						// 先列舉 props 內的 headers
						// 再列舉 參數 內的 headers
						...(Types.isFunction(headers) ? headers() : headers),
						...(Types.isFunction(_headers) ? _headers() : _headers),
						...(!!bearer && {
							Authorization: `bearer ${bearer}`,
						}),
					},
					...rest,
				});
				const status = HttpStatus.from(axiosResponse.status);
				console.log(`axiosResponse`, axiosResponse);
				if (status.is2xx) {
					return {
						status: status,
						payload: axiosResponse.data,
						...(responseOpts.headers && {
							headers: axiosResponse.headers
						})
					};
				} else {
					//should not happen, because Axios always throws error when status is not 2xx
					return {
						status: status,
						error: WebApi.getErrorFromResponse(status, axiosResponse, {
							withStack: withStack,
							status: status.code,
							statusText: axiosResponse.statusText,
						}),
					};
				}
			} catch (err) {
				console.error(`sendAsync[${method}]`, err);
				return {
					status: HttpStatus.from(err.response?.status || 500),
					error: err.response?.data
						? WebApi.getErrorFromPayload(err.response.data, {
							withStack: withStack,
							status: err.response.status,
							statusText: err.response.statusText,
						})
						: WebApi.getErrorFromAxiosError(err),
				};
			}
		},
		[defaultMode, getUrl, headers, withStack]
	);

	const httpGetAsync = useCallback(
		({ ...rest }) => {
			return sendAsync({ method: "get", ...rest });
		},
		[sendAsync]
	);

	const httpPostAsync = useCallback(
		({ ...rest }) => {
			return sendAsync({ method: "post", ...rest });
		},
		[sendAsync]
	);

	const httpPutAsync = useCallback(
		({ ...rest }) => {
			return sendAsync({ method: "put", ...rest });
		},
		[sendAsync]
	);

	const httpDeleteAsync = useCallback(
		({ ...rest }) => {
			return sendAsync({ method: "delete", ...rest });
		},
		[sendAsync]
	);

	const httpPatchAsync = useCallback(
		({ ...rest }) => {
			return sendAsync({ method: "patch", ...rest });
		},
		[sendAsync]
	);

	// 
	const getFileNameFromDisposition = useCallback((headers) => {
		let fileName = 'downloaded_file';
		const disposition = headers['content-disposition'];
		if (disposition && disposition.includes('filename=')) {
			const matches = disposition.match(/filename="(.+)"/);
			if (matches && matches[1]) {
				fileName = matches[1];
			}
		}
		return fileName;
	}, []);



	return {
		sendAsync,
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpPatchAsync,
		httpDeleteAsync,
		getUrl,
		fetch,
		getFileNameFromDisposition
	};
};
