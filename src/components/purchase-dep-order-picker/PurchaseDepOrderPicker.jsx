import { AuthContext } from "@/contexts/auth/AuthContext";

import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import PurchaseDepOrderGridHeader from "./PurchaseDepOrderGridHeader";
import PurchaseDepOrderGridRow from "./PurchaseDepOrderGridRow";
import DepOrders from "@/modules/md-dep-orders";

export const PurchaseDepOrderPicker = (props) => {
	const { label = "採購單", ...rest } = props;
	const { token } = useContext(AuthContext);

	const txiDept = useWatch({
		name: "txiDept",
	});

	const querystring = useMemo(() => {
		const obj = {
			tp: 100,
			ind: txiDept?.DeptID,
		};
		return queryString.stringify(obj);
	}, [txiDept?.DeptID]);

	const disabled = useMemo(() => {
		return !txiDept;
	}, [txiDept]);

	return (
		<OptionPicker
			label={label}
			bearer={token}
			url={`v1/purchase/trans-out-orders/dep-orders`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={DepOrders.getOptionLabel}
			isOptionEqualToValue={DepOrders.isOptionEqualToValue}
			renderTagLabel={DepOrders.renderTagLabel}
			disabled={disabled}
			optionLabelSize="md"
			GridHeaderComponent={PurchaseDepOrderGridHeader}
			GridRowComponent={PurchaseDepOrderGridRow}
			notFoundText="門市訂貨單號 ${input} 不存在"
			inputParam="fz"
			clearOnChange
			// disableClose
			{...rest}
		/>
	);
};

PurchaseDepOrderPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

PurchaseDepOrderPicker.displayName = "DepOrderPicker";
