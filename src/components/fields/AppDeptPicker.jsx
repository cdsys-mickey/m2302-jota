import { AuthContext } from "@/contexts/auth/AuthContext";
import DeptOptions from "@/modules/DeptOptions.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";


const AppDeptPicker = memo((props) => {
	console.log("rendering AppDeptPicker");
	const { scope, scopeByOperator, ...rest } = props;
	const { token } = useContext(AuthContext);

	const qs = useMemo(() => {
		return queryString.stringify({
			...(scope != null && {
				sp: scope,
			}),
			...(scopeByOperator && {
				as: 1,
			}),
		});
	}, [scopeByOperator, scope]);

	// const getOptionLabel = useCallback(
	// 	(option) => DeptOptions.getOptionLabel(option),
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
		<OptionPicker
			// ref={ref}
			bearer={token}
			url={`v1/app/depts`}
			getOptionLabel={DeptOptions.getOptionLabel}
			isOptionEqualToValue={DeptOptions.isOptionEqualToValue}
			getOptionKey={DeptOptions.getOptionKey}
			querystring={qs}
			clearOnChange
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
