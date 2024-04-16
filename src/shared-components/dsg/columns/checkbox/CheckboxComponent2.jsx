import { memo, useLayoutEffect, useRef } from "react";
import _ from "lodash";
import Objects from "../../../../shared-modules/sd-objects";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: "CheckboxCompoent",
		fields: "rowData,active,focus",
		debug: true,
	});
};

/**
 * 截自 GitHub 上的原始碼，用於參考
 * https://github.com/nick-keller/react-datasheet-grid/blob/master/src/columns/checkboxColumn.tsx
 */
const CheckboxComponent2 = memo(
	({ focus, rowData, setRowData, active, stopEditing, disabled }) => {
		console.log("rendering CheckboxComponent2");

		const ref = useRef(null);

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
				// Important to prevent any undesired "tabbing"
				tabIndex={-1}
				type="checkbox"
				ref={ref}
				disabled={disabled}
				checked={Boolean(rowData)}
				// When cell is not active, we allow the user to toggle the checkbox by clicking on it
				// When cell becomes active, we disable this feature and rely on focus instead (see `useLayoutEffect` above)
				onMouseDown={() => !active && setRowData(!rowData)}
				onChange={() => null}
			/>
		);
	},
	arePropsEqual
);

CheckboxComponent2.displayName = "CheckboxComponent2";
export default CheckboxComponent2;
