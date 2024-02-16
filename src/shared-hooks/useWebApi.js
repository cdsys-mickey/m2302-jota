import { useCallback } from "react";

import axios from "axios";
import HttpStatus from "@/shared-classes/HttpStatus";
import querystring from "query-string";
import WebApi from "@/shared-modules/sd-web-apis";

const DEFAULT_HEADERS = {};

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
		baseUrl = import.meta.env.VITE_URL_API || "/",
		mode = "json",
		stacktrace = false,
	} = props || {};

	const getUrl = useCallback(
		(relativePath, params) => {
			if (relativePath === undefined || relativePath === null) {
				return null;
			}
			if (!baseUrl) {
				console.error("baseUrl and REACT_APP_URL_API are both empty");
				return;
			}
			// 應保留彈性, 不包含 PUBLIC_URL

			let result = `${baseUrl.substring(0, 1) === "/" ? "" : "/"}${
				baseUrl.substring(baseUrl.length - 1) === "/"
					? `${baseUrl.substring(0, baseUrl.length - 1)}`
					: baseUrl
			}/${
				relativePath.substring(0, 1) === "/"
					? relativePath.substring(1)
					: relativePath
			}`;

			if (params) {
				result += "?" + querystring.stringify(params);
			}

			return result;
		},
		[baseUrl]
	);

	// const defaultGetData = useCallback((payload) => {
	// 	return payload["data"] || [];
	// }, []);

	// async 版本
	const sendAsync = useCallback(
		async ({ url, method, data, params, headers, bearer, ...rest }) => {
			const apiUrl = getUrl(url);
			if (!apiUrl) {
				throw `url cannot be null`;
			}
			console.log(`${method.toUpperCase()} ${apiUrl}, params:`, params);
			if (data) {
				console.log("data:", data);
			}

			let formData;
			if (mode === "form") {
				formData = new FormData();
				for (const prop in data) {
					formData.append(prop, data[prop]);
				}
			}

			const isUseRawData = method !== "get" && mode !== "form";
			const useDataAsParams = method === "get" && !params && !!data;
			// console.log(`useDataAsParams`, useDataAsParams);
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
					...(useDataAsParams && {
						params: data,
					}),
					...(params && {
						params: params,
					}),
					headers: {
						// 先列舉 props 內的 headers
						...DEFAULT_HEADERS,
						...headers,
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
				console.log(`payload`, axiosResponse.data);
				if (status.is2xx) {
					return {
						status: status,
						payload: axiosResponse.data,
					};
				} else {
					//should not happen
					return {
						status: status,
						error: WebApi.getErrorFromPayload(axiosResponse.data, {
							stacktrace,
							status: status.code,
						}),
					};
				}
			} catch (err) {
				console.error(err);
				return {
					status: HttpStatus.from(err.response.status),
					error: WebApi.getErrorFromPayload(err.response.data, {
						stacktrace,
						status: err.response.status,
					}),
				};
			}
		},
		[getUrl, mode, stacktrace]
	);

	const httpGetAsync = useCallback(
		({ url, ...rest }) => {
			return sendAsync({ url, method: "get", ...rest });
		},
		[sendAsync]
	);

	const httpPostAsync = useCallback(
		({ url, ...rest }) => {
			return sendAsync({ url, method: "post", ...rest });
		},
		[sendAsync]
	);

	const httpPutAsync = useCallback(
		({ url, ...rest }) => {
			return sendAsync({ url, method: "put", ...rest });
		},
		[sendAsync]
	);

	const httpDeleteAsync = useCallback(
		({ url, ...rest }) => {
			return sendAsync({ url, method: "delete", ...rest });
		},
		[sendAsync]
	);

	const httpPatchAsync = useCallback(
		({ url, ...rest }) => {
			return sendAsync({ url, method: "patch", ...rest });
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
