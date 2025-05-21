import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import G10DocPickerCell from "./G10DocPickerCell";
import G10DocPickerCellOld from "./G10DocPickerCellOld";

export const G10DocPickerCellContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <G10DocPickerCellOld columnData={_columnData} {...rest} />;
};

G10DocPickerCellContainer.displayName = "G10DocPickerCellContainer";
G10DocPickerCellContainer.propTypes = {
	columnData: PropTypes.object,
};
