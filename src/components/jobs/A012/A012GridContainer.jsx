import { useContext, useMemo } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useWindowSize } from "../../../shared-hooks/useWindowSize";
import A012Grid from "./A012Grid";
import { AuthContext } from "../../../contexts/auth/AuthContext";

export const A012GridContainer = () => {
	const { height } = useWindowSize();
	const prodGrid = useContext(ProdGridContext);
	const { token } = useContext(AuthContext);

	const gridHeight = useMemo(() => {
		return prodGrid.expanded ? height - 330 : height - 230;
	}, [prodGrid.expanded, height]);

	const gridChangeHandler = useMemo(() => {
		return prodGrid.handleGridChange;
	}, [prodGrid]);

	return (
		<A012Grid
			readOnly={prodGrid.readOnly}
			setGridRef={prodGrid.setGridRef}
			data={prodGrid.gridData}
			loading={prodGrid.gridLoading}
			height={gridHeight}
			onChange={gridChangeHandler}
			bearer={token}
		/>
	);
};

A012GridContainer.displayName = "A012GridContainer";
