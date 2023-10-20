import { useRef, useCallback } from "react";

export const useEnter = (callback, props) => {
	//
	const { clearOnEnter = true } = props || {};
	const inputRef = useRef();

	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				const value = inputRef?.current?.value;
				// console.debug(`onEnter: ${value}`);
				if (clearOnEnter) {
					inputRef.current.value = "";
				}
				if (callback) {
					callback(value);
				}
			}
		},
		[callback, clearOnEnter]
	);

	return {
		inputRef,
		handleKeyDown,
	};
};
