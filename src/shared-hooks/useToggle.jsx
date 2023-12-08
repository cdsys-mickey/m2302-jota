import { useCallback, useState } from "react";

export const useToggle = (defaultChecked = false) => {
	const [checked, setChecked] = useState(defaultChecked);

	const toggle = useCallback(() => {
		setChecked(!checked);
	}, [checked]);

	const onChecked = useCallback(() => {
		setChecked(true);
	}, []);

	const onUnChecked = useCallback(() => {
		setChecked(false);
	}, []);

	return [checked, toggle, onChecked, onUnChecked];
};
