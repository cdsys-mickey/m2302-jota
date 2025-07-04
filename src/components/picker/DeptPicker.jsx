import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "@/modules/md-auth";
import { OptionPicker } from "@/shared-components";
import DeptOptions from "@/modules/DeptOptions.mjs";

const DeptPicker = memo((props) => {
	const {
		label = "門市",
		uid,
		scope = Auth.SCOPES.HQ,
		excludesSelf,
		forId = false,
		...rest
	} = props;
	const auth = useContext(AuthContext);

	const getOptions = useCallback((payload) => {
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

	const getOptionLabel = useCallback(
		(option) => {
			return forId
				? DeptOptions.getOptionLabelForId(option)
				: DeptOptions.getOptionLabel(option);
		},
		[forId]
	);

	return (
		<OptionPicker
			label={label}
			url="v1/ou/depts"
			bearer={auth.token}
			getOptionLabel={getOptionLabel}
			renderOptionLabel={DeptOptions.getOptionLabel}
			isOptionEqualToValue={DeptOptions.isOptionEqualToValue}
			getOptions={getOptions}
			querystring={querystring}
			notFoundText="門市代號 ${input} 不存在"
			// blurToLookup
			{...rest}
		/>
	);
});

DeptPicker.propTypes = {
	label: PropTypes.string,
	uid: PropTypes.string,
	scope: PropTypes.number,
	excludesSelf: PropTypes.bool,
	forId: PropTypes.bool,
};

DeptPicker.displayName = "DeptPicker";
export default DeptPicker;
