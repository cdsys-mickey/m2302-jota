import { useEffect } from "react";
import { useRef } from "react";
import useDebounce from "./useDebounce";
import { useMemo } from "react";

const defaultOpts = {
	delay: 0,
};

export const useChangeTracking = (
	callback,
	dependencies,
	opts = defaultOpts
) => {
	const { delay } = opts;
	const prevRef = useRef();

	const debouncedValues = useDebounce(dependencies, delay);

	const debouncedJson = useMemo(() => {
		return JSON.stringify(debouncedValues);
	}, [debouncedValues]);

	useEffect(() => {
		if (debouncedJson !== prevRef.current) {
			// dont fire on first render
			if (prevRef.current) {
				console.log("changed detected");
				callback();
			}
			prevRef.current = debouncedJson;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [callback, ...dependencies]);

	return {};
};
