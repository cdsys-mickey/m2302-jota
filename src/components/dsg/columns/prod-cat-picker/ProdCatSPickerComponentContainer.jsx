import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import ProdCatSPickerComponent from "./ProdCatSPickerComponent";
import PropTypes from "prop-types";

export const ProdCatSPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <ProdCatSPickerComponent columnData={_columnData} {...rest} />
}

ProdCatSPickerComponentContainer.displayName = "ProdCatSPickerComponentContainer";
ProdCatSPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
}