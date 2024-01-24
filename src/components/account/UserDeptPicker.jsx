import { memo } from "react";
import PropTypes from "prop-types";
import { ControlledWebApiOptionPicker } from "../../shared-components/controlled/ControlledWebApiOptionPicker";
import Depts from "../../modules/md-depts";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useCallback } from "react";

const UserDeptPicker = memo((props) => {
	const { ...rest } = props;
	const auth = useContext(AuthContext);

	const getData = useCallback((payload) => {
		return payload;
	}, []);

	return (
		<ControlledWebApiOptionPicker
			url="v1/auth/depts"
			getOptionLabel={Depts.getOptionLabel}
			isOptionEqualToValue={Depts.isOptionEqualToValue}
			bearer={auth.token}
			getData={getData}
			{...rest}
		/>
	);
});

UserDeptPicker.propTypes = {};

UserDeptPicker.displayName = "UserDeptPicker";
export default UserDeptPicker;
