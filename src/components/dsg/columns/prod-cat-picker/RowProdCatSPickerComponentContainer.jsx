import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import PropTypes from "prop-types";
import { useMemo } from "react";
import RowProdCatSPickerComponent from "./RowProdCatSPickerComponent";

export const RowProdCatSPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <RowProdCatSPickerComponent columnData={_columnData} {...rest} />
}

RowProdCatSPickerComponentContainer.displayName = "RowProdCatSPickerComponentContainer";
RowProdCatSPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
}