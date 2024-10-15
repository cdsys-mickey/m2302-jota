import { useCallback, useLayoutEffect, useMemo, useRef } from "react";

export const useOptionPickerComponent = (opts) => {
	const {
		name,
		focus,
		active,
		disabled,
		hideControlsOnActive,
		selectOnFocus,
		rowIndex,
		columnIndex,
		skipDisabled,
		focusNextCell,
		setRowData,
		stopEditing,
		readOnly
		// Control Mehotds
		// insertRowBelow,
		// Context Method,
		// getNextCell,
		// lastCell,
		// setActiveCell,
	} = opts;

	const ref = useRef();

	const cell = useMemo(() => {
		return {
			row: rowIndex,
			col: columnIndex,
		};
	}, [columnIndex, rowIndex]);

	const hideControls = useMemo(() => {
		return disabled || hideControlsOnActive ? !focus : !active;
	}, [active, hideControlsOnActive, disabled, focus]);

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			ref.current?.focus();
			if (selectOnFocus) {
				ref.current?.select();
			}
		} else {
			ref.current?.blur();
		}
	}, [focus, selectOnFocus]);

	const handleChange = useCallback(
		(newValue) => {
			console.log(`${name}.handleChange`, newValue);
			setRowData(newValue);
			if (!newValue) {
				return;
			}
			setTimeout(() => stopEditing({ nextRow: false }));
		},
		[name, setRowData, stopEditing]
	);

	// 先單純靠 OptionPicker 內的
	// 跳過停用 Cell
	useLayoutEffect(() => {
		if (skipDisabled && active && disabled && !readOnly) {
			if (focusNextCell) {
				focusNextCell(cell);
			} else {
				console.log("focusNextCell is null");
			}
		}
	}, [active, cell, columnIndex, disabled, focusNextCell, readOnly, rowIndex, skipDisabled]);

	return {
		ref,
		hideControls,
		cell,
		handleChange,
	};
};
