import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import ProdTypeAPickerComponent from "./ProdTypeAPickerComponent";

export const ProdTypeAPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <ProdTypeAPickerComponent columnData={_columnData} {...rest} />;
};

ProdTypeAPickerComponentContainer.displayName =
	"ProdTypeAPickerComponentContainer";

ProdTypeAPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
