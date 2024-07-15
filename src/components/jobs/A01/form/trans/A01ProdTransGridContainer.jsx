import { useContext } from "react";
import A01ProdTransGrid from "./A01ProdTransGrid";
import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useWindowSize } from "@/shared-hooks/useWindowSize";

export const A01ProdTransGridContainer = (props) => {
	const { store, ...rest } = props;
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<A01ProdTransGrid
			gridRef={a01.setTransGridRef}
			readOnly={!a01.editing || store}
			data={a01.transGridData}
			handleGridChange={a01.handleTransGridChange}
			bearer={auth.token}
			height={height - 280}
			createRow={a01.createTransRow}
			{...rest}
		/>
	);
};
A01ProdTransGridContainer.propTypes = {
	store: PropTypes.bool,
};
A01ProdTransGridContainer.displayName = "ProdTransGridContainer";
