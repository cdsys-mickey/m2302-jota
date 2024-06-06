import { useContext } from "react";
import ProdGridToolbar from "./ProdGridToolbar";
import { ProdGridContext } from "../../../contexts/prod-grid/ProdGridContext";

export const ProdGridToolbarContainer = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);

	if (prodGrid.gridLoading != false || !prodGrid.gridData) {
		return false;
	}

	return <ProdGridToolbar {...rest} />;
};

ProdGridToolbarContainer.displayName = "ProdGridToolbarContainer";
