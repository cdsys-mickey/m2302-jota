import { useContext } from "react";
import { A20Context } from "@/contexts/A20/A20Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdMaterialsGrid from "./ProdMaterialsGrid";
import PropTypes from "prop-types";
import { useWindowSize } from "@/shared-hooks/useWindowSize";

export const ProdMaterialsGridContainer = (props) => {
	const { ...rest } = props;
	const a20 = useContext(A20Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<ProdMaterialsGrid
			rowKey={a20.getRowKey}
			gridRef={a20.setGridRef}
			readOnly={!a20.editing}
			data={a20.gridData}
			handleGridChange={a20.handleGridChange}
			bearer={auth.token}
			height={height - 370}
			createRow={a20.createRow}
			{...rest}
		/>
	);
};
ProdMaterialsGridContainer.propTypes = {
	store: PropTypes.bool,
};
ProdMaterialsGridContainer.displayName = "ProdMaterialsGridContainer";
