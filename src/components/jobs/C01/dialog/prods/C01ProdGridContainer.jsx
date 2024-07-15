import { useContext } from "react";
import C01ProdGrid from "./C01ProdGrid";
import { C01Context } from "@/contexts/C01/C01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";

export const C01ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c01 = useContext(C01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<C01ProdGrid
			gridRef={c01.setGridRef}
			readOnly={!c01.editing}
			data={c01.gridData}
			handleGridChange={c01.handleGridChange}
			bearer={auth.token}
			height={height - 390}
			getRowKey={c01.getRowKey}
			prodDisabled={c01.prodDisabled}
			rqtQtyDisabled={c01.rqtQtyDisabled}
			orderQtyDisabled={c01.orderQtyDisabled}
			supplierDisabled={c01.supplierDisabled}
			supplierNameDisabled={c01.supplierNameDisabled}
			{...rest}
		/>
	);
};

C01ProdGridContainer.displayName = "C01ProdGridContainer";
