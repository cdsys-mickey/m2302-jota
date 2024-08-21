import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import ProdCatMPickerComponent from "./ProdCatMPickerComponent";
import PropTypes from "prop-types";

export const ProdCatMPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <ProdCatMPickerComponent columnData={_columnData} {...rest} />
}

ProdCatMPickerComponentContainer.displayName = "ProdCatMPickerComponentContainer";
ProdCatMPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
}