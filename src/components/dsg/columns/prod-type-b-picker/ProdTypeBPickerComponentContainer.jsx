import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import ProdTypeBPickerComponent from "./ProdTypeBPickerComponent";

export const ProdTypeBPickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <ProdTypeBPickerComponent columnData={_columnData} {...rest} />;
};

ProdTypeBPickerComponentContainer.displayName =
	"ProdTypeBPickerComponentContainer";

ProdTypeBPickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
