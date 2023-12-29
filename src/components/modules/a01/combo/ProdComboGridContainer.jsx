import { useContext } from "react";
import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import ProdComboGrid from "./ProdComboGrid";
import PropTypes from "prop-types";

export const ProdComboGridContainer = (props) => {
	const { store, ...rest } = props;
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);

	return (
		<ProdComboGrid
			gridRef={a01.setComboGridRef}
			readOnly={!a01.editing || store}
			data={a01.comboGridData}
			handleGridChange={a01.handleComboGridChange}
			bearer={auth.token}
			{...rest}
		/>
	);
};
ProdComboGridContainer.propTypes = {
	store: PropTypes.bool,
};
ProdComboGridContainer.displayName = "ProdComboGridContainer";
