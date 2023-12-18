import { memo } from "react";
import PropTypes from "prop-types";
import { ControlledWebApiOptionPicker } from "../../shared-components/controlled/ControlledWebApiOptionPicker";
import Depts from "../../modules/md-depts";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";

const UserDeptPicker = memo((props) => {
	const { ...rest } = props;
	const auth = useContext(AuthContext);

	return (
		<ControlledWebApiOptionPicker
			url="v1/auth/depts"
			getOptionLabel={Depts.getOptionLabel}
			isOptionEqualToValue={Depts.isOptionEqualToValue}
			bearer={auth.token}
			{...rest}
		/>
	);
});

UserDeptPicker.propTypes = {};

UserDeptPicker.displayName = "UserDeptPicker";
export default UserDeptPicker;
