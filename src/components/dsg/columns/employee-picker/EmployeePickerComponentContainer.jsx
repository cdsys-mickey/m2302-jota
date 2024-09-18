import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import EmployeePickerComponent from "./EmployeePickerComponent";

export const EmployeePickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <EmployeePickerComponent columnData={_columnData} {...rest} />;
};

EmployeePickerComponentContainer.displayName = "EmployeePickerComponentContainer";
EmployeePickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
}