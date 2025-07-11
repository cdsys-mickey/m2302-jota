import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import A014Grid from "./A014Grid";

export const A014GridContainer = () => {
	const { height } = useWindowSize();
	const prodGrid = useContext(ProdGridContext);
	const form = useForm();

	const _height = useMemo(() => {
		return prodGrid.expanded ? height - 282 : height - 182;
	}, [prodGrid.expanded, height]);

	const onChange = useMemo(() => {
		return prodGrid.buildGridChangeHandler({
			onUpdateRow: prodGrid.onUpdateRow,
			// doDirtyCheckByIndex: true
		})
	}, [prodGrid])

	return (
		<FormProvider {...form}>
			<DSGContext.Provider value={{ ...prodGrid.grid, ...prodGrid.gridMeta }}>
				<A014Grid
					gridRef={prodGrid.setGridRef}
					data={prodGrid.gridData}
					loading={prodGrid.gridLoading}
					height={_height}
					onChange={onChange}
				/>
			</DSGContext.Provider>
		</FormProvider>
	);
};

A014GridContainer.displayName = "A014GridContainer";
