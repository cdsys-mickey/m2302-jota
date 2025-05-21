import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { RstPurchaseOrderGridHeader } from "./RstPurchaseOrderGridHeader";
import { RstPurchaseOrderGridRow } from "./RstPurchaseOrderGridRow";
import RstPurchaseOrders from "@/components/rst-purchase-order-picker/RstPurchaseOrrders.mjs";

export const RstPurchaseOrderPicker = (props) => {
	const { label = "採購單", ...rest } = props;
	const { token } = useContext(AuthContext);

	const supplier = useWatch({
		name: "supplier",
	});
	const supplierName = useWatch({
		name: "FactData",
	});

	const querystring = useMemo(() => {
		const obj = {
			tp: 1000,
			spi: supplier?.FactID,
			spn: supplierName,
		};
		return queryString.stringify(obj);
	}, [supplier?.FactID, supplierName]);

	const disabled = useMemo(() => {
		return !supplier || !supplierName;
	}, [supplier, supplierName]);

	return (
		<OptionPickerWrapper
			label={label}
			bearer={token}
			url={`v1/purchase/restocks/purchase-orders`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={RstPurchaseOrders.getOptionLabel}
			isOptionEqualToValue={RstPurchaseOrders.isOptionEqualToValue}
			renderTagLabel={RstPurchaseOrders.renderTagLabel}
			disabled={disabled}
			optionLabelSize="md"
			// PaperComponent={PurchaseOrderPickerPaper}
			// renderOption={renderOption}
			GridHeaderComponent={RstPurchaseOrderGridHeader}
			GridRowComponent={RstPurchaseOrderGridRow}
			notFoundText="採購單號 ${input} 不存在"
			inputParam="fz"
			clearOnChange
			{...rest}
		/>
	);
};

RstPurchaseOrderPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	// supplierId: PropTypes.string,
	// supplierName: PropTypes.string,
};

RstPurchaseOrderPicker.displayName = "PurchaseOrderPicker";
