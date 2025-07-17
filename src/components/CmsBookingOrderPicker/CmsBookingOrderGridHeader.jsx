import OptionPickerGridHeader from "@/shared-components/option-picker/grid/OptionPickerGridHeader";
import PropTypes from "prop-types";
import { memo } from "react";
import { CmsBookingOrderDateColumn } from "./columns/CmsBookingOrderDateColumn";
import { CmsBookingOrderDeptColumn } from "./columns/CmsBookingOrderDeptColumn";
import { CmsBookingOrderIdColumn } from "./columns/CmsBookingOrderIdColumn";

const CmsBookingOrderGridHeader = memo(
	() => {
		return (
			<OptionPickerGridHeader>
				<CmsBookingOrderIdColumn header>預約單號</CmsBookingOrderIdColumn>
				<CmsBookingOrderDateColumn header>訂訪日</CmsBookingOrderDateColumn>
				<CmsBookingOrderDateColumn header>到訪日</CmsBookingOrderDateColumn>
				<CmsBookingOrderDeptColumn header>團體名稱</CmsBookingOrderDeptColumn>
				<CmsBookingOrderDeptColumn header>車行</CmsBookingOrderDeptColumn>
				<CmsBookingOrderDeptColumn header>旅行社</CmsBookingOrderDeptColumn>
			</OptionPickerGridHeader>
		);
	}
);

CmsBookingOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CmsBookingOrderGridHeader.displayName = "CmsBookingOrderGridHeader";
export default CmsBookingOrderGridHeader;