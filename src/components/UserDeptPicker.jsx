import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "@/modules/md-auth";
import Depts from "@/modules/md-depts";
import { OptionPickerWrapper } from "@/shared-components/picker/OptionPickerWrapper";

const UserDeptPicker = memo((props) => {
	const { uid, scope = Auth.SCOPES.HQ, ...rest } = props;
	const auth = useContext(AuthContext);

	const getData = useCallback((payload) => {
		return payload;
	}, []);

	const qs = useMemo(() => {
		return queryString.stringify({
			uid: uid,
			sp: scope,
		});
	}, [scope, uid]);

	return (
		<OptionPickerWrapper
			url="v1/ou/user/depts"
			// disabled={!uid}
			getOptionLabel={Depts.getOptionLabel}
			isOptionEqualToValue={Depts.isOptionEqualToValue}
			bearer={auth.token}
			getData={getData}
			querystring={qs}
			{...rest}
		/>
	);
});

UserDeptPicker.propTypes = {
	uid: PropTypes.string.isRequired,
	scope: PropTypes.number,
};

UserDeptPicker.displayName = "UserDeptPicker";
export default UserDeptPicker;
