import { useContext, useMemo } from "react";

import { useWindowSize } from "@/shared-hooks/useWindowSize";
import A22Grid from "./A22Grid";
import { A22Context } from "@/contexts/A22/A22Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { FormProvider, useForm } from "react-hook-form";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const A22GridContainer = () => {
	const { height } = useWindowSize();
	const a22 = useContext(A22Context);
	const { token } = useContext(AuthContext);
	const form = useForm();

	const gridHeight = useMemo(() => {
		return a22.expanded ? height - 278 : height - 236;
	}, [a22.expanded, height]);

	return (
		<form>
			<FormProvider {...form}>
				<DSGContext.Provider value={{
					...a22.grid,
					...a22.gridMeta,
					readOnly: a22.readOnly
				}}>
					<A22Grid
						readOnly={a22.readOnly}
						gridRef={a22.setGridRef}
						data={a22.gridData}
						loading={a22.gridLoading}
						height={gridHeight}
						onChange={a22.handleGridChange}
						onActiveCellChange={a22.handleActiveCellChange}
						bearer={token}
						getRowKey={a22.getRowKey}
						handleCreateRow={a22.handleCreateRow}
					/>
				</DSGContext.Provider>
			</FormProvider>
		</form>
	);
};

A22GridContainer.displayName = "A22GridContainer";
