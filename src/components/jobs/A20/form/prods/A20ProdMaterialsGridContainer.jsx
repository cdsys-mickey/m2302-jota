import { useContext } from "react";
import { A20Context } from "@/contexts/A20/A20Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A20ProdMaterialsGrid from "./A20ProdMaterialsGrid";
import PropTypes from "prop-types";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const A20ProdMaterialsGridContainer = (props) => {
	const { ...rest } = props;
	const a20 = useContext(A20Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<DSGContext.Provider value={{
			...a20.grid,
			...a20.gridMeta,
			readOnly: !a20.editing
		}}>
			<A20ProdMaterialsGrid
				rowKey={a20.getRowKey}
				gridRef={a20.gridMeta.setGridRef}
				readOnly={!a20.editing}
				data={a20.gridData}
				onChange={a20.handleGridChange}
				onActiveCellChange={a20.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 350}
				createRow={a20.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};
A20ProdMaterialsGridContainer.propTypes = {
	store: PropTypes.bool,
};
A20ProdMaterialsGridContainer.displayName = "A20ProdMaterialsGridContainer";
