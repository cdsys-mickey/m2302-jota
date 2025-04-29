import OptionPickerGridHeader from "@/shared-components/option-picker/grid/OptionPickerGridHeader";
import PropTypes from "prop-types";
import { memo } from "react";
import { TxoOrderDateColumn } from "./columns/TxoOrderDateColumn";
import { TxoOrderDeptColumn } from "./columns/TxoOrderDeptColumn";
import { TxoOrderDeptIdColumn } from "./columns/TxoOrderDeptIdColumn";
import { TxoOrderIdColumn } from "./columns/TxoOrderIdColumn";

export const TxoOrderGridHeader = memo(
	() => {
		return (
			<OptionPickerGridHeader>
				<TxoOrderIdColumn header>撥出單號</TxoOrderIdColumn>
				<TxoOrderDateColumn header>撥出日期</TxoOrderDateColumn>
				<TxoOrderIdColumn header>撥入單號</TxoOrderIdColumn>
				<TxoOrderIdColumn header>訂貨單號</TxoOrderIdColumn>
				<TxoOrderDeptIdColumn header>撥入門市</TxoOrderDeptIdColumn>
				<TxoOrderDeptColumn header>撥出門市</TxoOrderDeptColumn>
			</OptionPickerGridHeader>
		);
	}
);

TxoOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

TxoOrderGridHeader.displayName = "TxoOrderGridHeader";
