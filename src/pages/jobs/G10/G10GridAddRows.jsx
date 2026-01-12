import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { G10GridSubtotalLabel } from "./G10GridSubtotalLabel";

const G10GridAddRows = createAddRowsComponentEx({
	translationKeys: {
		button: "新增",
		unit: "筆",
	},
	RightComponent: G10GridSubtotalLabel,
});

export default G10GridAddRows;
