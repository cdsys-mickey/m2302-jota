import { useEffect, useMemo, useRef } from "react";
import deepEqual from "fast-deep-equal";
import consoleEx from "@/helpers/consoleEx";

const DEFAULT_OPTS = {
	// delay: 0,
	debug: false,
	triggerFirstChange: false
};

export const useChangeTracking = (
	callback,
	dependencies,
	opts = DEFAULT_OPTS
) => {
	const { tag, debug, triggerFirstChange } = opts;
	const prevRef = useRef(dependencies);

	const head = useMemo(() => {
		return tag ? "[" + tag + "] " : "";
	}, [tag]);

	useEffect(() => {
		if (!deepEqual(dependencies, prevRef.current)) {
			if (debug) {
				console.log(`${head}偵測到異動`,
					prevRef.current,
					dependencies
				);
			}

			// dont fire on first render
			if (prevRef.current != null) {
				callback();
			} else if (triggerFirstChange) {
				consoleEx.warn("first change triggered→", dependencies);
				callback();
			}
			prevRef.current = dependencies;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, dependencies);

	return {};
};
