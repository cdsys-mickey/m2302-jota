import Types from "@/shared-modules/Types.mjs";
import { useEffect, useRef } from "react";

export const useInit = (callback, dependencies) => {
	const loadedRef = useRef(false);
	const unloadedRef = useRef(false);

	useEffect(() => {
		let unloadCallback;
		if (!loadedRef.current) {
			loadedRef.current = true;
			unloadCallback = callback();
		}
		return () => {
			if (!unloadedRef.current && unloadCallback) {
				unloadedRef.current = true;
				if (Types.isFunction(unloadCallback)) {
					unloadCallback();
				} else {
					console.warn("unloadCallback is not a function", unloadCallback)
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callback, ...dependencies]);

	return [loadedRef.current];
};
