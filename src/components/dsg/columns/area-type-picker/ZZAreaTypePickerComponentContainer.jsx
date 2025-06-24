import { useMemo } from "react";
import ZZAreaTypePickerComponent from "./ZZAreaTypePickerComponent";
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

	return <ZZAreaTypePickerComponent columnData={_columnData} {...rest} />;
};

AreaTypePickerComponentContainer.displayName = "AreaTypePickerComponentContainer";
AreaTypePickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
}