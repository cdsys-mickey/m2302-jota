import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import A015Frame from "./A015Frame";
import { useContext } from "react";

export const A015FrameContainer = () => {
	const prodGrid = useContext(ProdGridContext);
	return (<A015Frame loading={prodGrid.gridLoading} />);
};

A015FrameContainer.displayName = "A015Frame";
