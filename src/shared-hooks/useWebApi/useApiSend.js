import { useState, useCallback } from "react";
import { useRunOnce } from "shared-components";
import useWebApiAsync from "./useWebApiAsync";

export default function useApiSend(options = {}, config) {
	const {
		url,
		method = "get",
		data,
		params,
		immediate = false,
		...restOpts
	} = options;

	const { sendAsync } = useWebApiAsync(config);

	const [state, setState] = useState({
		payload: null,
		error: null,
		status: null,
		headers: null,
		isWorking: false,
	});

	const handleSend = useCallback(
		async (overrideOpts = {}) => {
			const finalOpts = {
				url: overrideOpts.url ?? url,
				method: overrideOpts.method ?? method,
				data: overrideOpts.data ?? data,
				params: overrideOpts.params ?? params,
				...restOpts,
				...overrideOpts,
			};

			setState((prev) => ({ ...prev, isWorking: true, error: null }));

			try {
				const response = await sendAsync(finalOpts);

				setState((prev) => ({
					...prev,
					...response,
					isWorking: false,
				}));

				return response;
			} catch (err) {
				setState((prev) => ({
					...prev,
					error: err,
					isWorking: false,
				}));
				throw err; // 讓呼叫端也可以 catch
			}
		},
		[url, method, data, params, restOpts, sendAsync],
	);

	// 自動載入（只在 mount 時一次）
	useRunOnce(() => {
		if (immediate !== false) {
			handleSend();
		}
	});

	const invoke = useCallback(
		(newOpts) => {
			return handleSend(newOpts);
		},
		[handleSend],
	);

	const mutate = useCallback((newData) => {
		setState((prev) => ({
			...prev,
			payload:
				typeof newData === "function" ? newData(prev.payload) : newData,
		}));
	}, []);

	return {
		...state,
		data: state.payload, // 慣用別名
		loading: state.isWorking, // 慣用別名
		mutate,
		invoke,
	};
}

export const useApiGet = (opts, config) =>
	useApiSend({ ...opts, method: "get", immediate: true }, config);
export const useApiPost = (opts, config) =>
	useApiSend({ ...opts, method: "post", immediate: true }, config);
export const useApiPut = (opts, config) =>
	useApiSend({ ...opts, method: "put", immediate: true }, config);
export const useApiDelete = (opts, config) =>
	useApiSend({ ...opts, method: "delete", immediate: true }, config);
