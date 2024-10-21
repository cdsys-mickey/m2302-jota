import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import A012Grid from "./A012Grid";

export const A012GridContainer = () => {
	const { height } = useWindowSize();
	const prodGrid = useContext(ProdGridContext);
	const form = useForm();

	const gridHeight = useMemo(() => {
		return prodGrid.expanded ? height - 330 : height - 230;
	}, [prodGrid.expanded, height]);

	const gridChangeHandler = useMemo(() => {
		return prodGrid.handleGridChange;
	}, [prodGrid]);

	return (

		<FormProvider {...form}>
			<DSGContext.Provider value={{
				...prodGrid.grid,
				...prodGrid.gridMeta
			}}>
				<A012Grid
					// readOnly={prodGrid.grid.readOnly}
					gridRef={prodGrid.setGridRef}
					data={prodGrid.gridData}
					loading={prodGrid.gridLoading}
					height={gridHeight}
					onChange={gridChangeHandler}
					onActveCellChange={prodGrid.handleActiveCellChange}
				/>
			</DSGContext.Provider>
		</FormProvider>

	);
};

A012GridContainer.displayName = "A012GridContainer";
