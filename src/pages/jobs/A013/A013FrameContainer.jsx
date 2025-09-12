import { useContext } from "react";
import A013Frame from "./A013Frame";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";

export const A013FrameContainer = () => {
	const prodGrid = useContext(ProdGridContext);
	return (<A013Frame loading={prodGrid.gridLoading} />);
};

A013FrameContainer.displayName = "A013Frame";
