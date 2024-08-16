import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import PropTypes from "prop-types";
import { useContext } from "react";
import A01ProdTransGrid from "./A01ProdTransGrid";

export const A01ProdTransGridContainer = (props) => {
	const { ...rest } = props;
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<DSGContext.Provider
			value={{
				...a01.transGrid,
				...a01.transMeta,
			}}>
			<A01ProdTransGrid
				gridRef={a01.transMeta.setGridRef}
				readOnly={a01.transGridDisabled}
				columns={a01.transMeta.columns}
				data={a01.transGrid.gridData}
				handleGridChange={a01.handleTransGridChange}
				onActiveCellChange={a01.transMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 278}
				createRow={a01.createTransRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};
A01ProdTransGridContainer.propTypes = {
	store: PropTypes.bool,
};
A01ProdTransGridContainer.displayName = "ProdTransGridContainer";
