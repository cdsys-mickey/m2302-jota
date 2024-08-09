import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useContext } from "react";

export const useCellControls = () => {
	const dsg = useContext(DSGContext);

	if (!dsg) {
		return null;
	}
	return {
		skipDisabled: dsg.skipDisabled,
		nextCell: dsg.nextCell,
		getNextCell: dsg.getNextCell,
		lastCell: dsg.lastCell,
		setActiveCell: dsg.setActiveCell,
		inDSG: !!dsg,
	};
};
