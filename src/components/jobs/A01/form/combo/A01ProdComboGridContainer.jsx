import { useContext } from "react";
import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A01ProdComboGrid from "./A01ProdComboGrid";
import PropTypes from "prop-types";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DsgContext } from "@/shared-contexts/datasheet-grid/DsgContext";

export const A01ProdComboGridContainer = (props) => {
	const { store, ...rest } = props;
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	return (
		<DsgContext.Provider
			value={{
				...a01.comboGrid,
			}}>
			<A01ProdComboGrid
				gridRef={a01.setComboGridRef}
				lockRows={!a01.editing || store}
				columns={a01.comboGrid.columns}
				data={a01.comboGridData}
				handleGridChange={a01.handleComboGridChange}
				onActiveCellChange={a01.comboGrid.handleActiveCellChange}
				bearer={auth.token}
				height={height - 278}
				createRow={a01.createComboRow}
				{...rest}
			/>
		</DsgContext.Provider>
	);
};
A01ProdComboGridContainer.propTypes = {
	store: PropTypes.bool,
};
A01ProdComboGridContainer.displayName = "ProdComboGridContainer";
