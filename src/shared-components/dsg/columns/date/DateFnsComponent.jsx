import clsx from "clsx";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { memo } from "react";
import DateTimes from "@/shared-modules/sd-date-times";
import { useCallback } from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";
import Events from "@/shared-modules/sd-events";

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
		skipDisabled,
		nextCell,
	} = props;
	const ref = useRef(null);
	const { enterToNext = true, ...rest } = columnData;

	useLayoutEffect(() => {
		if (focus) {
			ref.current?.select();
		} else {
			ref.current?.blur();
		}
	}, [focus]);

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
					if (enterToNext) {
						e.stopPropagation();
						if (nextCell) {
							nextCell(
								{
									row: rowIndex,
									col: columnIndex,
								},
								{ forward: !e.shiftKey }
							);
						} else {
							console.log("nextCell is undefined");
						}
					}
					break;
			}
		},
		[columnIndex, enterToNext, nextCell, rowIndex]
	);

	useLayoutEffect(() => {
		if (skipDisabled && active && disabled) {
			if (nextCell) {
				nextCell({ row: rowIndex, col: columnIndex });
			} else {
				console.log("nextCell is null");
			}
		}
	}, [active, columnIndex, disabled, nextCell, rowIndex, skipDisabled]);

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
			// {...rest}
		/>
	);
});

DateFnsComponent.propTypes = {
	focus: PropTypes.bool,
	active: PropTypes.bool,
	rowData: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.object,
	]),
	setRowData: PropTypes.func,
	columnData: PropTypes.object,
	disabled: PropTypes.bool,
	skipDisabled: PropTypes.bool,
	nextCell: PropTypes.func,
	rowIndex: PropTypes.number,
	columnIndex: PropTypes.number,
};

DateFnsComponent.displayName = "DateFnsComponent";
export default DateFnsComponent;
