import { useContext } from "react";
import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A01ProdComboGrid from "./A01ProdComboGrid";
import PropTypes from "prop-types";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const A01ProdComboGridContainer = (props) => {
	const { store, ...rest } = props;
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	return (
		<DSGContext.Provider
			value={{
				...a01.comboGrid,
				...a01.comboMeta,
				readOnly: !a01.editing
			}}>
			<A01ProdComboGrid
				gridRef={a01.comboMeta.setGridRef}
				lockRows={!a01.editing || store}
				columns={a01.comboMeta.columns}
				data={a01.comboGrid.gridData}
				handleGridChange={a01.handleComboGridChange}
				onActiveCellChange={a01.comboMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 278}
				createRow={a01.createComboRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};
A01ProdComboGridContainer.propTypes = {
	store: PropTypes.bool,
};
A01ProdComboGridContainer.displayName = "ProdComboGridContainer";
