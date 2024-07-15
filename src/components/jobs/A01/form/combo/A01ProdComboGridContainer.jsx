import { useContext } from "react";
import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import A01ProdComboGrid from "./A01ProdComboGrid";
import PropTypes from "prop-types";
import { useWindowSize } from "@/shared-hooks/useWindowSize";

export const A01ProdComboGridContainer = (props) => {
	const { store, ...rest } = props;
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	return (
		<A01ProdComboGrid
			gridRef={a01.setComboGridRef}
			lockRows={!a01.editing || store}
			data={a01.comboGridData}
			handleGridChange={a01.handleComboGridChange}
			bearer={auth.token}
			height={height - 290}
			createRow={a01.createComboRow}
			{...rest}
		/>
	);
};
A01ProdComboGridContainer.propTypes = {
	store: PropTypes.bool,
};
A01ProdComboGridContainer.displayName = "ProdComboGridContainer";
