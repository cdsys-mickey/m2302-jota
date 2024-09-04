import clsx from "clsx";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { memo } from "react";
import DateTimes from "@/shared-modules/sd-date-times";
import { useCallback } from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import Events from "@/shared-modules/sd-events";
import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";

const DATE_FORMAT = "yyyy-MM-dd";

const DateFnsComponent = memo((props) => {
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
	const {
		// Context Methods
		skipDisabled,
		// focusNextCell,
		getNextCell,
		lastCell,
		setActiveCell,
		readOnly,
		...rest
	} = columnData;

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

	const value = useMemo(() => {
		return DateTimes.format(rowData, DATE_FORMAT);
	}, [rowData]);

	const handleChange = useCallback(
		(e) => {
			const date = DateTimes.parse(e.target.value, DATE_FORMAT);
			setRowData(isNaN(date?.getTime()) ? null : date);
		},
		[setRowData]
	);

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
		if (skipDisabled && active && disabled && !readOnly) {
			if (focusNextCell) {
				focusNextCell({ row: rowIndex, col: columnIndex });
			} else {
				console.log("focusNextCell is null");
			}
		}
	}, [active, columnIndex, disabled, focusNextCell, readOnly, rowIndex, skipDisabled]);

	return (
		<input
			className={clsx("dsg-input", !focus && "dsg-hide-date-picker")}
			type="date"
			tabIndex={-1}
			max="9999-12-31"
			ref={ref}
			style={{
				pointerEvents: focus ? "auto" : "none",
				opacity: rowData || active ? undefined : 0,
			}}
			value={value}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			{...rest}
		/>
	);
});

DateFnsComponent.propTypes = {
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
};

DateFnsComponent.displayName = "DateFnsComponent";
export default DateFnsComponent;
