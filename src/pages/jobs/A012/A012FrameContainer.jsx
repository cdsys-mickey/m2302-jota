import { useContext } from "react";
import A012Frame from "./A012Frame";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";

export const A012FrameContainer = () => {
	const prodGrid = useContext(ProdGridContext);

	return (<A012Frame loading={prodGrid.gridLoading} />);
};

A012FrameContainer.displayName = "A012Frame";
