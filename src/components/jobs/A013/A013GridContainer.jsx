import { useContext, useMemo } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useWindowSize } from "../../../shared-hooks/useWindowSize";
import A013Grid from "./A013Grid";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";

export const A013GridContainer = () => {
	const { height } = useWindowSize();
	const prodGrid = useContext(ProdGridContext);

	const gridHeight = useMemo(() => {
		return prodGrid.expanded ? height - 330 : height - 230;
	}, [prodGrid.expanded, height]);

	const onChange = useMemo(() => {
		return prodGrid.handleGridChange;
	}, [prodGrid.handleGridChange]);

	return (
		<DSGContext.Provider value={{ ...prodGrid.grid, ...prodGrid.gridMeta }}>
			<A013Grid
				// readOnly={prodGrid.readOnly}
				gridRef={prodGrid.setGridRef}
				data={prodGrid.gridData}
				loading={prodGrid.gridLoading}
				height={gridHeight}
				onChange={onChange}
				onActveCellChange={prodGrid.handleActiveCellChange}
			/>
		</DSGContext.Provider>
	);
};

A013GridContainer.displayName = "A013GridContainer";
