import { useContext, useMemo } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useWindowSize } from "../../../shared-hooks/useWindowSize";
import A014Grid from "./A014Grid";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { FormProvider, useForm } from "react-hook-form";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";

export const A014GridContainer = () => {
	const { height } = useWindowSize();
	const prodGrid = useContext(ProdGridContext);
	const form = useForm();

	const gridHeight = useMemo(() => {
		return prodGrid.expanded ? height - 330 : height - 230;
	}, [prodGrid.expanded, height]);

	return (
		<FormProvider {...form}>
			<DSGContext.Provider value={{ ...prodGrid.grid, ...prodGrid.gridMeta }}>
				<A014Grid
					// readOnly={prodGrid.readOnly}
					gridRef={prodGrid.setGridRef}
					data={prodGrid.gridData}
					loading={prodGrid.gridLoading}
					height={gridHeight}
					onChange={prodGrid.handleGridChange}
					// bearer={token}
					handleCreateRow={prodGrid.handleCreateRow}
				/>
			</DSGContext.Provider>
		</FormProvider>
	);
};

A014GridContainer.displayName = "A014GridContainer";
