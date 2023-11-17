import { useCallback, useState } from "react";

export const useToggle = (defaultChecked = false) => {
	const [checked, setChecked] = useState(defaultChecked);

	const toggle = useCallback(() => {
		setChecked(!checked);
	}, [checked]);

	return [checked, toggle];
};
