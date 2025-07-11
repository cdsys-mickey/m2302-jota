import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "@/modules/md-auth";

import { OptionPicker } from "@/shared-components";
import DeptOptions from "@/modules/DeptOptions.mjs";

const UserDeptPicker = memo((props) => {
	const { uid, scope = Auth.SCOPES.HQ, ...rest } = props;
	const auth = useContext(AuthContext);

	const getOptions = useCallback((payload) => {
		return payload;
	}, []);

	const querystring = useMemo(() => {
		return queryString.stringify({
			uid: uid,
			sp: scope,
		});
	}, [scope, uid]);

	// const params = useMemo(() => {
	// 	return {
	// 		uid: uid,
	// 		sp: scope,
	// 	};
	// }, [scope, uid]);

	return (
		<OptionPicker
			url="v1/ou/user/depts"
			// disabled={!uid}
			getOptionLabel={DeptOptions.getOptionLabel}
			isOptionEqualToValue={DeptOptions.isOptionEqualToValue}
			bearer={auth.token}
			getOptions={getOptions}
			// params={params}
			querystring={querystring}
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
