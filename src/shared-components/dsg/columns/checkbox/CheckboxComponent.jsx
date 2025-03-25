import Objects from "@/shared-modules/Objects";
import { memo, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useMemo } from "react";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: "CheckboxCompoent",
		fields: "rowData,active,focus,disabled",
		// debug: true,
	});
};

/**
 * 截自 GitHub 上的原始碼，用於改寫加入新功能
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
		// console.log("rendering CheckboxComponent");
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
			disableFocusNext
		} = columnData;

		const toggleChecked = useCallback(
			(e) => {
				console.log("e.target.checked", e.target.checked);
				const newValue = checkedToValue
					? checkedToValue(!e.target.checked)
					: !e.target.checked;
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
			if (!active) {
				// setRowData(!rowData);
				toggleChecked(e);
			}
		}, [active, toggleChecked]);

		const handleChange = useCallback(() => {
			// do nothing
		}, []);

		// When cell becomes focus we immediately toggle the checkbox and blur the cell by calling `stopEditing`
		// Notice the `nextRow: false` to make sure the active cell does not go to the cell below and stays on this cell
		// This way the user can keep pressing Enter to toggle the checkbox on and off multiple times
		useLayoutEffect(() => {
			if (focus) {
				setRowData(!rowData);
				stopEditing({ nextRow: false });
				if (handleFocusNextCell) {
					// handleFocusNextCell(cell);
					setTimeout(() => {
						// handleFocusNextCell(cell, { forward: true });
						handleFocusNextCell(cell);
					});
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [focus, stopEditing]);

		useLayoutEffect(() => {
			if (skipDisabled && active && disabled && !readOnly && !disableFocusNext) {
				if (handleFocusNextCell) {
					// 這裡不能等到下個 cycle
					handleFocusNextCell(cell);
				} else {
					console.log("handleFocusNextCell is null");
				}
			}
		}, [active, cell, columnIndex, disableFocusNext, disabled, handleFocusNextCell, readOnly, rowIndex, skipDisabled]);

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
};
CheckboxComponent.displayName = "CheckboxComponent";
export default CheckboxComponent;
