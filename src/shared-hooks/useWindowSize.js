import { useState, useLayoutEffect } from "react";

export const useWindowSize = () => {
	const [size, setSize] = useState({
		height: 300,
		width: 300,
	});
	useLayoutEffect(() => {
		function updateSize() {
			setSize({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
};
