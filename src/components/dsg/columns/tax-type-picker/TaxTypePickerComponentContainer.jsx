import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import TaxTypePickerComponent from "./TaxTypePickerComponent";

export const TaxTypePickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <TaxTypePickerComponent columnData={_columnData} {...rest} />;
};

TaxTypePickerComponentContainer.displayName =
	"TaxTypePickerComponentContainer";

TaxTypePickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
