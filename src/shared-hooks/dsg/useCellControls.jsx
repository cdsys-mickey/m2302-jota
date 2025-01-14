import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useContext } from "react";

export const useCellControls = () => {
	const dsg = useContext(DSGContext);

	if (!dsg) {
		return null;
	}
	return {
		// from useDSGMeta
		skipDisabled: dsg.skipDisabled,
		// focusNextCell: dsg.focusNextCell,
		getNextCell: dsg.getNextCell,
		// isLastCell: dsg.isLastCell,
		lastCell: dsg.lastCell,
		isLastRow: dsg.isLastRow,
		setActiveCell: dsg.setActiveCell,
		focusPrevCell: dsg.focusPrevCell,
		inDSG: !!dsg,
		// from useDSG
		readOnly: dsg.readOnly,
		supressEvents: dsg.asyncRef?.current?.supressEvents || false
	};
};
