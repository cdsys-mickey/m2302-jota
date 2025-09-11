import PropTypes from "prop-types";
import { forwardRef } from "react";
import Auth from "@/modules/md-auth";
import { OptionPicker } from "@/shared-components";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";

const AuthScopePickerContainer = forwardRef((props, ref) => {
	const { name, label = "門市", ...rest } = props;
	const { operator } = useContext(AuthContext);

	if (operator.Class < Auth.SCOPES.ROOT) {
		return false;
	}

	return (
		<OptionPicker
			name={name}
			label={label}
			ref={ref}
			options={Auth.AUTH_COOKIE_OPTIONS}
			getOptionLabel={Auth.getOptionLabel}
			isOptionEqualToValue={Auth.isOptionEqualToValue}
			{...rest}
		/>
	);
});
AuthScopePickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

AuthScopePickerContainer.displayName = "AuthScopePickerContainer";
export default AuthScopePickerContainer;
