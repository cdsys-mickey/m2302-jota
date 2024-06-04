import { useCallback } from "react";

import axios from "axios";
import HttpStatus from "@/shared-classes/HttpStatus";
import querystring from "query-string";
import WebApi from "@/shared-modules/sd-web-api";
import { AxiosError } from "axios";

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
		mode: defaultMode = "json",
		withStackTrace = false,
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
		async ({
			url,
			method = "get",
			data,
			params,
			headers,
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

			console.log(
				`${method.toUpperCase()} ${apiUrl}, params:`,
				activeParams
			);
			if (!isUseDataAsParams) {
				console.log("data:", data);
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
						error: WebApi.getErrorFromPayload(axiosResponse.data, {
							withStackTrace: withStackTrace,
							status: status.code,
							statusText: axiosResponse.statusText,
						}),
					};
				}
			} catch (err) {
				console.error(`sendAsync[${method}]`, err);
				if (err instanceof AxiosError) {
					return {
						status: HttpStatus.from(500),
						error: err,
					};
				}
				return {
					status: HttpStatus.from(err.response.status),
					error: WebApi.getErrorFromPayload(err.response.data, {
						withStackTrace: withStackTrace,
						status: err.response.status,
						statusText: err.response.statusText,
					}),
				};
			}
		},
		[defaultMode, getUrl, withStackTrace]
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
