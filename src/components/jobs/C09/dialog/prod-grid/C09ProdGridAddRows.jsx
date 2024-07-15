import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { C09ProdGridSubtotalLabel } from "./C09ProdGridSubtotalLabel";

const C09ProdGridAddRows = createAddRowsComponentEx({
	translationKeys: {
		button: "新增",
		unit: "筆",
	},
	RightComponent: C09ProdGridSubtotalLabel,
});

export default C09ProdGridAddRows;
