import OptionPickerGridHeader from "@/shared-components/option-picker/grid/OptionPickerGridHeader";
import PropTypes from "prop-types";
import { memo } from "react";
import { CmsEntryDateColumn } from "./columns/CmsEntryDateColumn";
import { CmsEntryDeptColumn } from "./columns/CmsEntryDeptColumn";
import { CmsEntryIdColumn } from "./columns/CmsEntryIdColumn";

const CmsEntryGridHeader = memo(
	() => {
		return (
			<OptionPickerGridHeader>
				<CmsEntryIdColumn header>預約單號</CmsEntryIdColumn>
				<CmsEntryDateColumn header>訂訪日</CmsEntryDateColumn>
				<CmsEntryDateColumn header>到訪日</CmsEntryDateColumn>
				<CmsEntryDeptColumn header>團體名稱</CmsEntryDeptColumn>
				<CmsEntryDeptColumn header>車行</CmsEntryDeptColumn>
				<CmsEntryDeptColumn header>旅行社</CmsEntryDeptColumn>
			</OptionPickerGridHeader>
		);
	}
);

CmsEntryGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CmsEntryGridHeader.displayName = "CmsEntryGridHeader";
export default CmsEntryGridHeader;