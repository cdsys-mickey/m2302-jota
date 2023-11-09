import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A02Grid from "./A02Grid";
import { A02Context } from "@/contexts/a02/A02Context";

const A02GridContainer = () => {
	const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const a02 = useContext(A02Context);

	return (
		<A02Grid
			ref={dsg.gridRef}
			data={dsg.data}
			loading={dsg.loading}
			// handleChange={handleChange}
			handleChange={a02.handleGridChange}
			height={height - 176}
			isPersisted={dsg.isPersisted}
			handleActiveCellChange={dsg.handleActiveCellChange}
		/>
	);
};

A02GridContainer.displayName = "A02GridContainer";

export default A02GridContainer;
