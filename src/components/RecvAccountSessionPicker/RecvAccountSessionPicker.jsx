import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { RecvAccountSessionGridHeader } from "./RecvAccountSessionGridHeader";
import { RecvAccountSessionGridRow } from "./RecvAccountSessionGridRow";
import RecvAccountSessions from "./RecvAccountSessions.mjs";

export const RecvAccountSessionPicker = (props) => {
	const { label = "應收帳期別", ...rest } = props;
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
			url={`v1/sales/recv-account/sessions`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={RecvAccountSessions.getOptionLabel}
			isOptionEqualToValue={RecvAccountSessions.isOptionEqualToValue}
			renderTagLabel={RecvAccountSessions.renderTagLabel}
			optionLabelSize="md"
			// PaperComponent={PurchaseOrderPickerPaper}
			// renderOption={renderOption}
			GridHeaderComponent={RecvAccountSessionGridHeader}
			GridRowComponent={RecvAccountSessionGridRow}
			notFoundText="期別 ${id} 不存在"
			inputParam="fz"
			clearOnChange
			{...rest}
		/>
	);
};

RecvAccountSessionPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	// supplierId: PropTypes.string,
	// supplierName: PropTypes.string,
};

RecvAccountSessionPicker.displayName = "PurchaseOrderPicker";
