import clsx from "clsx";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { memo } from "react";
import DateTimes from "@/shared-modules/sd-date-times";
import { useCallback } from "react";
import { useMemo } from "react";
import PropTypes from "prop-types";

const DATE_FORMAT = "yyyy-MM-dd";

const DateFNSDateComponent = memo((props) => {
	const { focus, active, rowData, setRowData } = props;
	const ref = useRef(null);

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
			setRowData(isNaN(date.getTime()) ? null : date);
		},
		[setRowData]
	);

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
		/>
	);
});

DateFNSDateComponent.propTypes = {
	focus: PropTypes.bool,
	active: PropTypes.bool,
	rowData: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.object,
	]),
	setRowData: PropTypes.func,
};

DateFNSDateComponent.displayName = "DateFNSDateComponent";
export default DateFNSDateComponent;
