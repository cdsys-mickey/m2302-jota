import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { RecvAccountSessionGridHeader } from "./RecvAccountSessionGridHeader";
import { RecvAccountSessionGridRow } from "./RecvAccountSessionGridRow";
import RecvAccountSessions from "./RecvAccountSessions.mjs";

export const RecvAcctBatchSessionPicker = (props) => {
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
			url={`v1/sales/recv-account/batch-sessions`}
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

RecvAcctBatchSessionPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	forSession: PropTypes.bool
	// supplierId: PropTypes.string,
	// supplierName: PropTypes.string,
};

RecvAcctBatchSessionPicker.displayName = "RecvAcctBatchSessionPicker";
