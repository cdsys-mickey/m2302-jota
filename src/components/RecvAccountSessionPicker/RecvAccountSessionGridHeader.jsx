import OptionPickerGridHeader from "@/shared-components/option-picker/grid/OptionPickerGridHeader";
import PropTypes from "prop-types";
import { memo } from "react";
import { RecvAcctYMColumn } from "./columns/RecvAcctYMColumn";
import { RecvAccountSessionColumn } from "./columns/RecvAccountSessionColumn";

export const RecvAccountSessionGridHeader = memo(
	() => {
		return (
			<OptionPickerGridHeader>
				<RecvAcctYMColumn header>帳款年月</RecvAcctYMColumn>
				<RecvAccountSessionColumn header>期別</RecvAccountSessionColumn>
			</OptionPickerGridHeader>
		);
	}
);

RecvAccountSessionGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

RecvAccountSessionGridHeader.displayName = "RecvAccountSessionGridHeader";
