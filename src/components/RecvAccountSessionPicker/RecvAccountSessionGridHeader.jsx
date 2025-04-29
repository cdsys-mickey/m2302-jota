import OptionPickerGridHeader from "@/shared-components/option-picker/grid/OptionPickerGridHeader";
import PropTypes from "prop-types";
import { memo } from "react";
import { G05YMColumn } from "./columns/G05YMColumn";
import { RecvAccountSessionColumn } from "./columns/RecvAccountSessionColumn";

export const RecvAccountSessionGridHeader = memo(
	() => {
		return (
			<OptionPickerGridHeader>
				<G05YMColumn header>採購年月</G05YMColumn>
				<RecvAccountSessionColumn header>期別</RecvAccountSessionColumn>
			</OptionPickerGridHeader>
		);
	}
);

RecvAccountSessionGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

RecvAccountSessionGridHeader.displayName = "RecvAccountSessionGridHeader";
