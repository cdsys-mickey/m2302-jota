import { useCallback, useState } from "react";

export const useToggle = (defaultChecked = false) => {
	const [checked, setChecked] = useState(defaultChecked);

	const toggle = useCallback(() => {
		setChecked(!checked);
		console.log(`toggle → ${!checked}`);
	}, [checked]);

	const onChecked = useCallback(() => {
		setChecked(true);
		console.log(`toggle → true`);
	}, []);

	const onUnChecked = useCallback(() => {
		setChecked(false);
		console.log(`toggle → false`);
	}, []);

	return [checked, toggle, onChecked, onUnChecked];
};
