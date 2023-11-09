import { A04Context } from "@/contexts/a04/A04Context";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A04Grid from "./A04Grid";

const A04GridContainer = () => {
	const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const a04 = useContext(A04Context);

	return (
		<A04Grid
			ref={dsg.gridRef}
			data={dsg.data}
			loading={dsg.loading}
			// handleChange={handleChange}
			handleChange={a04.handleGridChange}
			height={height - 176}
			isPersisted={dsg.isPersisted}
			handleActiveCellChange={dsg.handleActiveCellChange}
		/>
	);
};

A04GridContainer.displayName = "A04GridContainer";

export default A04GridContainer;
