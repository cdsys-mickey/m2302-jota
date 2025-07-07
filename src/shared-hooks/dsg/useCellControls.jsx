import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useContext } from "react";

export const useCellControls = () => {
	const dsg = useContext(DSGContext);

	if (!dsg) {
		return null;
	}
	return {
		// from useDSGMeta
		getNextCell: dsg.getNextCell,
		lastCell: dsg.lastCell,
		isLastRow: dsg.isLastRow,
		setActiveCell: dsg.setActiveCell,
		handleFocusPrevCell: dsg.handleFocusPrevCell,
		skipDisabled: dsg.skipDisabled,
		inDSG: !!dsg,

		// from DSGContext
		readOnly: dsg.readOnly,
		supressEvents: dsg.asyncRef?.current?.supressEvents || false
	};
};
