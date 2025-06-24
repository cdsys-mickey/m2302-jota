import { memo, useCallback, useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

import { OptionPicker } from "@/shared-components";
import DeptOptions from "@/modules/DeptOptions.mjs";

const AuthDeptPicker = memo((props) => {
	const { ...rest } = props;
	const auth = useContext(AuthContext);

	const getOptions = useCallback((payload) => {
		return payload;
	}, []);

	return (
		<OptionPicker
			url="v1/auth/depts"
			getOptionLabel={DeptOptions.getOptionLabel}
			isOptionEqualToValue={DeptOptions.isOptionEqualToValue}
			bearer={auth.token}
			getOptions={getOptions}
			{...rest}
		/>
	);
});

AuthDeptPicker.propTypes = {};

AuthDeptPicker.displayName = "AuthDeptPicker";
export default AuthDeptPicker;
