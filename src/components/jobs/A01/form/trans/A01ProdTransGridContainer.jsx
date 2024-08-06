import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { DsgContext } from "@/shared-contexts/datasheet-grid/DsgContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import PropTypes from "prop-types";
import { useContext } from "react";
import A01ProdTransGrid from "./A01ProdTransGrid";

export const A01ProdTransGridContainer = (props) => {
	const { store, ...rest } = props;
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<DsgContext.Provider
			value={{
				...a01.transGrid,
			}}>
			<A01ProdTransGrid
				gridRef={a01.setTransGridRef}
				readOnly={a01.transGridDisabled}
				// data={a01.transGridData}
				columns={a01.transGrid.columns}
				data={a01.transGrid.gridData}
				handleGridChange={a01.handleTransGridChange}
				onActiveCellChange={a01.transGrid.handleActiveCellChange}
				bearer={auth.token}
				height={height - 278}
				createRow={a01.createTransRow}
				{...rest}
			/>
		</DsgContext.Provider>
	);
};
A01ProdTransGridContainer.propTypes = {
	store: PropTypes.bool,
};
A01ProdTransGridContainer.displayName = "ProdTransGridContainer";
