import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { C05ProdGridSubtotalLabel } from "./C05ProdGridSubtotalLabel";

const C05ProdGridAddRows = createAddRowsComponentEx({
	translationKeys: {
		button: "新增",
		unit: "筆",
	},
	RightComponent: C05ProdGridSubtotalLabel,
});

export default C05ProdGridAddRows;
