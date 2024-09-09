import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCellControls } from "@/shared-hooks/dsg/useCellControls";
import OutboundTypePickerComponent from "./OutboundTypePickerComponent";

export const OutboundTypePickerComponentContainer = (props) => {
	const { columnData, ...rest } = props;
	const cellControls = useCellControls();

	const _columnData = useMemo(() => {
		return {
			...columnData,
			...cellControls,
		};
	}, [cellControls, columnData]);

	return <OutboundTypePickerComponent columnData={_columnData} {...rest} />;
};

OutboundTypePickerComponentContainer.displayName =
	"OutboundTypePickerComponentContainer";

OutboundTypePickerComponentContainer.propTypes = {
	columnData: PropTypes.object,
};
