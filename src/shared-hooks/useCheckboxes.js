import { useRef } from "react";
import { useCallback, useMemo, useState } from "react";

export default function useCheckboxes() {
	const [checkedMap, setCheckedMap] = useState({});
	const lastCheckedRef = useRef();

	const setChecked = useCallback((index, value, e) => {
		e.preventDefault();
		e.stopPropagation(); // 阻止事件冒泡，避免觸發其他選取行為
		setCheckedMap(prev => {
			const newMap = { ...prev };
			// Handle shift key range selection
			if (e.shiftKey && lastCheckedRef.current !== undefined && value !== false) {
				const start = Math.min(lastCheckedRef.current, index);
				const end = Math.max(lastCheckedRef.current, index);
				for (let i = start; i <= end; i++) {
					newMap[i] = true;
				}
			} else {
				// 未指定 value 則 toggle
				if (value === undefined) {
					newMap[index] ? delete newMap[index] : newMap[index] = true;
				} else {
					value ? newMap[index] = true : delete newMap[index];
				}
			}
			// Update lastCheckedRef
			if (newMap[index]) {
				lastCheckedRef.current = index;
			} else if (lastCheckedRef.current === index) {
				lastCheckedRef.current = undefined;
			}
			return newMap;
		});
	}, []);

	const toggleChecked = useCallback((index, e) => {
		setChecked(index, undefined, e);
	}, [setChecked]);

	const isChecked = useCallback((index) => {
		return !!checkedMap[index];
	}, [checkedMap]);

	const checked = useMemo(() => {
		return Object.keys(checkedMap);
	}, [checkedMap]);

	const isAnyChecked = useMemo(() => {
		return Object.keys(checkedMap).length > 0;
	}, [checkedMap]);

	const uncheckAll = useCallback(() => {
		setCheckedMap({});
		lastCheckedRef.current = undefined;
	}, []);

	return {
		setChecked,
		toggleChecked,
		isChecked,
		checked,
		isAnyChecked,
		uncheckAll
	};
}