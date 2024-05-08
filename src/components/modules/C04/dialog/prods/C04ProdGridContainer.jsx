import { useContext } from "react";
import C04ProdGrid from "./C04ProdGrid";
import { C04Context } from "@/contexts/C04/C04Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";

export const C04ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(C04Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<C04ProdGrid
			gridRef={c04.setGridRef}
			readOnly={!c04.editing}
			data={c04.gridData}
			handleGridChange={c04.handleGridChange}
			bearer={auth.token}
			height={height - 390}
			getRowKey={c04.getRowKey}
			prodDisabled={c04.prodDisabled}
			rqtQtyDisabled={c04.rqtQtyDisabled}
			supplierNameDisabled={c04.supplierNameDisabled}
			{...rest}
		/>
	);
};

C04ProdGridContainer.displayName = "C04ProdGridContainer";
