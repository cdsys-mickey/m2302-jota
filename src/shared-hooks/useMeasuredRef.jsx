import { useState, useCallback, useLayoutEffect, useEffect } from "react";
import useLoaded from "./useLoaded";

const useMeasuredRef = () => {
	const [rect, setRect] = useState();
	const [node, setNode] = useState(null);
	const [loaded, setLoaded] = useLoaded();

	const measuredRef = useCallback((node) => {
		if (node) {
			setNode(node);
		}
	}, []);

	const measure = useCallback(() => {
		const rect = node.getBoundingClientRect();
		setRect(rect);
	}, [node]);

	// 調整視窗大小時觸發
	useLayoutEffect(() => {
		if (node) {
			window.addEventListener("resize", measure);

			return () => {
				window.removeEventListener("resize", measure);
			};
		}
	}, [measure, node]);

	// 首次觸發
	useEffect(() => {
		if (!loaded && node) {
			setLoaded();
			measure();
		}
	}, [loaded, measure, node, setLoaded]);

	return [measuredRef, rect];
};

export default useMeasuredRef;
