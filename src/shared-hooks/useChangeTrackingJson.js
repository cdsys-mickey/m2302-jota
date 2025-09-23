import { useEffect, useMemo, useRef } from "react";


const defaultOpts = {
	// delay: 0,
	debug: false,
};

export const useChangeTrackingJson = (
	callback,
	dependencies,
	opts = defaultOpts
) => {
	const { tag, debug } = opts;
	const prevRef = useRef();

	const dependenciesJson = useMemo(() => {
		return JSON.stringify(dependencies);
	}, [dependencies]);

	const head = useMemo(() => {
		return tag ? "[" + tag + "] " : "";
	}, [tag]);

	useEffect(() => {
		if (prevRef.current != dependenciesJson) {
			// dont fire on first render
			if (prevRef.current) {
				callback();
			}
			if (debug) {
				console.log(
					`${head}useChangeTracking changed detected, dependencies:`,
					dependencies
				);
				console.log("prevRef.current", prevRef.current);
			}
			prevRef.current = dependenciesJson;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...dependencies]);

	return {};
};
