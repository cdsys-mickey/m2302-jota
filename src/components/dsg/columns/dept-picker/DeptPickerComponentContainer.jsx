import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { DsgContext } from "@/shared-contexts/datasheet-grid/DsgContext";
import DeptPickerComponent from "./DeptPickerComponent";

export const DeptPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const dsg = useContext(DsgContext);
	const _columnData = useMemo(() => {
		return {
			...columnData,
			nextCell: dsg.nextCell,
		};
	}, [columnData, dsg.nextCell]);
	return <DeptPickerComponent columnData={_columnData} {...rest} />;
};

DeptPickerComponentContainer.displayName = "DeptPickerComponentContainer";
DeptPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
