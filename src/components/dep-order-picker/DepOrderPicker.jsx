import { AuthContext } from "@/contexts/auth/AuthContext";

import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { DepOrderGridHeader } from "./DepOrderGridHeader";
import { DepOrderGridRow } from "./DepOrderGridRow";
import DepOrders from "../../modules/md-dep-orders";

export const DepOrderPicker = (props) => {
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
		<OptionPickerWrapper
			label={label}
			bearer={token}
			url={`v1/purchase/trans-out-orders/dep-orders`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={DepOrders.getOptionLabel}
			isOptionEqualToValue={DepOrders.isOptionEqualToValue}
			renderTagLabel={DepOrders.renderTagLabel}
			disabled={disabled}
			optionLabelSize="small"
			GridHeaderComponent={DepOrderGridHeader}
			GridRowComponent={DepOrderGridRow}
			// disableClose
			{...rest}
		/>
	);
};

DepOrderPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

DepOrderPicker.displayName = "DepOrderPicker";
