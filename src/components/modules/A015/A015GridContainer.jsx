import { useContext, useMemo } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useWindowSize } from "../../../shared-hooks/useWindowSize";
import A015Grid from "./A015Grid";

export const A015GridContainer = () => {
	const { height } = useWindowSize();
	const prodGrid = useContext(ProdGridContext);

	const gridHeight = useMemo(() => {
		return prodGrid.expanded ? height - 330 : height - 230;
	}, [prodGrid.expanded, height]);

	return (
		<A015Grid
			readOnly={prodGrid.readOnly}
			setGridRef={prodGrid.setGridRef}
			data={prodGrid.gridData}
			loading={prodGrid.gridLoading}
			height={gridHeight}
			onChange={prodGrid.handleGridChange}
		/>
	);
};

A015GridContainer.displayName = "A015GridContainer";
