import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import E021ProdGridToolbarLabels from "./E021ProdGridToolbarLabels";

const E021ProdGridAddRows = createAddRowsComponentEx({
	RightComponent: E021ProdGridToolbarLabels,
});

export default E021ProdGridAddRows;

