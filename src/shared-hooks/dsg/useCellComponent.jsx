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

	const nextCell = useCallback(
		(cell, opts = {}) => {
			if (!getNextCell) {
				throw new Error("useCellComponent 未傳遞進 getNextCell 方法");
			}

			const next = getNextCell(cell, opts);
			if (next.field) {
				setActiveCell(next.field);
			} else {
				if (typeof lastCell === "string") {
					toast.error(lastCell, {
						position: "top-center",
					});
				} else if (typeof lastCell === "function") {
					lastCell(opts);
				} else {
					switch (lastCell) {
						case DSGLastCellBehavior.BLUR:
							setActiveCell(null);
							break;
						case DSGLastCellBehavior.CREATE_ROW:
							if (next.isForward) {
								insertRowBelow();
							}
							break;
					}
				}

			}
		},
		[getNextCell, insertRowBelow, lastCell, setActiveCell]
	);

	return { nextCell };
};
