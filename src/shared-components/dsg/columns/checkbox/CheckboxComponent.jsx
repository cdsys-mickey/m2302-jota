import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import Objects from "@/shared-modules/Objects.mjs";
import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useMemo, useRef } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: "CheckboxCompoent",
		fields: "rowData,active,focus,disabled",
		// debug: true,
	});
};

/**
 * 截自 GitHub 上的原始碼，用於改寫加入新功能
 * 1. 使用空白鍵切換
 * 2. 按 Enter 不改變 rowData
 * https://github.com/nick-keller/react-datasheet-grid/blob/master/src/columns/checkboxColumn.tsx
 */
const CheckboxComponent = memo(
	({
		columnData,
		focus,
		rowData,
		rowIndex,
		columnIndex,
		setRowData,
		active,
		stopEditing,
		insertRowBelow,
		disabled,
	}) => {
		const ref = useRef(null);

		const {
			size,
			valueToChecked,
			checkedToValue,
			// Context Methods
			skipDisabled,
			getNextCell,
			lastCell,
			isLastRow,
			setActiveCell,
			readOnly,
			focusNextCell = true
		} = columnData;

		const toggleChecked = useCallback(
			(e) => {

				const newValue = checkedToValue
					? checkedToValue(!e.target.checked)
					: !e.target.checked;
				console.log(`e.target.checked ${e.target.checked} → ${newValue}`);
				setRowData(newValue);
			},
			[checkedToValue, setRowData]
		);

		const checked = useMemo(() => {
			return valueToChecked ? valueToChecked(rowData) : rowData
		}, [rowData, valueToChecked]);


		const cell = useMemo(() => {
			return {
				row: rowIndex,
				col: columnIndex,
			};
		}, [columnIndex, rowIndex]);

		const { handleFocusNextCell } = useCellComponent({
			getNextCell,
			lastCell,
			isLastRow,
			setActiveCell,
			stopEditing,
			insertRowBelow,
		});

		const handleKeyDown = useCallback((e) => {
			console.log("handleKeyDown", e);
		}, []);

		const handleMouseDown = useCallback((e) => {
			// if (!active) {
			setRowData(!rowData);
			// toggleChecked(e);
			// }
		}, [rowData, setRowData]);

		const handleChange = useCallback(() => {
			// do nothing
		}, []);

		// 當 focus 時, 切換 rowData, 再視條件往下一格前進
		// useLayoutEffect(() => {
		// 	if (focus) {
		// 		setRowData(!rowData);
		// 		stopEditing({ nextRow: false });
		// 		console.log(`focusNextCell: ${focusNextCell}`);
		// 		if (handleFocusNextCell && focusNextCell) {
		// 			setTimeout(() => {
		// 				handleFocusNextCell(cell);
		// 			});
		// 		}
		// 	}
		// 	// eslint-disable-next-line react-hooks/exhaustive-deps
		// }, [focus, stopEditing]);
		useLayoutEffect(() => {
			if (focus) {
				stopEditing({ nextRow: false });
				if (handleFocusNextCell && focusNextCell) {
					// 只會往下走
					setTimeout(() => {
						handleFocusNextCell(cell, { forward: true });
					});
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [focus, stopEditing]);

		// 略過停用的 cell
		useLayoutEffect(() => {
			if (skipDisabled && active && disabled && !readOnly) {
				if (handleFocusNextCell) {
					// 這裡不能等到下個 cycle
					handleFocusNextCell(cell);
				} else {
					console.log("handleFocusNextCell is null");
				}
			}
		}, [active, cell, columnIndex, focusNextCell, disabled, handleFocusNextCell, readOnly, rowIndex, skipDisabled]);

		return (
			<input
				className="dsg-checkbox"
				style={{
					...(size === "large" && {
						height: "24px",
						width: "24px",
					}),
					...(size === "medium" && {
						height: "18px",
						width: "18px",
					}),
					...(disabled && {
						pointerEvents: "none",
					}),
					cursor: "pointer",
					// appearance: "none",
					// ":checked": {
					// 	backgroundColor: "#555"
					// }
				}}
				// Important to prevent any undesired "tabbing"
				tabIndex={-1}
				type="checkbox"
				ref={ref}
				disabled={disabled}
				// checked={Boolean(rowData)}
				checked={checked}
				// When cell is not active, we allow the user to toggle the checkbox by clicking on it
				// When cell becomes active, we disable this feature and rely on focus instead (see `useLayoutEffect` above)
				// onMouseDown={() => !active && setRowData(!rowData)}
				onMouseDown={handleMouseDown}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			// onChange={() => null}
			/>
		);
	},
	arePropsEqual
);
CheckboxComponent.propTypes = {
	columnData: PropTypes.object,
	rowData: PropTypes.bool,
	focus: PropTypes.bool,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	stopEditing: PropTypes.func,
	setRowData: PropTypes.func,
	insertRowBelow: PropTypes.func,
	rowIndex: PropTypes.number,
	columnIndex: PropTypes.number
};
CheckboxComponent.displayName = "CheckboxComponent";
export default CheckboxComponent;
