import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { RecvAccountSessionGridHeader } from "./RecvAccountSessionGridHeader";
import { RecvAccountSessionGridRow } from "./RecvAccountSessionGridRow";
import RecvAccountSessions from "./RecvAccountSessions.mjs";

export const RecvAcctRcptSessionPicker = (props) => {
	const { label = "應收帳期別", forSession = false, ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 1000,
		};
		return queryString.stringify(obj);
	}, []);


	return (
		<OptionPickerWrapper
			label={label}
			bearer={token}
			url={`v1/sales/recv-account/rcpt-sessions`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={forSession
				? RecvAccountSessions.getOptionLabelForSession
				: RecvAccountSessions.getOptionLabel}
			isOptionEqualToValue={forSession
				? RecvAccountSessions.isOptionEqualToValueForSession
				: RecvAccountSessions.isOptionEqualToValue}
			freeSolo={forSession}
			forcePopupIcon
			disableOpenOnInput
			renderTagLabel={RecvAccountSessions.renderTagLabel}
			optionLabelSize="md"
			// PaperComponent={PurchaseOrderPickerPaper}
			// renderOption={renderOption}
			GridHeaderComponent={RecvAccountSessionGridHeader}
			GridRowComponent={RecvAccountSessionGridRow}
			notFoundText="期別 ${input} 不存在"
			inputParam="fz"
			clearOnChange
			{...rest}
		/>
	);
};

RecvAcctRcptSessionPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	forSession: PropTypes.bool
	// supplierId: PropTypes.string,
	// supplierName: PropTypes.string,
};

RecvAcctRcptSessionPicker.displayName = "RecvAcctRcptSessionPicker";
