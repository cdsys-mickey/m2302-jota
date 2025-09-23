import DeptOptions from "@/modules/DeptOptions.mjs";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import Auth from "../modules/Auth.mjs";
import CheckboxExGroup from "../shared-components/checkbox-group/CheckboxExGroup";

export const UserDeptCheckboxGroupContainer = (props) => {
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

	return (
		<CheckboxExGroup
			url="v1/ou/user/depts"
			bearer={auth.token}
			querystring={querystring}
			disabled={!uid}
			getOptionKey={DeptOptions.getOptionKey}
			getOptionLabel={DeptOptions.getOptionLabel}
			isOptionChecked={DeptOptions.isOptionChecked}
			getOptions={getOptions}
			{...rest}
		/>
	);
};

UserDeptCheckboxGroupContainer.displayName = "UserDeptCheckboxGroupContainer";
UserDeptCheckboxGroupContainer.propTypes = {
	uid: PropTypes.string.isRequired,
	scope: PropTypes.number,
};
