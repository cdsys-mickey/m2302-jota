import { memo, useLayoutEffect, useRef } from "react";

/**
 * 截自 GitHub 上的原始碼，用於參考
 * https://github.com/nick-keller/react-datasheet-grid/blob/master/src/columns/checkboxColumn.tsx
 */
const CheckboxComponent = memo(
	({ focus, rowData, setRowData, active, stopEditing, disabled }) => {
		console.log("rendering CheckboxComponent");

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
	}
);

CheckboxComponent.displayName = "CheckboxComponent";

const FALSY = [
	"",
	"false",
	"no",
	"off",
	"disabled",
	"0",
	"n",
	"f",
	"unchecked",
	"undefined",
	"null",
	"wrong",
	"negative",
];

export const checkboxColumn2 = {
	component: CheckboxComponent,
	deleteValue: () => false,
	// We can customize what value is copied: when the checkbox is checked we copy YES, otherwise we copy NO
	copyValue: ({ rowData }) => (rowData ? "YES" : "NO"),
	// Since we copy custom values, we have to make sure pasting gives us the expected result
	// Here NO is included in the FALSY array, so it will be converted to false, YES is not, so it will be converted to true
	pasteValue: ({ value }) => !FALSY.includes(value.toLowerCase()),
	isCellEmpty: ({ rowData }) => !rowData,
};
