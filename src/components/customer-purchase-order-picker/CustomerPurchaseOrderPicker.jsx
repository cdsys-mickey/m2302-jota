import { AuthContext } from "@/contexts/auth/AuthContext";

import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import CustomerPurchaseOrderGridHeader from "./CustomerPurchaseOrderGridHeader";
import CustomerPurchaseOrderGridRow from "./CustomerPurchaseOrderGridRow";
import DepOrders from "@/modules/md-dep-orders";

export const CustomerPurchaseOrderPicker = (props) => {
	const { label = "訂貨單", ...rest } = props;
	const { token } = useContext(AuthContext);

	const retail = useWatch({
		name: "retail",
	});

	const customer = useWatch({
		name: "customer"
	})

	const querystring = useMemo(() => {
		const obj = {
			tp: 100,
			...(retail && {
				retail: 1,
			}),
			...(customer?.CustID && {
				cst: customer.CustID ?? ""
			})
		};
		return queryString.stringify(obj);
	}, [customer?.CustID, retail]);

	// const disabled = useMemo(() => {
	// 	return (!retail && !customer);
	// }, [customer, retail]);

	return (
		<OptionPicker
			label={label}
			bearer={token}
			url={`v1/sales/customer-invoices/customer-orders`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={DepOrders.getOptionLabel}
			isOptionEqualToValue={DepOrders.isOptionEqualToValue}
			renderTagLabel={DepOrders.renderTagLabel}
			// disabled={disabled}
			optionLabelSize="md"
			GridHeaderComponent={CustomerPurchaseOrderGridHeader}
			GridRowComponent={CustomerPurchaseOrderGridRow}
			notFoundText="訂貨單號 ${input} 不存在"
			inputParam="fz"
			clearOptionsOnChange
			// clearOnChange
			// disableClose
			{...rest}
		/>
	);
};

CustomerPurchaseOrderPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CustomerPurchaseOrderPicker.displayName = "DepOrderPicker";
