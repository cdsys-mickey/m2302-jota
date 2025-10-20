import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import Objects from "@/shared-modules/Objects.mjs";
import { Checkbox } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useMemo, useRef } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: "CheckboxCellCompoent",
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
const CheckboxCellComponent = memo(
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
			focusNextCellOnChange = false,
			color = "default"
		} = columnData;

		// const toggleChecked = useCallback(
		// 	(e) => {

		// 		const newValue = checkedToValue
		// 			? checkedToValue(!e.target.checked)
		// 			: !e.target.checked;
		// 		console.log(`e.target.checked ${e.target.checked} → ${newValue}`);
		// 		setRowData(newValue);
		// 	},
		// 	[checkedToValue, setRowData]
		// );

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
		useLayoutEffect(() => {
			if (focus) {
				stopEditing({ nextRow: false });
				if (handleFocusNextCell && focusNextCellOnChange) {
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
		}, [active, cell, columnIndex, focusNextCellOnChange, disabled, handleFocusNextCell, readOnly, rowIndex, skipDisabled]);

		return (
			<Checkbox
				color={color}
				className="dsg-checkbox"
				style={{
					// ...(size === "large" && {
					// 	height: "24px",
					// 	width: "24px",
					// }),
					// ...(size === "medium" && {
					// 	height: "18px",
					// 	width: "18px",
					// }),
					...(disabled && {
						pointerEvents: "none",
					}),
					cursor: "pointer",
				}}
				sx={{
					// 確保根元素有定位和 z-index
					'&.MuiCheckbox-root': {
						padding: 0,
						position: 'relative',
						zIndex: 1, // 讓 Checkbox 本身在我們的背景偽元素之上
					},

					// 針對 Checkbox 內部的 SVG 元素
					'& .MuiSvgIcon-root': {
						// 這個樣式很重要，它控制了方框或勾的顏色。
						// 預設情況下，`color` prop 已經將 SVG 的 `fill` 設定為主題色。
						// 在未勾選時，這個 SVG 的 `fill` 基本上是透明的，只有 `stroke` 是主題色。
					},

					...(!disabled && {
						// ------------------------------------------------------------------
						// **處理未勾選狀態的實心白色背景**
						// 當 Checkbox 未勾選時，添加一個白色背景的偽元素
						'&:not(.Mui-checked)::before': {
							content: '""',
							width: '1em',
							height: '1em',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							background: 'white', // **讓未勾選的透明中心變白色 (實心)**
							borderRadius: '2px',
							zIndex: -1, // 放在 SVG 圖標下方
						},

						// ------------------------------------------------------------------
						// **處理已勾選狀態的白色勾背景**
						// 當 Checkbox 勾選時，添加一個白色背景的偽元素 (這和上一個答案一致)
						// 讓透明的勾透出白色
						'&.Mui-checked::before': {
							content: '""',
							width: '1em',
							height: '1em',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							background: 'white', // **讓透明勾透出白色**
							borderRadius: '2px',
							zIndex: -1,
						},
					})
				}}
				disableRipple
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
			/>
		);
	},
	arePropsEqual
);
CheckboxCellComponent.propTypes = {
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
CheckboxCellComponent.displayName = "CheckboxComponent";
export default CheckboxCellComponent;
