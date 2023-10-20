import { useCallback } from "react";

import ControlledRememberMeCheckbox from "./ControlledRememberMeCheckbox";

export const RememberMeCheckboxContainer = (props) => {
	// const signin = useAuthContext();
	const { ...rest } = props;

	const handleClick = useCallback((e) => {
		// console.debug("handleClick", checked);
		if (!e.target.checked) {
			console.debug("removing cookie");
			// signin.forgetMe();
		}
	}, []);

	return <ControlledRememberMeCheckbox onClick={handleClick} {...rest} />;
};
