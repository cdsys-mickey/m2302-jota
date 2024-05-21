import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "@/modules/md-auth";
import Depts from "@/modules/md-depts";
import { OptionPickerWrapper } from "@/shared-components/picker/OptionPickerWrapper";

const DeptPickerContainer = memo((props) => {
	const { uid, scope = Auth.SCOPES.HQ, ...rest } = props;
	const auth = useContext(AuthContext);

	const getData = useCallback((payload) => {
		return payload["data"];
	}, []);

	const querystring = useMemo(() => {
		return queryString.stringify({
			uid: uid,
			sp: scope,
		});
	}, [scope, uid]);

	return (
		<OptionPickerWrapper
			url="v1/ou/depts"
			getOptionLabel={Depts.getOptionLabel}
			isOptionEqualToValue={Depts.isOptionEqualToValue}
			bearer={auth.token}
			getData={getData}
			// params={params}
			querystring={querystring}
			{...rest}
		/>
	);
});

DeptPickerContainer.propTypes = {
	uid: PropTypes.string,
	scope: PropTypes.number,
};

DeptPickerContainer.displayName = "DeptPickerContainer";
export default DeptPickerContainer;
