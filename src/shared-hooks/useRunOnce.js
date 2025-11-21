import { useEffect, useRef } from "react";
import Types from "@/shared-modules/Types.mjs";

export const useRunOnce = (callback) => {
	const hasRun = useRef(false);
	const cleanupRef = useRef();

	useEffect(() => {
		if (hasRun.current) return;

		hasRun.current = true;
		const result = callback();

		// 如果 callback 回傳一個 cleanup 函數，就存起來
		if (Types.isFunction(result)) {
			cleanupRef.current = result;
		}

		return () => {
			if (cleanupRef.current) {
				cleanupRef.current();
				cleanupRef.current = undefined;
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 可選：回傳是否已初始化
	return hasRun.current;
};
