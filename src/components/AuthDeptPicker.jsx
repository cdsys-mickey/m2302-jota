import { memo, useCallback, useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

import { OptionPicker } from "@/shared-components";
import DeptOptions from "@/modules/DeptOptions.mjs";
import { useMemo } from "react";
import PropTypes from "prop-types";

const AuthDeptPicker = memo((props) => {
	const { disableByClass, disabled, ...rest } = props;
	const { token, operator } = useContext(AuthContext);

	const getOptions = useCallback((payload) => {
		return payload;
	}, []);

	const _disabled = useMemo(() => {
		if (disabled) {
			return true;
		}
		if (disableByClass == null) {
			return false;
		}
		return operator.Class < disableByClass;
	}, [disableByClass, disabled, operator.Class])

	return (
		<OptionPicker
			url="v1/auth/depts"
			getOptionLabel={DeptOptions.getOptionLabel}
			isOptionEqualToValue={DeptOptions.isOptionEqualToValue}
			bearer={token}
			getOptions={getOptions}
			disabled={_disabled}
			{...rest}
		/>
	);
});

AuthDeptPicker.propTypes = {
	disabled: PropTypes.bool,
	disableByClass: PropTypes.number
};

AuthDeptPicker.displayName = "AuthDeptPicker";
export default AuthDeptPicker;
