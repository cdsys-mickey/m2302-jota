import { useCallback } from "react";
import { DSGLastCellBehavior } from "./DSGLastCellBehavior";
import { toast } from "react-toastify";
import toastEx from "@/shared-components/ToastEx/toastEx";

export const useCellComponent = (props = {}) => {
	const {
		// from DSGContext
		getNextCell,
		lastCell,
		isLastRow,
		setActiveCell,
		toFirstColumn,
		// from Cell Component
		stopEditing,
		insertRowBelow,
	} = props;

	const handleFocusNextCell = useCallback(
		(cell, opts = {}) => {
			console.log("handleFocusNextCell from: ", cell);
			if (!getNextCell) {
				throw new Error("useCellComponent 未傳遞進 getNextCell 方法");
			}

			const nextCell = getNextCell(cell, opts);
			if (nextCell.field) {
				setActiveCell(nextCell.field);
			} else {
				// 要先確認是最後一行
				if (!isLastRow(cell)) {
					return;
				}
				if (typeof lastCell === "string") {
					toastEx.warn(lastCell);
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
		[getNextCell, insertRowBelow, isLastRow, lastCell, setActiveCell]
	);

	return { handleFocusNextCell };
};
