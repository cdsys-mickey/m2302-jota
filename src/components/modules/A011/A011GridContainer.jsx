import { useContext, useMemo } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useWindowSize } from "../../../shared-hooks/useWindowSize";
import A011Grid from "./A011Grid";

export const A011GridContainer = () => {
	const { height } = useWindowSize();
	const prodGrid = useContext(ProdGridContext);

	const gridHeight = useMemo(() => {
		return prodGrid.expanded ? height - 330 : height - 230;
	}, [prodGrid.expanded, height]);

	return (
		<A011Grid
			readOnly={prodGrid.readOnly}
			setGridRef={prodGrid.setGridRef}
			data={prodGrid.gridData}
			loading={prodGrid.gridLoading}
			height={gridHeight}
			onChange={prodGrid.handleGridChange()}
		/>
	);
};

A011GridContainer.displayName = "A011GridContainer";
