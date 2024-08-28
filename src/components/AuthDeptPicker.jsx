import { memo, useCallback, useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import Depts from "../modules/md-depts";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const AuthDeptPicker = memo((props) => {
	const { ...rest } = props;
	const auth = useContext(AuthContext);

	const getData = useCallback((payload) => {
		return payload;
	}, []);

	return (
		<OptionPickerWrapper
			url="v1/auth/depts"
			getOptionLabel={Depts.getOptionLabel}
			isOptionEqualToValue={Depts.isOptionEqualToValue}
			bearer={auth.token}
			getData={getData}
			{...rest}
		/>
	);
});

AuthDeptPicker.propTypes = {};

AuthDeptPicker.displayName = "AuthDeptPicker";
export default AuthDeptPicker;
