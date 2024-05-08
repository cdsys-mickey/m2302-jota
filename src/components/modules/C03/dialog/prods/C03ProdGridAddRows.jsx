import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { C03ProdGridSubtotalContainer } from "./C03ProdGridSubtotal";

const C03ProdGridAddRows = createAddRowsComponentEx({
	translationKeys: {
		button: "新增",
		unit: "筆",
	},
	RightComponent: C03ProdGridSubtotalContainer,
});

export default C03ProdGridAddRows;
