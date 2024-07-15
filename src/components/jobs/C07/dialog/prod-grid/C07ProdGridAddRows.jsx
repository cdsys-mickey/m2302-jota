import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { C07ProdGridSubtotalLabel } from "./C07ProdGridSubtotalLabel";

const C07ProdGridAddRows = createAddRowsComponentEx({
	translationKeys: {
		button: "新增",
		unit: "筆",
	},
	RightComponent: C07ProdGridSubtotalLabel,
});

export default C07ProdGridAddRows;
