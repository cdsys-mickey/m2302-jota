import { useContext } from "react";
import ProdTransGrid from "./ProdTransGrid";
import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useWindowSize } from "../../../../../shared-hooks/useWindowSize";

export const ProdTransGridContainer = (props) => {
	const { store, ...rest } = props;
	const a01 = useContext(A01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();

	return (
		<ProdTransGrid
			gridRef={a01.setTransGridRef}
			readOnly={!a01.editing || store}
			data={a01.transGridData}
			handleGridChange={a01.handleTransGridChange}
			bearer={auth.token}
			height={height - 290}
			{...rest}
		/>
	);
};
ProdTransGridContainer.propTypes = {
	store: PropTypes.bool,
};
ProdTransGridContainer.displayName = "ProdTransGridContainer";
