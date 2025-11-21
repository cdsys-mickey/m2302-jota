import { useState } from "react";
import { useWebApiAsync } from "./useWebApiAsync";
import { useCallback } from "react";
import { useRunOnce } from "../useRunOnce";

export default function useHttpGet(opts, config) {
	const { httpGetAsync } = useWebApiAsync(config);
	const [state, setState] = useState({
		payload: null,
		error: null,
		status: null,
		isWorking: false,
	});

	const invoke = useCallback(async () => {
		setState((prev) => ({ ...prev, isWorking: true }));

		try {
			const response = await httpGetAsync(opts);
			setState((prev) => ({
				...prev,
				...response,
				isWorking: false,
			}));
		} catch (err) {
			setState((prev) => ({
				...prev,
				error: err,
				isWorking: false,
			}));
		}
	}, [httpGetAsync, opts]);

	// 只在 mount 時執行一次
	useRunOnce(() => {
		invoke();
	});

	// 手動 reload（強烈建議加上！）
	const reload = useCallback(() => {
		invoke();
	}, [invoke]);

	return {
		...state,
		reload, // 讓外面可以手動重打
	};
}
