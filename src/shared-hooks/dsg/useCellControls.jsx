import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useContext } from "react";

export const useCellControls = () => {
	const dsg = useContext(DSGContext);

	if (!dsg) {
		return null;
	}
	return {
		skipDisabled: dsg.skipDisabled,
		// focusNextCell: dsg.focusNextCell,
		getNextCell: dsg.getNextCell,
		// isLastCell: dsg.isLastCell,
		lastCell: dsg.lastCell,
		setActiveCell: dsg.setActiveCell,
		inDSG: !!dsg,
		readOnly: dsg.readOnly,
		supressEvents: dsg.asyncRef?.current?.supressEvents || false
	};
};
