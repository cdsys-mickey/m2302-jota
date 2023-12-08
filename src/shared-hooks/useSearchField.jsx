import { useCallback } from "react";

/**
 * 在 focus 狀態按下 esc 將內容清空
 */
const useSearchField = ({ onChange, inputRef, doubleTapToClear = false }) => {
	const handleClear = useCallback(() => {
		console.log("handleClear");
		onChange("");
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
