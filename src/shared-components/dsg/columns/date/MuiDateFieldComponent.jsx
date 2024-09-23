import { DateFieldWrapper } from "@/shared-components/date-field/DateFieldWrapper";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import Events from "@/shared-modules/sd-events";
import clsx from "clsx";
import PropTypes from "prop-types";
import { memo, useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { useFirstRender } from "../../forked/hooks/useFirstRender";
import { useEffect } from "react";

const DATE_FORMAT = "yyyy-MM-dd";

const MuiDateComponent = memo((props) => {
	const {
		focus,
		active,
		rowData,
		setRowData,
		disabled,
		columnIndex,
		rowIndex,
		columnData = {},
		stopEditing,
		insertRowBelow,
	} = props;
	const ref = useRef(null);
	const firstRender = useFirstRender();
	const {
		// pattern = "\\d{4}-\\d{2}-\\d{2}",
		// Context Methods
		skipDisabled,
		// focusNextCell,
		getNextCell,
		lastCell,
		setActiveCell,
		readOnly,
		hideControlsOnActive = true,
		// ...rest
		// 
		formatInputOnFocus,
		formatBlurredInput,
		parseUserInput,
	} = columnData;

	const asyncRef = useRef({
		rowData,
		formatInputOnFocus,
		formatBlurredInput,
		setRowData,
		parseUserInput,
		firstRender,
		// Timestamp of last focus (when focus becomes true) and last change (input change)
		// used to prevent un-necessary updates when value was not changed
		focusedAt: 0,
		changedAt: 0,
		// This allows us to keep track of whether or not the user blurred the input using the Esc key
		// If the Esc key is used we do not update the row's value (only relevant when continuousUpdates is false)
		escPressed: false,
	});
	asyncRef.current = {
		rowData,
		formatInputOnFocus,
		formatBlurredInput,
		setRowData,
		parseUserInput,
		firstRender,
		// Keep the same values across renders
		focusedAt: asyncRef.current.focusedAt,
		changedAt: asyncRef.current.changedAt,
		escPressed: asyncRef.current.escPressed,
	};

	const hideControls = useMemo(() => {
		return disabled || hideControlsOnActive ? !focus : !active;
	}, [active, hideControlsOnActive, disabled, focus]);

	useLayoutEffect(() => {
		if (focus) {
			ref.current?.select();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

	const { focusNextCell } = useCellComponent({
		getNextCell,
		lastCell,
		setActiveCell,
		stopEditing,
		insertRowBelow,
	});

	const cell = useMemo(() => {
		return {
			row: rowIndex,
			col: columnIndex,
		};
	}, [columnIndex, rowIndex]);

	const handleKeyDown = useCallback(
		(e) => {
			console.log("handleKeyDown", Events.forKey(e));
			switch (e.key) {
				case "Enter":
					e.preventDefault();
					stopEditing({ nextRow: false });
					setTimeout(() => {
						if (focusNextCell) {
							focusNextCell(cell, { forward: true });
						}
					});
					break;
			}
		},
		[cell, focusNextCell, stopEditing]
	);

	useLayoutEffect(() => {
		// When the cell gains focus we make sure to immediately select the text in the input:
		// - If the user gains focus by typing, it will replace the existing text, as expected
		// - If the user gains focus by clicking or pressing Enter, the text will be preserved and selected
		if (focus) {
			if (ref.current) {
				// Make sure to first format the input
				ref.current.value = asyncRef.current.formatInputOnFocus(
					asyncRef.current.rowData
				);
				ref.current.focus();
				ref.current.select();
			}

			// We immediately reset the escPressed
			asyncRef.current.escPressed = false;
			// Save current timestamp
			asyncRef.current.focusedAt = Date.now();
		}
		// When the cell looses focus (by pressing Esc, Enter, clicking away...) we make sure to blur the input
		// Otherwise the user would still see the cursor blinking
		else {
			if (ref.current) {
				// Update the row's value on blur only if the user did not press escape (only relevant when continuousUpdates is false)
				if (
					!asyncRef.current.escPressed &&
					!asyncRef.current.continuousUpdates &&
					!asyncRef.current.firstRender &&
					// Make sure that focus was gained more than 10 ms ago, used to prevent flickering
					asyncRef.current.changedAt >= asyncRef.current.focusedAt
				) {
					asyncRef.current.setRowData(
						asyncRef.current.parseUserInput(ref.current.value)
					);
				}
				ref.current.blur();
			}
		}
	}, [focus]);

	useEffect(() => {
		if (!focus && ref.current) {
			// On blur or when the data changes, format it for display
			ref.current.value =
				asyncRef.current.formatBlurredInput(rowData);
		}
	}, [focus, rowData]);

	useLayoutEffect(() => {
		if (skipDisabled && active && disabled && !readOnly) {
			if (focusNextCell) {
				focusNextCell({ row: rowIndex, col: columnIndex });
			} else {
				console.log("focusNextCell is null");
			}
		}
	}, [active, columnIndex, disabled, focusNextCell, readOnly, rowIndex, skipDisabled]);

	return (
		<DateFieldWrapper
			hideBorders
			label=""
			inputRef={ref}
			size="small"
			hiddenLabel
			hideControls={hideControls}
			// className={clsx('dsg-input', !active && 'dsg-hide-date-picker')}
			// type="date"
			// Important to prevent any undesired "tabbing"
			tabIndex={-1}
			// max="9999-12-31"
			// ref={ref}
			// The `pointerEvents` trick is the same than in `textColumn`
			// Only show the calendar symbol on non-empty cells, or when cell is active, otherwise set opacity to 0
			// style={{
			// 	pointerEvents: focus ? 'auto' : 'none',
			// 	opacity: rowData || active ? undefined : 0,
			// }}
			// value={value}
			// value={rowData?.toISOString().substr(0, 10) ?? ''}
			value={rowData}
			onChange={(newValue) => {
				console.log("MuiDateComponent.onChange", newValue)
				setRowData(newValue)
			}}
			onKeyDown={handleKeyDown}
		// {...rest}
		/>
	);
});

MuiDateComponent.propTypes = {
	// Cell Props
	focus: PropTypes.bool,
	active: PropTypes.bool,
	rowData: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.object,
	]),
	rowIndex: PropTypes.number,
	columnIndex: PropTypes.number,
	disabled: PropTypes.bool,
	columnData: PropTypes.object,
	// Cell Methods
	setRowData: PropTypes.func,
	stopEditing: PropTypes.func,
	insertRowBelow: PropTypes.func,
	// Context
	skipDisabled: PropTypes.bool,
	focusNextCell: PropTypes.func,
	getNextCell: PropTypes.func,
	lastCell: PropTypes.symbol,
	setActiveCell: PropTypes.func,
	hideControlsOnActive: PropTypes.bool
};

MuiDateComponent.displayName = "MuiDateComponent";
export default MuiDateComponent;
