import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "@/modules/md-auth";
import Depts from "@/modules/md-depts";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const DeptPickerContainer = memo((props) => {
	const { uid, scope = Auth.SCOPES.HQ, excludesSelf, ...rest } = props;
	const auth = useContext(AuthContext);

	const getData = useCallback((payload) => {
		return payload["data"];
	}, []);

	const querystring = useMemo(() => {
		return queryString.stringify({
			uid: uid,
			sp: scope,
			...(excludesSelf && {
				es: 1,
			}),
		});
	}, [excludesSelf, scope, uid]);

	return (
		<OptionPickerWrapper
			url="v1/ou/depts"
			getOptionLabel={Depts.getOptionLabel}
			isOptionEqualToValue={Depts.isOptionEqualToValue}
			bearer={auth.token}
			getData={getData}
			querystring={querystring}
			{...rest}
		/>
	);
});

DeptPickerContainer.propTypes = {
	uid: PropTypes.string,
	scope: PropTypes.number,
	excludesSelf: PropTypes.bool,
};

DeptPickerContainer.displayName = "DeptPickerContainer";
export default DeptPickerContainer;
