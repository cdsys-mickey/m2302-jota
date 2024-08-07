import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import DeptPickerComponent from "./DeptPickerComponent";

export const DeptPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <DeptPickerComponent columnData={_columnData} {...rest} />;
};

DeptPickerComponentContainer.displayName = "DeptPickerComponentContainer";
DeptPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
