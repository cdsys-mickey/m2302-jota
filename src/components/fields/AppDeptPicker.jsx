import { AuthContext } from "@/contexts/auth/AuthContext";
import DeptOptions from "@/modules/DeptOptions.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";


const AppDeptPicker = memo((props) => {
	console.log("rendering AppDeptPicker");
	const { scope, scopeByOperator, disableByClass, disabled, ...rest } = props;
	const { token, operator } = useContext(AuthContext);

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

	const _disabled = useMemo(() => {
		if (disabled) {
			return true;
		}
		if (disableByClass == null) {
			return false;
		}
		return operator.Class < disableByClass;
	}, [disableByClass, disabled, operator.Class])

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
			disabled={_disabled}
			{...rest}
		/>
	);
});

AppDeptPicker.propTypes = {
	uid: PropTypes.string,
	scope: PropTypes.number,
	disabled: PropTypes.bool,
	scopeByOperator: PropTypes.bool,
	disableByClass: PropTypes.number
};

AppDeptPicker.displayName = "AppDeptPicker";
export default AppDeptPicker;
