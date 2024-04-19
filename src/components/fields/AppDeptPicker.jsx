import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";
import Depts from "../../modules/md-depts";
import { useCallback } from "react";
import { WebApiOptionPickerWrapper } from "../../shared-components/picker/WebApiOptionPickerWrapper";

const AppDeptPicker = memo((props) => {
	console.log("rendering AppDeptPicker");
	const { uid, scope, filterByOperator, ...rest } = props;
	const { token } = useContext(AuthContext);

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

	const getOptionLabel = useCallback(
		(option) => Depts.getOptionLabel(option),
		[]
	);

	const isOptionEqualToValue = useCallback((option, value) => {
		return Depts.isOptionEqualToValue(option, value);
	}, []);

	const getOptionKey = useCallback(
		(option) => Depts.getOptionKey(option),
		[]
	);

	return (
		// <OptionPickerWrapper
		<WebApiOptionPickerWrapper
			// ref={ref}
			bearer={token}
			url={`v1/app/depts`}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			getOptionKey={getOptionKey}
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
