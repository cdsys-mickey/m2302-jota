import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import ProdCatLPickerComponent from "./ProdCatLPickerComponent";
import PropTypes from "prop-types";

export const ProdCatLPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <ProdCatLPickerComponent columnData={_columnData} {...rest} />
}

ProdCatLPickerComponentContainer.displayName = "ProdCatLPickerComponentContainer";
ProdCatLPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
}