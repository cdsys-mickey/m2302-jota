import { useCallback } from "react";
import { CheckboxExGroupContainer } from "../shared-components/checkbox-group/CheckboxExGroupContainer";
import Depts from "../modules/md-depts";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import { useMemo } from "react";
import queryString from "query-string";
import Auth from "../modules/md-auth";
import PropTypes from "prop-types";
import CheckboxExGroup from "../shared-components/checkbox-group/CheckboxExGroup";

export const UserDeptCheckboxGroupContainer = (props) => {
	const { uid, scope = Auth.SCOPES.HQ, ...rest } = props;
	const auth = useContext(AuthContext);

	const getOptionKey = useCallback((opts) => {
		return Depts.getOptionKey(opts);
	}, []);

	const getOptionLabel = useCallback((opts) => {
		return Depts.getOptionLabel(opts);
	}, []);

	const isOptionChecked = useCallback(
		(option, value) => {
			return value.includes(getOptionKey(option));
		},
		[getOptionKey]
	);

	const getData = useCallback((payload) => {
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
			getOptionKey={getOptionKey}
			getOptionLabel={getOptionLabel}
			isOptionChecked={isOptionChecked}
			getData={getData}
			{...rest}
		/>
	);
};

UserDeptCheckboxGroupContainer.displayName = "UserDeptCheckboxGroupContainer";
UserDeptCheckboxGroupContainer.propTypes = {
	uid: PropTypes.string.isRequired,
	scope: PropTypes.number,
};
