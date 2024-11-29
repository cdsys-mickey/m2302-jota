import { useCallback } from "react";
import { DSGLastCellBehavior } from "./DSGLastCellBehavior";
import { toast } from "react-toastify";

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

	const focusNextCell = useCallback(
		(cell, opts = {}) => {
			console.log("focusNextCell from: ", cell);
			if (!getNextCell) {
				throw new Error("useCellComponent 未傳遞進 getNextCell 方法");
			}

			const nextCell = getNextCell(cell, opts);
			if (nextCell.field) {
				setActiveCell(nextCell.field);
			} else {
				if (typeof lastCell === "string") {
					toast.error(lastCell, {
						position: "top-right",
					});
				} else if (typeof lastCell === "function") {
					lastCell(opts);
				} else {
					switch (lastCell) {
						case DSGLastCellBehavior.BLUR:
							setActiveCell(null);
							break;
						case DSGLastCellBehavior.CREATE_ROW:
							if (nextCell.isForward) {
								insertRowBelow();
							}
							break;
					}
				}

			}
		},
		[getNextCell, insertRowBelow, lastCell, setActiveCell]
	);

	return { focusNextCell };
};
