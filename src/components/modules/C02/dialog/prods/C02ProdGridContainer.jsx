import { useContext } from "react";
import C02ProdGrid from "./C02ProdGrid";
import { C02Context } from "@/contexts/C02/C02Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";

export const C02ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c02 = useContext(C02Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<C02ProdGrid
			gridRef={c02.setGridRef}
			readOnly={!c02.editing}
			data={c02.gridData}
			handleGridChange={c02.handleGridChange}
			bearer={auth.token}
			height={height - 390}
			getRowKey={c02.getRowKey}
			prodDisabled={c02.prodDisabled}
			rqtQtyDisabled={c02.rqtQtyDisabled}
			supplierNameDisabled={c02.supplierNameDisabled}
			{...rest}
		/>
	);
};

C02ProdGridContainer.displayName = "C02ProdGridContainer";
