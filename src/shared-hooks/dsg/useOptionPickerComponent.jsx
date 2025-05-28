import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { useChangeTracking } from "../useChangeTracking";
import CommonStyles from "@/shared-modules/CommonStyles.mjs";

export const useOptionPickerComponent = (opts) => {
	const {
		// from props
		rowIndex,
		rowData,
		focus,
		active,
		disabled,
		columnIndex,
		setRowData,
		stopEditing,
		// from cellFocus
		handleFocusNextCell,
		skipDisabled,
		readOnly,
		focusOnDisabled = false,
		// from columnData
		name,
		hideControlsOnActive,
		selectOnFocus,
		multiple = false
	} = opts;

	// props
	Object.entries({
		rowIndex,
		rowData,
		focus,
		active,
		disabled,
		columnIndex,
		setRowData,
		stopEditing,
	}).forEach(([name, prop]) => {
		if (prop === undefined) {
			console.warn(`%c[props].${name}未傳遞`, CommonStyles.CONSOLE_WARN);
		}
	});

	// cellFocus
	Object.entries({
		handleFocusNextCell,
		skipDisabled,
		readOnly,
		focusOnDisabled,
	}).forEach(([name, prop]) => {
		if (prop === undefined) {
			console.warn(`%c[cellFocus].${name}未傳遞`, CommonStyles.CONSOLE_WARN);
		}
	});

	// columnData
	Object.entries({
		name,
		// hideControlsOnActive,
		// selectOnFocus,
		// multiple
	}).forEach(([name, prop]) => {
		if (prop === undefined) {
			console.warn(`%c[columnData].${name}未傳遞`, CommonStyles.CONSOLE_WARN);
		}
	});

	const inputRef = useRef();
	const asyncRef = useRef({
		popperOpen: null
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
		asyncRef.current.popperOpen = true;
	}, []);

	const handleClose = useCallback(() => {
		console.log("onClose callback fired");
		asyncRef.current.popperOpen = false;
	}, []);

	// focusing on the underlying input component when the cell is focused
	useLayoutEffect(() => {
		if (focus) {
			console.log("useOptionPickerComponent onFocus", focus);
			inputRef.current?.focus();
			if (selectOnFocus) {
				inputRef.current?.select();
			}
		} else {
			console.log(`useOptionPickerComponent.leaveFocus, asyncRef.current.popperOpen: ${asyncRef.current.popperOpen}`);
			if (!asyncRef.current.popperOpen) {
				inputRef.current?.blur();
			}
		}
	}, [focus, selectOnFocus]);

	useLayoutEffect(() => {
		console.log("useOptionPickerComponent.active", active);
	}, [active, stopEditing]);

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
