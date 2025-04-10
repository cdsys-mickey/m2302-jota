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
		getNextCell: dsg.getNextCell,
		lastCell: dsg.lastCell,
		isLastRow: dsg.isLastRow,
		setActiveCell: dsg.setActiveCell,
		handleFocusPrevCell: dsg.handleFocusPrevCell,
		inDSG: !!dsg,
		// from useDSG
		readOnly: dsg.readOnly,
		supressEvents: dsg.asyncRef?.current?.supressEvents || false
	};
};
