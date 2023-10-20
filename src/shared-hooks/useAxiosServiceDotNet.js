import { useCallback, useState, useRef } from "react";

import axios from "axios";
import { SessionExpiredError } from "@/shared-errors/SessionExpiredError";
import LoadingState from "@/shared-constants/loading-states";
import { ApiError } from "@/shared-constants/errors";
import { RefreshMode } from "./useApiService";
import HttpStatus from "@/shared-classes/HttpStatus";
import PageResult from "@/shared-classes/PageResult";

const DEFAULT_HEADERS = {
	"Content-Type": "application/json",
};

const useAxiosServiceDotNet = (props) => {
	const {
		handleSessionExpired,
		defaultPageSize,
		fetchUrl,
		loadingDelay = 500,
		stacktrace = false,
	} = props || {};
	const [fetchState, setFetchState] = useState({
		data: null,
		pageResult: null,
		saveKey: null,
		loading: null,
		criteria: null,
		error: null,
		page: 1,
	});
	const [pageSize, setPageSize] = useState(defaultPageSize);

	const [actionState, setActionState] = useState({
		action: null,
		actionLoading: null,
		actionTarget: null,
		actionTargetId: null,
		actionError: null,
	});

	const getUrl = useCallback((url) => {
		if (!import.meta.env.VITE_URL_API) {
			console.error("尚未定義 REACT_APP_URL_API!");
			return;
		}
		// 應保留彈性, 不包含 PUBLIC_URL
		const apiUrl = `${import.meta.env.VITE_URL_API || }`;
		return `${apiUrl.substring(0, 1) === "/" ? "" : "/"}${
			apiUrl.substring(apiUrl.length - 1) === "/"
				? `${apiUrl.substring(0, apiUrl.length - 1)}`
				: apiUrl
		}/${url.substring(0, 1) === "/" ? url.substring(1) : url}`;
	}, []);

	const getErrorFromHttpResponse = useCallback(
		(httpResponse) => {
			let errorMessage = "";
			const httpStatus = httpResponse.status;
			if (httpResponse.data?.message) {
				errorMessage += httpResponse.data?.message;
			} else {
				errorMessage += httpResponse.statusText;
			}
			console.error(`http error ${httpStatus}: ${errorMessage}`);
			switch (httpStatus) {
				case 403:
					if (handleSessionExpired) {
						handleSessionExpired();
					} else {
						return new SessionExpiredError(errorMessage);
					}
					break;
				default:
					return new ApiError(
						httpResponse.status,
						httpResponse.data?.message || httpResponse.statusText
					);
			}
		},
		[handleSessionExpired]
	);

	const getErrorFromPayload = useCallback(
		(payload) => {
			//try to parse axiosResponse.data as json
			let result = {};
			if (!payload) return result;
			result["message"] = payload?.Message;
			result["type"] = payload?.Type;
			if (stacktrace) {
				result["stacktrace"] = payload?.StackTrace;
			}
			return result;
		},
		[stacktrace]
	);

	const send = useCallback(
		({ url, method, data, headers, ...rest }) => {
			return new Promise((resolve, reject) => {
				axios({
					url: getUrl(url),
					method: method,
					data: data,
					params:
						method === "get"
							? {
									...data,
							  }
							: null,
					headers: {
						// 先列舉 props 內的 headers
						...DEFAULT_HEADERS,
						// 再列舉 參數 內的 headers
						...headers,
					},
					...rest,
				})
					.then((httpResponse) => {
						const httpStatus = httpResponse.status;
						//2xx
						if (2 === Math.floor(httpStatus / 100)) {
							// 2020.11.13 直接在 api 層級就 throw result == 0 的回應
							const response = httpResponse.data;
							if (response.successful) {
								resolve(response, httpResponse);
							} else {
								throw response;
							}
						} else {
							// 2020.12.29 直接在 API 層級就
							reject(getErrorFromHttpResponse(httpResponse));
						}
					})
					.catch((err) => {
						if (err?.response) {
							reject(getErrorFromHttpResponse(err.response));
						} else {
							reject(err);
						}
					});
			});
		},
		[getErrorFromHttpResponse, getUrl]
	);

	// async 版本
	const sendAsync = useCallback(
		async ({ url, method, data, headers, ...rest }) => {
			try {
				const axiosResponse = await axios({
					url: getUrl(url),
					method: method,
					data: method !== "get" ? data : null,
					params:
						method === "get"
							? {
									...data,
							  }
							: null,
					headers: {
						// 先列舉 props 內的 headers
						...DEFAULT_HEADERS,
						// 再列舉 參數 內的 headers
						...headers,
					},
					...rest,
				});
				return {
					status: HttpStatus.from(axiosResponse.status),
					payload: axiosResponse.data,
				};
			} catch (err) {
				console.error(err);
				return {
					status: HttpStatus.from(err.response.status),
					payload: err.response.data,
					error: getErrorFromPayload(err.response.data),
				};
			}
		},
		[getUrl, getErrorFromPayload]
	);

	const httpGetAsync = useCallback(
		({ url, data, headers }) => {
			return sendAsync({ url, method: "get", data, headers });
		},
		[sendAsync]
	);

	const httpGet = useCallback(
		({ url, data, headers }) => {
			return send({ url, method: "get", data, headers });
		},
		[send]
	);

	const httpPostAsync = useCallback(
		({ url, data, headers }) => {
			return sendAsync({ url, method: "post", data, headers });
		},
		[sendAsync]
	);

	const httpPost = useCallback(
		({ url, data, headers }) => {
			return send({ url, method: "post", data, headers });
		},
		[send]
	);

	const httpPutAsync = useCallback(
		({ url, data, headers }) => {
			return sendAsync({ url, method: "put", data, headers });
		},
		[sendAsync]
	);
	const httpPut = useCallback(
		({ url, data, headers }) => {
			return send({ url, method: "put", data, headers });
		},
		[send]
	);

	const httpDeleteAsync = useCallback(
		({ url, data, headers }) => {
			return sendAsync({ url, method: "delete", data, headers });
		},
		[sendAsync]
	);
	const httpDelete = useCallback(
		({ url, data, headers }) => {
			return send({ url, method: "delete", data, headers });
		},
		[send]
	);

	const httpPatchAsync = useCallback(
		({ url, data, headers }) => {
			return sendAsync({ url, method: "patch", data, headers });
		},
		[sendAsync]
	);
	const httpPatch = useCallback(
		({ url, data, headers }) => {
			return send({ url, method: "patch", data, headers });
		},
		[send]
	);

	const delayTimer = useRef(null);

	const delayLoading = useCallback(() => {
		console.debug("delay loading...");
		clearTimeout(delayTimer.current);
		delayTimer.current = setTimeout(() => {
			if (delayTimer.current) {
				console.debug("loading...");
				setFetchState((prevState) => ({
					...prevState,
					loading: LoadingState.LOADING,
				}));
			} else {
				console.debug("loaded");
			}
		}, loadingDelay);
	}, [loadingDelay]);

	const fetch = useCallback(
		async (props) => {
			const {
				params,
				page = 1,
				size = pageSize,
				refresh = RefreshMode.AUTO,
			} = props || { page: 1, size: pageSize, refresh: RefreshMode.AUTO };
			try {
				if (page && size) {
					setPageSize(size);
				}
				//有帶 params 參數則代表 賦予 criteria 及強制 loading
				if (refresh === RefreshMode.AUTO) {
					delayLoading();
				}

				setFetchState((prevState) => ({
					...prevState,
					loading:
						refresh === RefreshMode.REFRESH
							? LoadingState.LOADING
							: prevState.loading,
					criteria: params ? params : prevState.criteria,
					error: null,
					page: page,
				}));

				const response = await httpGetAsync({
					url: fetchUrl,
					data: params
						? {
								...params,
								page,
								size: size || pageSize,
						  }
						: {
								...fetchState.criteria,
								page,
								size: size || pageSize,
						  },
				});
				delayTimer.current = null;
				console.debug(response, "fetch response");

				const numberOfElements = response.data?.length || 0;
				// API 回應包括分頁資訊才更新 pageResult
				if (response.Select) {
					const totalElements = response.Select?.TotalRecord || 0;

					const pageResult = PageResult.of(totalElements, size);

					const totalPages = Math.floor(
						(totalElements + size - 1) / size
					);
					setFetchState((prevState) => ({
						...prevState,
						data: response.data,
						saveKey: response.Select?.SaveKey,
						pageResult: {
							totalPages,
							totalElements,
							numberOfElements,
							// page,
							size,
						},
						loading: LoadingState.DONE,
						// criteria: params,
					}));
				} else {
					setFetchState((prevState) => ({
						...prevState,
						data: response.data,
						pageResult: {
							...prevState.pageResult,
							numberOfElements,
							// page,
						},
						loading: LoadingState.DONE,
					}));
				}
			} catch (err) {
				console.warn(err);
				setFetchState((prevState) => ({
					...prevState,
					loading: LoadingState.FAILED,
					error: err,
				}));
			}
		},
		[delayLoading, fetchState.criteria, fetchUrl, httpGetAsync, pageSize]
	);

	const fetchMore = useCallback(
		async (page) => {
			//檢查
			if (!page && !fetchState.page) {
				throw new Error("未指定 page 參數且 fetchState.page 亦為空白");
			}

			//為了讓 scrollIntoView 可以接著運作, 必須 await
			if (fetchState.saveKey) {
				// 翻頁
				await fetch({
					page: page || fetchState.page,
					size: pageSize,
					refresh: RefreshMode.AUTO,
					params: {
						sk: fetchState.saveKey,
					},
				});
			} else {
				await fetch({
					page: page || fetchState.page,
					size: pageSize,
					// refresh: true,
				});
			}
		},
		[fetch, fetchState.page, fetchState.saveKey, pageSize]
	);

	const load = useCallback(
		async (actionTargetId, refresh = RefreshMode.REFRESH) => {
			console.debug(`load ${actionTargetId}`);
			if (!fetchUrl) {
				console.error("fetchUrl is not defined");
			}
			try {
				if (actionTargetId) {
					setActionState((prevState) => ({
						...prevState,
						actionLoading: LoadingState.LOADING,
						actionError: null,
						actionTargetId: actionTargetId,
					}));
				} else {
					setActionState((prevState) => ({
						...prevState,
						actionError: null,
					}));
				}
				const response = await httpGetAsync({
					url:
						fetchUrl + (actionTargetId ? "/" + actionTargetId : ""),
				});
				console.debug(response);
				if (actionTargetId) {
					setActionState((prevState) => ({
						...prevState,
						actionLoading: LoadingState.DONE,
						actionError: null,
					}));
				}
				return response;
			} catch (err) {
				console.warn(err);
				setActionState((prevState) => ({
					...prevState,
					actionLoading: LoadingState.FAILED,
					actionError: err,
				}));
			}
		},
		[fetchUrl, httpGetAsync]
	);

	const reorder = useCallback(
		(startIndex, endIndex) => {
			if (startIndex === endIndex) return;
			const result = Array.from(fetchState.data);
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);
			console.debug(`reorder: startIndex -> endIndex`);
			setFetchState((prevState) => ({
				...prevState,
				data: result,
			}));
			//async api
			const response = httpPatch({
				url: fetchUrl,
				data: result.map((c, index) => ({ id: c.id, seq: index + 1 })),
			});
			console.debug(response);
			return response;
		},
		[fetchState.data, fetchUrl, httpPatch]
	);

	const cancelFetch = useCallback(() => {
		setFetchState((prevState) => ({
			...prevState,
			data: null,
			loading: null,
			criteria: null,
		}));
	}, []);

	const cancelAction = useCallback(() => {
		console.debug("cancelAction");
		setActionState((prevState) => ({
			...prevState,
			action: null,
			actionLoading: null,
			actionTarget: null,
			// actionTargetId: null,
			actionError: null,
		}));
	}, []);

	const setPage = (newPage) => {
		setFetchState((prevState) => ({
			...prevState,
			page: newPage,
		}));
	};

	return {
		send,
		sendAsync,
		httpGetAsync,
		httpGet,
		httpPost,
		httpPostAsync,
		httpPut,
		httpPutAsync,
		httpPatch,
		httpPatchAsync,
		httpDelete,
		httpDeleteAsync,
		getUrl,
		fetch,
		fetchMore,
		cancelFetch,
		reorder,
		fetchState,
		setFetchState,
		actionState,
		setActionState,
		load,
		cancelAction,
		setPage,
	};
};

export default useAxiosServiceDotNet;
