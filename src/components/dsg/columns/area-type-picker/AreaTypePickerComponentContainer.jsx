import { useMemo } from "react";
import AreaTypePickerComponent from "./AreaTypePickerComponent";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";

export const AreaTypePickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <AreaTypePickerComponent columnData={_columnData} {...rest} />;
};

AreaTypePickerComponentContainer.displayName = "AreaTypePickerComponentContainer";
AreaTypePickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
}