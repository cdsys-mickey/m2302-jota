import { useContext, useMemo } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useWindowSize } from "../../../shared-hooks/useWindowSize";
import A013Grid from "./A013Grid";

export const A013GridContainer = () => {
	const { height } = useWindowSize();
	const prodGrid = useContext(ProdGridContext);

	const gridHeight = useMemo(() => {
		return prodGrid.expanded ? height - 330 : height - 230;
	}, [prodGrid.expanded, height]);

	return (
		<A013Grid
			readOnly={prodGrid.readOnly}
			setGridRef={prodGrid.setGridRef}
			data={prodGrid.gridData}
			loading={prodGrid.gridLoading}
			height={gridHeight}
			onChange={prodGrid.handleGridChange()}
		/>
	);
};

A013GridContainer.displayName = "A013GridContainer";
