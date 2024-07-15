import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { D05ProdGridSubtotalLabel } from "./D05ProdGridSubtotalLabel";

const D05ProdGridAddRows = createAddRowsComponentEx({
	translationKeys: {
		button: "新增",
		unit: "筆",
	},
	RightComponent: D05ProdGridSubtotalLabel,
});

export default D05ProdGridAddRows;

