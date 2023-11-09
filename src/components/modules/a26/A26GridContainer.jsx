import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A26Grid from "./A26Grid";
import { A26Context } from "@/contexts/a26/A26Context";

const A26GridContainer = () => {
	const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const a26 = useContext(A26Context);

	return (
		<A26Grid
			ref={dsg.gridRef}
			data={dsg.data}
			loading={dsg.loading}
			// handleChange={handleChange}
			handleChange={a26.handleGridChange}
			height={height - 176}
			isPersisted={dsg.isPersisted}
			handleActiveCellChange={dsg.handleActiveCellChange}
		/>
	);
};

A26GridContainer.displayName = "A26GridContainer";

export default A26GridContainer;
