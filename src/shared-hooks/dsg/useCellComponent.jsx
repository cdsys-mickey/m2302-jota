import { useCallback } from "react";
import { DSGLastCellBehavior } from "./DSGLastCellBehavior";

export const useCellComponent = (props = {}) => {
	const {
		// from DSGContext
		getNextCell,
		lastCell,
		setActiveCell,
		toFirstColumn,
		// from Cell Component
		stopEditing,
		insertRowBelow,
	} = props;

	const nextCell = useCallback(
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
						// setTimeout(() => {
						// 	toFirstColumn();
						// }, 50);
						break;
				}
			}
		},
		[getNextCell, insertRowBelow, lastCell, setActiveCell]
	);

	return { nextCell };
};
