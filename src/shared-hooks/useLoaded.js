import { useCallback, useRef } from "react";

const useLoaded = (defauleValue = false) => {
	const loadedRef = useRef(defauleValue);

	const setLoaded = useCallback(() => {
		loadedRef.current = true;
	}, []);

	return [loadedRef.current, setLoaded];
};

export default useLoaded;
