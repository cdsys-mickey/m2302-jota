import { useContext } from "react";
import A02Grid from "./A02Grid";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

const A02GridContainer = () => {
	const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	return (
		<A02Grid
			ref={dsg.gridRef}
			data={dsg.data}
			loading={dsg.loading}
			handleChange={dsg.handleChange}
			handleBlur={dsg.handleBlur}
			height={height - 176}
			isPersisted={dsg.isPersisted}
			handleActiveCellChange={dsg.handleActiveCellChange}
		/>
	);
};

A02GridContainer.displayName = "A02GridContainer";

export default A02GridContainer;
