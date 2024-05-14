import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { C03ProdGridSubtotalLabel } from "./C03ProdGridSubtotalLabel";

const C03ProdGridAddRows = createAddRowsComponentEx({
	translationKeys: {
		button: "新增",
		unit: "筆",
	},
	RightComponent: C03ProdGridSubtotalLabel,
});

export default C03ProdGridAddRows;
