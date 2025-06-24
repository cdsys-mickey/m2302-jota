import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { RecvAccountSessionGridHeader } from "./RecvAccountSessionGridHeader";
import { RecvAccountSessionGridRow } from "./RecvAccountSessionGridRow";
import RecvAccountSessions from "./RecvAccountSessions.mjs";

export const RecvAcctCurrentSessionPicker = (props) => {
	const { label = "應收帳批次期別", forSession = false, ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 1000,
		};
		return queryString.stringify(obj);
	}, []);


	return (
		<OptionPicker
			label={label}
			bearer={token}
			url={`v1/sales/recv-account/current-sessions`}
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
			optionLabelSize="md"
			// PaperComponent={PurchaseOrderPickerPaper}
			// renderOption={renderOption}
			GridHeaderComponent={RecvAccountSessionGridHeader}
			GridRowComponent={RecvAccountSessionGridRow}
			notFoundText="期別 ${input} 不存在"
			// inputParam="fz"
			disableOpenOnInput
			findByInput={false}
			clearOnChange
			{...rest}
		/>
	);
};

RecvAcctCurrentSessionPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	// supplierId: PropTypes.string,
	// supplierName: PropTypes.string,
	forSession: PropTypes.bool
};

RecvAcctCurrentSessionPicker.displayName = "RecvAcctCurrentSessionPicker";
