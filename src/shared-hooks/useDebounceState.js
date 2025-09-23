import { useState, useEffect, useRef } from "react";

const useDebounceState = (value, delay = 100) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	const timeoutRef = useRef(null);

	useEffect(() => {
		// 先清除之前的 timer
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		// 設置新的 timer
		timeoutRef.current = setTimeout(() => {
			setDebouncedValue(value);
			timeoutRef.current = null; // 清空 ref
		}, delay);

		// 在元件卸載時清除計時器
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [value, delay]);

	// 修改 setDebouncedValue，使其清除計時器並立即更新值
	const cancelAndSetValue = (newValue, callback) => {
		const isFunc = typeof newValue === "function";
		if (isFunc) {
			console.log("cancelAndSetValue", "func");
		} else {
			console.log("cancelAndSetValue", newValue);
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setDebouncedValue(newValue);
		if (callback) {
			if (!isFunc) {
				callback(newValue);
			} else {
				callback(newValue());
			}
		}
	};

	return [debouncedValue, cancelAndSetValue];
};

export default useDebounceState;
