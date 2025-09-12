import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import CheckboxCellComponent from "./CheckboxCellComponent";

const CheckboxCellComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);
	return <CheckboxCellComponent columnData={_columnData} {...rest} />;
}

CheckboxCellComponentContainer.propTypes = {
	columnData: PropTypes.object,
}

CheckboxCellComponentContainer.displayName = "CheckboxComponentContainer";
export default CheckboxCellComponentContainer;