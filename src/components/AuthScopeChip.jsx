import Auth from "@/modules/md-auth";
import ChipEx from "@/shared-components/ChipEx";
import { useMemo } from "react";
import PropTypes from "prop-types";
import MuiSeverity from "@/shared-modules/sd-mui-severity";

const AuthScopeChip = (props) => {
	const { scope, ...rest } = props;

	const label = useMemo(() => {
		return Auth.SCOPE_LABELS[parseInt(scope)];
	}, [scope])

	const severity = useMemo(() => {
		switch (parseInt(scope)) {
			case Auth.SCOPES.ROOT:
				return MuiSeverity.ERROR;
			case Auth.SCOPES.HQ:
				return MuiSeverity.WARNING;
			case Auth.SCOPES.BRANCH_HQ:
				return MuiSeverity.INFO;
			case Auth.SCOPES.DEPT:
			default:
				return MuiSeverity.INFO;
		}
	}, [scope])

	return (
		<ChipEx label={label} severity={severity} {...rest} />
	);
}

AuthScopeChip.propTypes = {
	scope: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

AuthScopeChip.displayName = "AuthScopeChip";
export default AuthScopeChip;