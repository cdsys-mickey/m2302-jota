import { AuthContext } from "@/contexts/auth/AuthContext";
import Depts from "@/modules/md-depts";
import Terminals from "@/modules/md-terminals";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { memo, useCallback, useContext } from "react";

const TerminalPicker = memo((props) => {
	const {
		label = "收銀機號",
		...rest
	} = props;
	const auth = useContext(AuthContext);

	const getData = useCallback((payload) => {
		return payload["data"];
	}, []);

	// const querystring = useMemo(() => {
	// 	return queryString.stringify({
	// 		uid: uid,
	// 		sp: scope,
	// 		...(excludesSelf && {
	// 			es: 1,
	// 		}),
	// 	});
	// }, [excludesSelf, scope, uid]);

	return (
		<OptionPickerWrapper
			label={label}
			url="v1/pos/terminals"
			bearer={auth.token}
			getOptionLabel={Terminals.getOptionLabel}
			renderOptionLabel={Terminals.getOptionLabel}
			isOptionEqualToValue={Terminals.isOptionEqualToValue}
			getData={getData}
			// querystring={querystring}
			notFoundText="收銀機號 ${id} 不存在"
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
