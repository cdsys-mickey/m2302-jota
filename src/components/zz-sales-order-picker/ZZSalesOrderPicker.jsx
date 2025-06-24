import { AuthContext } from "@/contexts/auth/AuthContext";
import SalesOrders from "@/modules/md-sales-orders";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import SalesOrderGridHeader from "./SalesOrderGridHeader";
import SalesOrderGridRow from "./SalesOrderGridRow";


const SalesOrderPicker = (props) => {
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
		<OptionPicker
			label={label}
			bearer={token}
			url={`v1/sales/restocks/sales-orders`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={SalesOrders.getOptionLabel}
			isOptionEqualToValue={SalesOrders.isOptionEqualToValue}
			renderTagLabel={SalesOrders.renderTagLabel}
			disabled={disabled}
			optionLabelSize="md"
			// PaperComponent={SalesOrderPickerPaper}
			// renderOption={renderOption}
			GridHeaderComponent={SalesOrderGridHeader}
			GridRowComponent={SalesOrderGridRow}
			notFoundText="採購單號 ${input} 不存在"
			inputParam="fz"
			{...rest}
		/>
	);
};

SalesOrderPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	// supplierId: PropTypes.string,
	// supplierName: PropTypes.string,
};

SalesOrderPicker.displayName = "SalesOrderPicker";
export default SalesOrderPicker;