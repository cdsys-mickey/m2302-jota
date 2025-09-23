import Types from "@/shared-modules/Types.mjs";
import { useEffect, useRef } from "react";

export const useRunOnce = (callback) => {
	const loadedRef = useRef(false);
	const unloadedRef = useRef(false);

	useEffect(() => {
		let unloadCallback;
		if (!loadedRef.current) {
			if (Types.isFunction(callback)) {
				loadedRef.current = true;
				unloadCallback = callback();
			} else {
				console.warn("callback is not a function", callback);
			}
		}
		return () => {
			if (!unloadedRef.current && unloadCallback) {
				unloadedRef.current = true;
				if (Types.isFunction(unloadCallback)) {
					unloadCallback();
				} else {
					console.warn("unloadCallback is not a function", unloadCallback);
				}
			}
		};
	}, [callback]);

	return loadedRef.current;
};