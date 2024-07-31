import { useContext } from "react";
import ProdTypeAPickerComponent from "./ProdTypeAPickerComponent";
import { DsgContext } from "@/shared-contexts/datasheet-grid/DsgContext";
import PropTypes from "prop-types";
import { useMemo } from "react";

export const ProdTypeAPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const dsg = useContext(DsgContext);
	const _columnData = useMemo(() => {
		return {
			...columnData,
			nextCell: dsg.nextCell,
		};
	}, [columnData, dsg.nextCell]);
	return <ProdTypeAPickerComponent columnData={_columnData} {...rest} />;
};

ProdTypeAPickerComponentContainer.displayName =
	"ProdTypeAPickerComponentContainer";
ProdTypeAPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
