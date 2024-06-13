import { AuthContext } from "@/contexts/auth/AuthContext";

import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { TxoOrderGridHeader } from "./TxoOrderGridHeader";
import { TxoOrderGridRow } from "./TxoOrderGridRow";
import TxoOrders from "../../modules/md-txo-orders";

export const TxoOrderPicker = (props) => {
	const { label = "撥出單", ...rest } = props;
	const { token, operator } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 100,
			tidp: operator.CurDeptID,
		};
		return queryString.stringify(obj);
	}, [operator.CurDeptID]);

	return (
		<OptionPickerWrapper
			label={label}
			bearer={token}
			url={`v1/purchase/trans-in-orders/txo-orders`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={TxoOrders.getOptionLabel}
			isOptionEqualToValue={TxoOrders.isOptionEqualToValue}
			renderTagLabel={TxoOrders.renderTagLabel}
			optionLabelSize="small"
			GridHeaderComponent={TxoOrderGridHeader}
			GridRowComponent={TxoOrderGridRow}
			// disableClose
			{...rest}
		/>
	);
};

TxoOrderPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

TxoOrderPicker.displayName = "TxoOrderPicker";
