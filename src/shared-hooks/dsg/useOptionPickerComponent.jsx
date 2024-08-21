import { useCallback, useLayoutEffect, useMemo, useRef } from "react";

export const useOptionPickerComponent = (opts) => {
	const {
		focus,
		active,
		disabled,
		hideControlsOnActive,
		selectOnFocus,
		rowIndex,
		columnIndex,
		skipDisabled,
		nextCell,
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
			console.log("handleChange", newValue);
			setRowData(newValue);
			if (!newValue) {
				return;
			}
			// setTimeout(() => stopEditing({ nextRow: false }), 50);
			setTimeout(() => stopEditing({ nextRow: false }));
		},
		[setRowData, stopEditing]
	);

	// 跳過停用 Cell
	useLayoutEffect(() => {
		if (skipDisabled && active && disabled && !readOnly) {
			if (nextCell) {
				nextCell({ row: rowIndex, col: columnIndex });
			} else {
				console.log("nextCell is null");
			}
		}
	}, [active, columnIndex, disabled, nextCell, readOnly, rowIndex, skipDisabled]);

	return {
		ref,
		hideControls,
		cell,
		handleChange,
	};
};
