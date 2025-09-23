import { useEffect, useRef } from "react";

export const useUnload = (callback, dependencies) => {
	const unloadRef = useRef(false);

	useEffect(() => {
		return () => {
			console.log("unmount");
			if (!unloadRef.current) {
				unloadRef.current = true;
				callback();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callback, ...dependencies]);

	return [unloadRef.current];
};
