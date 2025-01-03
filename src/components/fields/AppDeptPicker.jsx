import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";
import Depts from "../../modules/md-depts";
import { useCallback } from "react";

const AppDeptPicker = memo((props) => {
	console.log("rendering AppDeptPicker");
	const { scope, scopeByOperator, ...rest } = props;
	const { token } = useContext(AuthContext);

	const qs = useMemo(() => {
		return queryString.stringify({
			...(scope && {
				sp: scope,
			}),
			...(scopeByOperator && {
				as: 1,
			}),
		});
	}, [scopeByOperator, scope]);

	// const getOptionLabel = useCallback(
	// 	(option) => Depts.getOptionLabel(option),
	// 	[]
	// );

	// const isOptionEqualToValue = useCallback((option, value) => {
	// 	return Depts.isOptionEqualToValue(option, value);
	// }, []);

	// const getOptionKey = useCallback(
	// 	(option) => Depts.getOptionKey(option),
	// 	[]
	// );

	return (
		<OptionPickerWrapper
			// ref={ref}
			bearer={token}
			url={`v1/app/depts`}
			getOptionLabel={Depts.getOptionLabel}
			isOptionEqualToValue={Depts.isOptionEqualToValue}
			getOptionKey={Depts.getOptionKey}
			querystring={qs}
			resetOnChange
			{...rest}
		/>
	);
});

AppDeptPicker.propTypes = {
	uid: PropTypes.string,
	scope: PropTypes.number,
	scopeByOperator: PropTypes.bool,
};

AppDeptPicker.displayName = "AppDeptPicker";
export default AppDeptPicker;
