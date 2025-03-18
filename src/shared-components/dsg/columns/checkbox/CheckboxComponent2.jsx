import Objects from "@/shared-modules/Objects";
import { memo, useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useCallback } from "react";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: "CheckboxCompoent",
		fields: "rowData,active,focus,disabled",
		// debug: true,
	});
};

/**
 * 截自 GitHub 上的原始碼，用於改寫加入新功能
 * https://github.com/nick-keller/react-datasheet-grid/blob/master/src/columns/checkboxColumn.tsx
 */
const CheckboxComponent2 = memo(
	({
		columnData,
		focus,
		rowData,
		setRowData,
		active,
		stopEditing,
		disabled,
	}) => {
		// console.log("rendering CheckboxComponent2");
		const { size } = columnData;

		const ref = useRef(null);

		// const handleMouseDown = useCallback(() => {
		// 	if (!active) {
		// 		setRowData(!rowData);
		// 	}
		// }, [active, rowData, setRowData]);

		const handleChange = useCallback(
			(e) => {
				// do nothing
				setRowData(e.target.checked);
				setTimeout(() => stopEditing({ nextRow: false }), 50);
			},
			[setRowData, stopEditing]
		);

		useLayoutEffect(() => {
			if (focus) {
				ref.current?.focus();
			} else {
				ref.current?.blur();
			}
		}, [focus]);

		return (
			<input
				className="dsg-checkbox"
				style={{
					...(size === "large" && {
						height: "24px",
						width: "24px",
					}),
					...(size === "medium" && {
						height: "18px",
						width: "18px",
					}),
					...(disabled && {
						pointerEvents: "none",
					}),
					cursor: "pointer",
				}}
				// Important to prevent any undesired "tabbing"
				tabIndex={-1}
				type="checkbox"
				ref={ref}
				disabled={disabled}
				checked={Boolean(rowData)}
				// When cell is not active, we allow the user to toggle the checkbox by clicking on it
				// When cell becomes active, we disable this feature and rely on focus instead (see `useLayoutEffect` above)
				// onMouseDown={() => !active && setRowData(!rowData)}
				// onMouseDown={handleMouseDown}
				// onChange={() => null}
				onChange={handleChange}
			/>
		);
	},
	arePropsEqual
);
CheckboxComponent2.propTypes = {
	columnData: PropTypes.object,
	rowData: PropTypes.bool,
	focus: PropTypes.bool,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	stopEditing: PropTypes.func,
	setRowData: PropTypes.func,
};
CheckboxComponent2.displayName = "CheckboxComponent2";
export default CheckboxComponent2;
