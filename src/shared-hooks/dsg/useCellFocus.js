import toastEx from "@/shared-components/ToastEx/toastEx";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useCallback, useContext } from "react";
import { DSGLastCellBehavior } from "./DSGLastCellBehavior";
import CommonStyles from "@/shared-modules/CommonStyles.mjs";

export const useCellFocus = (props = {}) => {
	const { insertRowBelow } = props;

	if (insertRowBelow === undefined) {
		console.warn(`%cinsertRowBelow未傳遞`, CommonStyles.CONSOLE_WARN);
	}

	const dsg = useContext(DSGContext);

	const {
		getNextCell,
		lastCell,
		isLastRow,
		setActiveCell,
		// props
		skipDisabled,
		readOnly,
		focusOnDisabled,
	} = dsg;

	const handleFocusNextCell = useCallback(
		(cell, opts = {}) => {
			console.log("handleFocusNextCell from: ", cell);
			if (!getNextCell) {
				throw new Error("useCellFocus 未傳遞進 getNextCell 方法");
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

	return {
		handleFocusNextCell,
		skipDisabled,
		readOnly,
		focusOnDisabled,
	};
};
