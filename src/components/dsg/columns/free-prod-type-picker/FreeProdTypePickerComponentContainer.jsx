import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import { useMemo } from "react";
import FreeProdTypePickerComponent from "./FreeProdTypePickerComponent";
import PropTypes from "prop-types";

export const FreeProdTypePickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);
	return <FreeProdTypePickerComponent columnData={_columnData}  {...rest} />
}

FreeProdTypePickerComponentContainer.displayName = "FreeProdTypePickerComponentContainer";
FreeProdTypePickerComponentContainer.propTypes = {
	columnData: PropTypes.object
}