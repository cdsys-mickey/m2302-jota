import { useCallback } from "react";

import ControlledRememberMeCheckbox from "./ControlledRememberMeCheckbox";

export const RememberMeCheckboxContainer = (props) => {
	const { ...rest } = props;

	const handleClick = useCallback((e) => {
		// console.log("handleClick", checked);
		if (!e.target.checked) {
			console.log("removing cookie");
			// signin.forgetMe();
		}
	}, []);

	return <ControlledRememberMeCheckbox onClick={handleClick} {...rest} />;
};
