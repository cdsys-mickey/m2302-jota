import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { C04ProdGridSubtotalLabel } from "./C04ProdGridSubtotalLabel";

const C04ProdGridAddRows = createAddRowsComponentEx({
	translationKeys: {
		button: "新增",
		unit: "筆",
	},
	RightComponent: C04ProdGridSubtotalLabel,
});

export default C04ProdGridAddRows;
