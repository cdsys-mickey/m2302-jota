/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useContext, useMemo } from "react";

import HttpStatus from "@/shared-classes/HttpStatus";
import WebApi from "@/shared-modules/sd-web-api";
import axios from "axios";
import querystring from "query-string";
import Types from "@/shared-modules/sd-types";
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

/**
 * 呼叫 Web-API,
 * createdAt: 22.12.23
 */
export const useWebApi = (props) => {
	const {
		baseUrl,
		mode: defaultMode = "json",
		withStackTrace = false,
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

	// const defaultGetData = useCallback((payload) => {
	// 	return payload["data"] || [];
	// }, []);

	const getHeaders = useCallback(() => {
		if (!headers) {
			return null;
		}
		if (Types.isFunction(headers)) {
			return headers();
		}
		return headers;
	}, [headers]);

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
		}) => {
			const apiUrl = getUrl(url);
			if (!apiUrl) {
				throw `url cannot be null`;
			}

			const isUseDataAsParams =
				method.toLowerCase() === "get" && !params && !!data;
			const activeParams = isUseDataAsParams ? data : params;

			console.log(`${method.toUpperCase()} ${apiUrl}`);
			if (params) {
				console.log("\tparams", params);
			}
			if (data) {
				console.log("\tdata", data);
			}
			// if (!isUseDataAsParams && data) {
			// 	console.log("data:", data);
			// }

			let formData;
			if (mode === "form") {
				formData = new FormData();
				for (const prop in data) {
					formData.append(prop, data[prop]);
				}
				console.log("formData", formData);
			}

			const isUseRawData = method !== "get" && mode !== "form";

			// const hasParams = isUseDataAsParams || params;
			// console.log(`isUseDataAsParams`, isUseDataAsParams);
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
					params: activeParams,
					// ...(hasParams && {
					// 	params: isUseDataAsParams ? data : params,
					// }),
					// ...(isUseDataAsParams && {
					// 	params: data,
					// }),
					headers: {
						// 先列舉 props 內的 headers
						// ...DEFAULT_HEADERS,
						...getHeaders(),
						..._headers,
						// 再列舉 參數 內的 headers
						...(!!bearer && {
							Authorization: `bearer ${bearer}`,
						}),
						...(mode === "json" && DEFAULT_JSON_HEADERS),
						...(mode === "form" && DEFAULT_FORM_HEADERS),
					},
					...rest,
				});
				const status = HttpStatus.from(axiosResponse.status);
				// console.log(`payload`, axiosResponse.data);
				if (status.is2xx) {
					return {
						status: status,
						payload: axiosResponse.data,
					};
				} else {
					//should not happen, because Axios always throws error when status is not 2xx
					return {
						status: status,
						error: WebApi.getErrorFromResponse(status, axiosResponse, {
							withStackTrace: withStackTrace,
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
							withStackTrace: withStackTrace,
							status: err.response.status,
							statusText: err.response.statusText,
						})
						: err,
				};
			}
		},
		[defaultMode, getHeaders, getUrl, withStackTrace]
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

	return {
		sendAsync,
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpPatchAsync,
		httpDeleteAsync,
		getUrl,
		fetch,
	};
};
