import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { C08ProdGridSubtotalLabel } from "./C08ProdGridSubtotalLabel";

const C08ProdGridAddRows = createAddRowsComponentEx({
	RightComponent: C08ProdGridSubtotalLabel,
});

export default C08ProdGridAddRows;
