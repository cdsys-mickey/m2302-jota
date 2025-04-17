import { useCallback, useMemo, useState } from "react";

export default function useCheckboxes() {
	const [checkedMap, setCheckedMap] = useState({});

	const setChecked = useCallback((index, value) => {
		setCheckedMap(prev => {
			const newMap = { ...prev };
			if (value === undefined) {
				newMap[index] ? delete newMap[index] : newMap[index] = true;
			} else {
				value ? newMap[index] = true : delete newMap[index];
			}
			return newMap;
		});
	}, []);

	const isChecked = useCallback((index) => {
		return !!checkedMap[index];
	}, [checkedMap]);

	// const getChecked = useCallback(() => {
	// 	return Object.keys(checkedMap);
	// }, [checkedMap]);

	const checked = useMemo(() => {
		return Object.keys(checkedMap)
	}, [checkedMap])

	const isAnyChecked = useMemo(() => {
		return Object.keys(checkedMap).length > 0;
	}, [checkedMap]);

	const uncheckAll = useCallback(() => {
		setCheckedMap({});
	}, []);

	return {
		setChecked,
		isChecked,
		// getChecked,
		checked,
		isAnyChecked,
		uncheckAll
	};
}
