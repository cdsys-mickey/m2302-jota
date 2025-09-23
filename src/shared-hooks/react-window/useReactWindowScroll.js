import { useCallback, useState } from "react";
import useDebounce from "@/shared-hooks/useDebounce";

export const useReactWindowScroll = ({ debounce = 0 } = {}) => {
	const [scrollInfo, setScrollInfo] = useState({
		scrollOffset: 0,
		scrollDirection: null,
		yOffset: 0,
	});
	const debouncedScrollTop = useDebounce(scrollInfo.scrollOffset, debounce);
	const debouncedYOffset = useDebounce(scrollInfo.yOffset, debounce);
	const onScroll = useCallback((i) => {
		const scrollOffset = i?.scrollOffset || 0;
		// console.log(`scrollOffset`, i);
		setScrollInfo((prev) => ({
			scrollOffset: scrollOffset,
			yOffset: prev.scrollOffset - scrollOffset,
		}));
	}, []);

	const handleReset = useCallback(() => {
		setScrollInfo({
			scrollOffset: 0,
			yOffset: 0,
		});
	}, []);

	return {
		scrollOffset:
			debounce > 0 ? debouncedScrollTop : scrollInfo.scrollOffset,
		yOffset: debounce > 0 ? debouncedYOffset : scrollInfo.yOffset,
		onScroll,
		onReset: handleReset,
	};
};
