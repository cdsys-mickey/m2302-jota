import { useEffect, useMemo, useRef } from "react";
import deepEqual from "fast-deep-equal";

const defaultOpts = {
	// delay: 0,
	debug: false,
};

export const useChangeTracking = (
	callback,
	dependencies,
	opts = defaultOpts
) => {
	const { tag, debug } = opts;
	const prevRef = useRef(dependencies);

	const head = useMemo(() => {
		return tag ? "[" + tag + "] " : "";
	}, [tag]);

	useEffect(() => {
		if (!deepEqual(dependencies, prevRef.current)) {
			prevRef.current = dependencies;
			// dont fire on first render
			if (prevRef.current) {
				callback();
			}
			if (debug) {
				console.log(`${head}prevRef.current→dependencies`, prevRef.current, dependencies);
			}

		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...dependencies]);

	return {};
};
