import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { useChangeTracking } from "../useChangeTracking";

export const useOptionPickerComponent = (opts) => {
	const {
		name,
		rowIndex,
		rowData,
		focus,
		active,
		disabled,
		hideControlsOnActive,
		selectOnFocus,
		columnIndex,
		skipDisabled,
		handleFocusNextCell,
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
		multiple
	} = opts;

	const inputRef = useRef();
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
				inputRef.current?.blur();
			});
			// stopEditing({ nextRow: false });
			// inputRef.current?.blur();
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
			inputRef.current?.focus();
			if (selectOnFocus) {
				inputRef.current?.select();
			}
		} else {
			// console.log(`useOptionPickerComponent.leaveFocus, asyncRef.current.open: ${asyncRef.current.open}`);
			if (!asyncRef.current.open) {
				inputRef.current?.blur();
			}
		}
	}, [focus, selectOnFocus]);

	// useLayoutEffect(() => {
	// 	console.log("useOptionPickerComponent.active", active);
	// }, [active, stopEditing]);

	/** active 時跳過停用的 Cell
	 * 
	**/
	useLayoutEffect(() => {
		if (skipDisabled && active && disabled && !focusOnDisabled && !readOnly) {
			if (handleFocusNextCell) {
				handleFocusNextCell(cell);
			} else {
				console.log("handleFocusNextCell is null");
			}
		}
	}, [active, cell, columnIndex, disabled, handleFocusNextCell, focusOnDisabled, readOnly, rowIndex, skipDisabled]);

	/**
	 * 選擇了新值後，觸發焦點移轉往前
	 */
	useChangeTracking(() => {
		console.log(`[${name}].rowData changed`, rowData);
		// 當選項改變, 且有值, 且非 multiple
		if (rowData && !multiple && !disabled && active) {
			console.log(`\thandleFocusNextCell triggered`);
			asyncRef.current.performFocusNext = false;
			// 由於選擇新值觸發的焦點移轉一定是 forward: true
			handleFocusNextCell(cell, { forward: true });
		}
	}, [rowData]);

	const extraPropts = useMemo(() => {
		return {
			toastError: true,
			blurToLookup: false,
			hideBorders: true,
			disableFadeOut: true,
			dense: true,
			autoHighlight: true,
			selectOnFocus: true,
			label: ""
		}
	}, [])


	return {
		name,
		inputRef,
		hideControls,
		cell,
		onChange: handleChange,
		onOpen: handleOpen,
		onClose: handleClose,
		disabled,
		multiple,
		value: rowData,
		handleFocusNextCell,
		...extraPropts
	};
};
