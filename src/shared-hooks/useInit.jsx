import { useEffect, useRef } from "react";

export const useInit = (callback, dependencies) => {
	const loadedRef = useRef(false);

	useEffect(() => {
		if (!loadedRef.current) {
			loadedRef.current = true;
			callback();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callback, ...dependencies]);

	return [loadedRef.current];
};
