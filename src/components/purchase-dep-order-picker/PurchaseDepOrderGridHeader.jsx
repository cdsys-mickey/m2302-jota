import OptionPickerGridHeader from "@/shared-components/option-picker/grid/OptionPickerGridHeader";
import PropTypes from "prop-types";
import { memo } from "react";
import { DepOrderDateColumn } from "./columns/DepOrderDateColumn";
import { DepOrderDeptColumn } from "./columns/DepOrderDeptColumn";
import { DepOrderDeptIdColumn } from "./columns/DepOrderDeptIdColumn";
import { DepOrderFlagColumn } from "./columns/DepOrderFlagColumn";
import { DepOrderIdColumn } from "./columns/DepOrderIdColumn";
import { DepOrderUserColumn } from "./columns/DepOrderUserColumn";

const PurchaseDepOrderGridHeader = memo(
	() => {
		return (
			<OptionPickerGridHeader>
				<DepOrderFlagColumn header>結</DepOrderFlagColumn>
				<DepOrderIdColumn header>訂貨單號</DepOrderIdColumn>
				<DepOrderDateColumn header>訂貨日期</DepOrderDateColumn>
				<DepOrderDateColumn header>預到日期</DepOrderDateColumn>
				<DepOrderUserColumn header>製單人員</DepOrderUserColumn>
				<DepOrderDeptIdColumn header>出貨門市</DepOrderDeptIdColumn>
				<DepOrderDeptColumn header>訂貨門市</DepOrderDeptColumn>
			</OptionPickerGridHeader>
		);
	}
);

PurchaseDepOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

PurchaseDepOrderGridHeader.displayName = "PurchaseDepOrderGridHeader";
export default PurchaseDepOrderGridHeader;