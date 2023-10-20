import React, { useCallback } from "react";

const useSearchField = ({
	onChange,
	inputRef,
	doubleTapToClear = false,
	...rest
}) => {
	const handleClear = useCallback(() => {
		console.log("handleClear");
		onChange("");
		// if (inputRef.current) {
		// 	inputRef.current.focus();
		// }
	}, [onChange]);

	const handleFocus = useCallback(
		(e) => {
			console.log("handleFocus");
			e?.preventDefault();
			if (inputRef?.current) {
				if (
					document.activeElement === inputRef.current &&
					doubleTapToClear
				) {
					handleClear();
				} else {
					inputRef.current.focus();
				}
			}
		},
		[doubleTapToClear, handleClear, inputRef]
	);

	return {
		handleClear,
		handleFocus,
	};
};

export default useSearchField;
