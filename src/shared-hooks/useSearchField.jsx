import { useCallback } from "react";

/**
 * 在 focus 狀態按下 esc 將內容清空
 */
const useSearchField = ({ onChange, inputRef, doubleFocusToClear = false }) => {
	const handleClear = useCallback(() => {
		console.log("handleClear");
		onChange("");
	}, [onChange]);

	const handleFocus = useCallback(
		(e) => {
			console.log("handleFocus");
			e?.preventDefault();
			if (inputRef?.current) {
				console.log(`document.activeElement:`, document.activeElement);
				if (
					document.activeElement === inputRef.current &&
					doubleFocusToClear
				) {
					handleClear();
				} else {
					inputRef.current.focus();
				}
			}
		},
		[doubleFocusToClear, handleClear, inputRef]
	);

	return {
		handleClear,
		handleFocus,
	};
};

export default useSearchField;
