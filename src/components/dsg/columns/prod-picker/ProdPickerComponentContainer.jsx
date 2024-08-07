import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import ProdPickerComponent from "./ProdPickerComponent";

export const ProdPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <ProdPickerComponent columnData={_columnData} {...rest} />;
};
ProdPickerComponentContainer.displayName = "ProdPickerComponentContainer";
ProdPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
