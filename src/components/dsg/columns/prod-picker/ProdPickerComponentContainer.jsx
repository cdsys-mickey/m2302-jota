import { useContext } from "react";
import ProdPickerComponent from "./ProdPickerComponent";
import { DsgContext } from "@/shared-contexts/datasheet-grid/DsgContext";
import PropTypes from "prop-types";
import { useMemo } from "react";

export const ProdPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const dsg = useContext(DsgContext);
	const _columnData = useMemo(() => {
		return {
			...columnData,
			nextCell: dsg.nextCell,
		};
	}, [columnData, dsg.nextCell]);
	return <ProdPickerComponent columnData={_columnData} {...rest} />;
};
ProdPickerComponentContainer.displayName = "ProdPickerComponentContainer";
ProdPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
