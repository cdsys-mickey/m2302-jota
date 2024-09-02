import { useContext } from "react";
import C01ProdGrid from "./C01ProdGrid";
import { C01Context } from "@/contexts/C01/C01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const C01ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c01 = useContext(C01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<DSGContext.Provider value={{
			...c01.grid,
			...c01.gridMeta,
			readOnly: !c01.editing
		}}>
			<C01ProdGrid
				gridRef={c01.setGridRef}
				readOnly={!c01.editing}
				data={c01.gridData}
				onChange={c01.handleGridChange}
				onActiveCellChange={c01.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 390}
				getRowKey={c01.getRowKey}
				createRow={c01.createRow}
				prodDisabled={c01.prodDisabled}
				rqtQtyDisabled={c01.rqtQtyDisabled}
				orderQtyDisabled={c01.orderQtyDisabled}
				supplierDisabled={c01.supplierDisabled}
				supplierNameDisabled={c01.supplierNameDisabled}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C01ProdGridContainer.displayName = "C01ProdGridContainer";
