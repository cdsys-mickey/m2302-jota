import { useContext } from "react";
import C02ProdGrid from "./C02ProdGrid";
import { C02Context } from "@/contexts/C02/C02Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useMemo } from "react";

export const C02ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c02 = useContext(C02Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	const onChange = useMemo(() => {
		return c02.handleGridChange;
	}, [c02.handleGridChange]);

	return (
		<DSGContext.Provider value={{
			...c02.grid,
			...c02.gridMeta,
			readOnly: !c02.editing
		}}>
			<C02ProdGrid
				gridRef={c02.setGridRef}
				readOnly={!c02.editing}
				data={c02.gridData}
				bearer={auth.token}
				height={height - 326}
				getRowKey={c02.getRowKey}
				prodDisabled={c02.prodDisabled}
				rqtQtyDisabled={c02.rqtQtyDisabled}
				supplierNameDisabled={c02.supplierNameDisabled}
				createRow={c02.createRow}
				onChange={onChange}
				onActiveCellChange={c02.handleActiveCellChange}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C02ProdGridContainer.displayName = "C02ProdGridContainer";
