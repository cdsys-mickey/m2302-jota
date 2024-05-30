import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { C08ProdGridSubtotalLabel } from "./C08ProdGridSubtotalLabel";

const C08ProdGridAddRows = createAddRowsComponentEx({
	translationKeys: {
		button: "新增",
		unit: "筆",
	},
	RightComponent: C08ProdGridSubtotalLabel,
});

export default C08ProdGridAddRows;
