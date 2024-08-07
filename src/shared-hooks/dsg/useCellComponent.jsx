import { useCallback } from "react";
import { DSGLastCellBehavior } from "./DSGLastCellBehavior";

export const useCellComponent = (props = {}) => {
	const {
		// from DSGContext
		getNextCell,
		lastCell,
		setActiveCell,
		// from Cell Component
		stopEditing,
		insertRowBelow,
	} = props;

	const handleNextCell = useCallback(
		(cell, opts) => {
			if (!getNextCell) {
				throw new Error("useCellComponent 未傳遞進 getNextCell 方法");
			}

			const next = getNextCell(cell, opts);
			if (next) {
				setActiveCell(next);
			} else {
				switch (lastCell) {
					case DSGLastCellBehavior.BLUR:
						setActiveCell(null);
						break;
					case DSGLastCellBehavior.CREATE_ROW:
						insertRowBelow();
						break;
				}
			}
		},
		[getNextCell, insertRowBelow, lastCell, setActiveCell]
	);

	return { handleNextCell };
};
