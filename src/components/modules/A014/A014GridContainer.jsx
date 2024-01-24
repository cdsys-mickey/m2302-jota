import { useContext, useMemo } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useWindowSize } from "../../../shared-hooks/useWindowSize";
import A014Grid from "./A014Grid";
import { AuthContext } from "../../../contexts/auth/AuthContext";

export const A014GridContainer = () => {
	const { height } = useWindowSize();
	const prodGrid = useContext(ProdGridContext);
	const { token } = useContext(AuthContext);

	const gridHeight = useMemo(() => {
		return prodGrid.expanded ? height - 330 : height - 230;
	}, [prodGrid.expanded, height]);

	return (
		<A014Grid
			readOnly={prodGrid.readOnly}
			setGridRef={prodGrid.setGridRef}
			data={prodGrid.gridData}
			loading={prodGrid.gridLoading}
			height={gridHeight}
			onChange={prodGrid.handleGridChange()}
			bearer={token}
			handleCreateRow={prodGrid.handleCreateRow}
		/>
	);
};

A014GridContainer.displayName = "A014GridContainer";
