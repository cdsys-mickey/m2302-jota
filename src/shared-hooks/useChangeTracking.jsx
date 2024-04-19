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
	const { tag = "" } = opts;
	const prevRef = useRef();

	// const debouncedValues = useDebounce(dependencies, delay);

	// const debouncedJson = useMemo(() => {
	// 	return JSON.stringify(debouncedValues);
	// }, [debouncedValues]);
	const dependenciesJson = useMemo(() => {
		return JSON.stringify(dependencies);
	}, [dependencies]);

	const head = useMemo(() => {
		return tag ? "[" + tag + "] " : "";
	}, [tag]);

	useEffect(() => {
		if (dependenciesJson !== prevRef.current) {
			// dont fire on first render
			if (prevRef.current) {
				console.log(
					`${head}useChangeTracking changed detected, dependencies:`,
					dependencies
				);
				callback();
			} else {
				console.log(
					`${head}useChangeTracking init, dependencies:`,
					dependencies
				);
			}
			prevRef.current = dependenciesJson;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...dependencies]);

	return {};
};
