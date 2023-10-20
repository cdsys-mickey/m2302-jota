import { useCallback, useRef, useEffect } from "react";

const useInit = (callback, dependencies = []) => {
	const loadedRef = useRef(false);

	const setLoaded = useCallback((value) => {
		loadedRef.current = value;
	}, []);

	useEffect(() => {
		if (!loadedRef.current) {
			loadedRef.current = true;
			callback();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callback, setLoaded, ...dependencies]);

	return [loadedRef.current, setLoaded];
};

export default useInit;
