import { useCallback, useState } from "react";
import useDebounce from "./useDebounce";

export const useScrollTop = ({ debounce = 0 } = {}) => {
	const [scrollInfo, setScrollInfo] = useState({
		scrollTop: 0,
		yOffset: 0,
	});
	const debouncedScrollTop = useDebounce(scrollInfo.scrollTop, debounce);
	const debouncedYOffset = useDebounce(scrollInfo.yOffset, debounce);
	const onScroll = useCallback((e) => {
		const currentScrollTop = e.target?.scrollTop || 0;
		// console.log(`currentScrollTop`, e);
		setScrollInfo((prev) => ({
			scrollTop: currentScrollTop,
			yOffset: prev.scrollTop - currentScrollTop,
		}));
	}, []);

	const handleReset = useCallback(() => {
		setScrollInfo({
			scrollTop: 0,
			yOffset: 0,
		});
	}, []);

	return {
		scrollTop: debounce > 0 ? debouncedScrollTop : scrollInfo.scrollTop,
		yOffset: debounce > 0 ? debouncedYOffset : scrollInfo.yOffset,
		onScroll,
		onReset: handleReset,
	};
};
