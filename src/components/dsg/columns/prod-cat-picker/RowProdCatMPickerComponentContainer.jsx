import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import RowProdCatMPickerComponent from "./RowProdCatMPickerComponent";

export const RowProdCatMPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <RowProdCatMPickerComponent columnData={_columnData} {...rest} />
}

RowProdCatMPickerComponentContainer.displayName = "RowProdCatMPickerComponentContainer";
RowProdCatMPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
}