import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import E01ProdGridToolbarLabels from "./E01ProdGridToolbarLabels";

const E01ProdGridAddRows = createAddRowsComponentEx({
	RightComponent: E01ProdGridToolbarLabels,
});

export default E01ProdGridAddRows;
