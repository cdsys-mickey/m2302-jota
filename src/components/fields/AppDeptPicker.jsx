import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import Depts from "../../modules/md-depts";
import { OptionPickerWrapper } from "@/shared-components/picker/OptionPickerWrapper";
import { memo } from "react";
import { useMemo } from "react";
import queryString from "query-string";
import Auth from "../../modules/md-auth";

const AppDeptPicker = memo((props) => {
	const { uid, scope, filterByOperator, ...rest } = props;
	const auth = useContext(AuthContext);

	const qs = useMemo(() => {
		return queryString.stringify({
			...(uid && {
				uid: uid,
			}),
			...(scope && {
				sp: scope,
			}),
			...(filterByOperator && {
				as: 1,
			}),
		});
	}, [filterByOperator, scope, uid]);

	return (
		<OptionPickerWrapper
			// ref={ref}
			bearer={auth.token}
			url={`v1/app/depts`}
			getOptionLabel={Depts.getOptionLabel}
			isOptionEqualToValue={Depts.isOptionEqualToValue}
			getOptionKey={Depts.getOptionKey}
			querystring={qs}
			{...rest}
		/>
	);
});
AppDeptPicker.propTypes = {
	uid: PropTypes.string,
	scope: PropTypes.number,
	filterByOperator: PropTypes.bool,
};

AppDeptPicker.displayName = "AppDeptPickerContainer";
export default AppDeptPicker;
