import { AuthContext } from "@/contexts/auth/AuthContext";
import AccountingEntries from "@/modules/md-acc-entries";

import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useCallback, useContext, useMemo } from "react";

const AccountingEntryListingPicker = memo((props) => {
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
				? AccountingEntries.getOptionLabelForId(option)
				: AccountingEntries.getOptionLabel(option);
		},
		[forId]
	);

	return (
		<OptionPickerWrapper
			label={label}
			url="v1/inv/taking/acc-entries"
			bearer={auth.token}
			getOptionLabel={getOptionLabel}
			renderOptionLabel={AccountingEntries.getOptionLabel}
			isOptionEqualToValue={AccountingEntries.isOptionEqualToValue}
			getData={getData}
			querystring={querystring}
			notFoundText="作帳日 ${id} 不存在"
			{...rest}
		/>
	);
});

AccountingEntryListingPicker.propTypes = {
	label: PropTypes.string,
	uid: PropTypes.string,
	scope: PropTypes.number,
	excludesSelf: PropTypes.bool,
	forId: PropTypes.bool,
};

AccountingEntryListingPicker.displayName = "AccountingEntryListingPicker";
export default AccountingEntryListingPicker;