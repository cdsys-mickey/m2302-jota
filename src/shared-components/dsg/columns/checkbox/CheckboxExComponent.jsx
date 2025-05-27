import Objects from "@/shared-modules/Objects.mjs";
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
const CheckboxExComponent = memo(
	({
		columnData,
		focus,
		rowData,
		setRowData,
		active,
		stopEditing,
		disabled,
	}) => {
		// console.log("rendering CheckboxExComponent");
		const { size } = columnData;

		const ref = useRef(null);

		const handleMouseDown = useCallback(() => {
			if (!active) {
				setRowData(!rowData);
			}
		}, [active, rowData, setRowData]);

		const handleChange = useCallback(() => {
			// do nothing
		}, []);

		// When cell becomes focus we immediately toggle the checkbox and blur the cell by calling `stopEditing`
		// Notice the `nextRow: false` to make sure the active cell does not go to the cell below and stays on this cell
		// This way the user can keep pressing Enter to toggle the checkbox on and off multiple times
		useLayoutEffect(() => {
			if (focus) {
				setRowData(!rowData);
				stopEditing({ nextRow: false });
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [focus, stopEditing]);

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
				onMouseDown={handleMouseDown}
				// onChange={() => null}
				onChange={handleChange}
			/>
		);
	},
	arePropsEqual
);
CheckboxExComponent.propTypes = {
	columnData: PropTypes.object,
	rowData: PropTypes.bool,
	focus: PropTypes.bool,
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	stopEditing: PropTypes.func,
	setRowData: PropTypes.func,
};
CheckboxExComponent.displayName = "CheckboxExComponent";
export default CheckboxExComponent;
