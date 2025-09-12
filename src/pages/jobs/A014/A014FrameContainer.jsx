import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import A014Frame from "./A014Frame";
import { useContext } from "react";

export const A014FrameContainer = () => {
	const prodGrid = useContext(ProdGridContext);
	return (<A014Frame loading={prodGrid.gridLoading} />);
};

A014FrameContainer.displayName = "A014Frame";
