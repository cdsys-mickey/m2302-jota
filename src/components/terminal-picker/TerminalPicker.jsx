import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "@/modules/md-auth";
import Terminals from "@/modules/md-terminals";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useMemo } from "react";
import { memo, useCallback, useContext } from "react";

const TerminalPicker = memo((props) => {
	const {
		label = "收銀機號",
		scope = Auth.SCOPES.DEPT,
		...rest
	} = props;
	const auth = useContext(AuthContext);

	const getOptions = useCallback((payload) => {
		return payload["data"];
	}, []);

	const querystring = useMemo(() => {
		return queryString.stringify({
			sp: scope,
		});
	}, [scope]);

	return (
		<OptionPicker
			label={label}
			url="v1/pos/terminals"
			bearer={auth.token}
			getOptionLabel={Terminals.getOptionLabel}
			renderOptionLabel={Terminals.getOptionLabel}
			isOptionEqualToValue={Terminals.isOptionEqualToValue}
			getOptions={getOptions}
			querystring={querystring}
			notFoundText="收銀機號 ${input} 不存在"
			{...rest}
		/>
	);
});

TerminalPicker.propTypes = {
	label: PropTypes.string,
	uid: PropTypes.string,
	scope: PropTypes.number,
	excludesSelf: PropTypes.bool,
	forId: PropTypes.bool,
};

TerminalPicker.displayName = "TerminalPicker";
export default TerminalPicker;
