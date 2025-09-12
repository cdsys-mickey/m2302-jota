import { useContext } from "react";
import A011Frame from "./A011Frame";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";

export const A011FrameContainer = () => {
	const prodGrid = useContext(ProdGridContext);

	return (
		<A011Frame
			loading={prodGrid.gridLoading}
		/>
	);
};

A011FrameContainer.displayName = "A011Frame";
