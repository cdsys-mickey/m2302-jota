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
		readOnly,
		focusOnDisabled = false,
		// Control Mehotds
		// insertRowBelow,
		// Context Method,
		// getNextCell,
		// lastCell,
		// setActiveCell,
	} = opts;

	const ref = useRef();
	const asyncRef = useRef({
		open: null
	});

	const cell = useMemo(() => {
		return {
			row: rowIndex,
			col: columnIndex,
		};
	}, [columnIndex, rowIndex]);

	const hideControls = useMemo(() => {
		return disabled || hideControlsOnActive ? !focus : !active;
	}, [active, hideControlsOnActive, disabled, focus]);


	const handleChange = useCallback(
		(newValue) => {
			console.log(`[${name}]useOptionPickerComponent.handleChange`, newValue);
			setRowData(newValue);
			// if (!newValue) {
			// 	return;
			// }
			setTimeout(() => {
				stopEditing({ nextRow: false })
				console.log("stopEditing invoked");
				ref.current?.blur();
			});
			// stopEditing({ nextRow: false });
			// ref.current?.blur();
		},
		[name, setRowData, stopEditing]
	);

	const handleOpen = useCallback(() => {
		console.log("onOpen callback fired");
		asyncRef.current.open = true;
	}, []);

	const handleClose = useCallback(() => {
		console.log("onClose callback fired");
		asyncRef.current.open = false;
	}, []);

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			// console.log("useOptionPickerComponent.focus", focus);
			ref.current?.focus();
			if (selectOnFocus) {
				ref.current?.select();
			}
		} else {
			// console.log(`useOptionPickerComponent.leaveFocus, asyncRef.current.open: ${asyncRef.current.open}`);
			if (!asyncRef.current.open) {
				ref.current?.blur();
			}
		}
	}, [focus, selectOnFocus]);

	// useLayoutEffect(() => {
	// 	console.log("useOptionPickerComponent.active", active);
	// }, [active, stopEditing]);

	// 先單純靠 OptionPicker 內的
	// 跳過停用 Cell
	useLayoutEffect(() => {
		if (skipDisabled && active && disabled && !focusOnDisabled && !readOnly) {
			if (focusNextCell) {
				focusNextCell(cell);
			} else {
				console.log("focusNextCell is null");
			}
		}
	}, [active, cell, columnIndex, disabled, focusNextCell, focusOnDisabled, readOnly, rowIndex, skipDisabled]);

	return {
		ref,
		hideControls,
		cell,
		handleChange,
		handleOpen,
		handleClose
	};
};
