import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { C06ProdGridSubtotalLabel } from "./C06ProdGridSubtotalLabel";

const C06ProdGridAddRows = createAddRowsComponentEx({
	translationKeys: {
		button: "新增",
		unit: "筆",
	},
	RightComponent: C06ProdGridSubtotalLabel,
});

export default C06ProdGridAddRows;
