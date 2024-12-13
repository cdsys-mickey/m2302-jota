import { AuthContext } from "@/contexts/auth/AuthContext";
import InvTaking from "@/modules/md-inv-taking";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";

const InvTakingListingPicker = memo((props) => {
	const {
		label = "清單編號",
		forId = false,
		...rest
	} = props;
	const auth = useContext(AuthContext);

	const getData = useCallback((payload) => {
		return payload["data"];
	}, []);

	const querystring = useMemo(() => {
		return queryString.stringify({
			opts: 1,
		});
	}, []);

	const getOptionLabel = useCallback(
		(option) => {
			return forId
				? InvTaking.getOptionLabelForId(option)
				: InvTaking.getOptionLabel(option);
		},
		[forId]
	);

	return (
		<OptionPickerWrapper
			label={label}
			url="v1/inv/taking/listing"
			bearer={auth.token}
			getOptionLabel={getOptionLabel}
			renderOptionLabel={InvTaking.getOptionLabel}
			isOptionEqualToValue={InvTaking.isOptionEqualToValue}
			getData={getData}
			querystring={querystring}
			notFoundText="盤點清單 ${id} 不存在"
			{...rest}
		/>
	);
});

InvTakingListingPicker.propTypes = {
	label: PropTypes.string,
	uid: PropTypes.string,
	scope: PropTypes.number,
	excludesSelf: PropTypes.bool,
	forId: PropTypes.bool,
};

InvTakingListingPicker.displayName = "InvTakingListingPicker";
export default InvTakingListingPicker;
