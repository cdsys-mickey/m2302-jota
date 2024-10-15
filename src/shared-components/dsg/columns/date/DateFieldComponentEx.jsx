import { useCellComponent } from "@/shared-hooks/dsg/useCellComponent";
import DateTimes from "@/shared-modules/sd-date-times";
import Events from "@/shared-modules/sd-events";
import Forms from "@/shared-modules/sd-forms";
import Objects from "@/shared-modules/sd-objects";
import clsx from "clsx";
import { isValid } from "date-fns";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { memo, useCallback, useLayoutEffect, useMemo, useRef } from "react";

const DATE_FORMAT = "yyyy-MM-dd";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: "date",
		fields: "rowData,active,disable,focus",
		// debug: true,
	});
}

const DateFieldComponentEx = memo((props) => {
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
		// pattern = "\\d{4}-\\d{2}-\\d{2}",
		// Context Methods
		skipDisabled,
		// focusNextCell,
		getNextCell,
		lastCell,
		setActiveCell,
		readOnly,
		// ...rest
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

	// const value = useMemo(() => {
	// 	return DateTimes.format(rowData, DATE_FORMAT);
	// }, [rowData]);

	// const handleChange = useCallback(
	// 	(e) => {
	// 		console.log("handleChange", e.target.value)
	// 		const date = DateTimes.parse(e.target.value, DATE_FORMAT);
	// 		setRowData(isNaN(date?.getTime()) ? null : date);
	// 	},
	// 	[setRowData]
	// );
	// const handleChange = useCallback(
	// 	(e) => {
	// 		console.log("handleChange", e);
	// 		console.log("typeof", typeof e.target.value)
	// 		setRowData(e.target.value);
	// 	},
	// 	[setRowData]
	// );

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

	const [dateValue, setDateValue] = useState(null);

	// 雖然是監聽輸入字串, 但還是要等到可以解析為正式日期時才會觸發
	const handleInputChange = useCallback((e) => {
		console.log("handleInputChange", e.target.value);
		const inputValue = e.target.value.replace(/-/g, ''); // 去除 '-' 符號
		if (inputValue.length === 8) {
			setDateValue(e.target.value);
			// 可以在這裡執行 onChange 的邏輯
			console.log('Date input completed:', e.target.value);
			// setRowData(e.target.value);
		} else if (inputValue.length === 0) {
			// setRowData(null);
		}
		setRowData(e.target.value);
	}, [setRowData]);

	const handleChange = useCallback((e) => {
		console.log("handleChange", e.target.value);
		// setDateValue(e.target.value)
		setRowData(e.target.value);
		// setDateValue(Forms.formatDate(e.target.value));
	}, [setRowData]);

	useEffect(() => {
		// null 才是透過 del 清空的
		// if (rowData == null && isValid(new Date(dateValue))) {
		if (rowData == null) {
			console.log("sync dateValue to empty");
			setDateValue("");
		} else if (rowData && !dateValue) {
			const newDateValue = Forms.reformatDate(rowData, DateTimes.DATEFNS_DATE_DASH);
			console.log(`sync dateValue to ${newDateValue}`);
			setDateValue(newDateValue);
		}
	}, [dateValue, rowData]);


	return (
		<input
			className={clsx('dsg-input', !active && 'dsg-hide-date-picker')}
			type="date"
			// Important to prevent any undesired "tabbing"
			tabIndex={-1}
			max="9999-12-31"
			ref={ref}
			// The `pointerEvents` trick is the same than in `textColumn`
			// Only show the calendar symbol on non-empty cells, or when cell is active, otherwise set opacity to 0
			style={{
				// pointerEvents: focus ? 'auto' : 'none',
				pointerEvents: active ? 'auto' : 'none',
				opacity: rowData || active ? undefined : 0,
			}}
			// value={value}

			// value={rowData?.toISOString().substr(0, 10) ?? ''}
			// onChange={(e) => {
			// 	const date = new Date(e.target.value)
			// 	setRowData(isNaN(date.getTime()) ? null : date)
			// }}

			value={dateValue}
			onChange={handleChange} // 用來更新顯示的值
			onInput={handleInputChange} // 攔截輸入動作
			onKeyDown={handleKeyDown}

		// {...rest}
		/>
	);
}, arePropsEqual);

DateFieldComponentEx.propTypes = {
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

DateFieldComponentEx.displayName = "DateFieldComponentEx";
export default DateFieldComponentEx;
