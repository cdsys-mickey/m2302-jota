import OptionPickerGridHeader from "@/shared-components/option-picker/grid/OptionPickerGridHeader";
import PropTypes from "prop-types";
import { memo } from "react";
import { DepOrderDateColumn } from "./columns/DepOrderDateColumn";
import { DepOrderDeptIdColumn } from "./columns/DepOrderDeptIdColumn";
import { DepOrderDeptNameColumn } from "./columns/DepOrderDeptNameColumn";
import { DepOrderFlagColumn } from "./columns/DepOrderFlagColumn";
import { DepOrderIdColumn } from "./columns/DepOrderIdColumn";
import { DepOrderUserColumn } from "./columns/DepOrderUserColumn";

const CustomerPurchaseOrderGridHeader = memo(
	() => {
		return (
			<OptionPickerGridHeader>
				<DepOrderIdColumn header>訂貨單號</DepOrderIdColumn>
				<DepOrderFlagColumn header justifyContent="center">結</DepOrderFlagColumn>
				<DepOrderDateColumn header>訂貨日期</DepOrderDateColumn>
				<DepOrderUserColumn header>業務員</DepOrderUserColumn>
				<DepOrderFlagColumn header justifyContent="center">零售</DepOrderFlagColumn>
				<DepOrderDeptIdColumn header>客戶代碼</DepOrderDeptIdColumn>
				<DepOrderDeptNameColumn header>客戶名稱</DepOrderDeptNameColumn>
			</OptionPickerGridHeader>
		);
	}
);

CustomerPurchaseOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CustomerPurchaseOrderGridHeader.displayName = "PurchaseDepOrderGridHeader";
export default CustomerPurchaseOrderGridHeader;