import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "@/modules/md-auth";
import Depts from "@/modules/md-depts";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

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

	const getData = useCallback((payload) => {
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
				? Depts.getOptionLabelForId(option)
				: Depts.getOptionLabel(option);
		},
		[forId]
	);

	return (
		<OptionPickerWrapper
			label={label}
			url="v1/ou/depts"
			bearer={auth.token}
			getOptionLabel={getOptionLabel}
			renderOptionLabel={Depts.getOptionLabel}
			isOptionEqualToValue={Depts.isOptionEqualToValue}
			getData={getData}
			querystring={querystring}
			notFoundText="門市代號 ${id} 不存在"
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
