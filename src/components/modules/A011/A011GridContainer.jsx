import { useContext } from "react";
import { A011Context } from "../../../contexts/A011/A011Context";
import { useWindowSize } from "../../../shared-hooks/useWindowSize";
import A011Grid from "./A011Grid";
import NoDataBox from "../../../shared-components/NoDataBox";
import { useMemo } from "react";

export const A011GridContainer = () => {
	const { height } = useWindowSize();
	const a011 = useContext(A011Context);

	const gridHeight = useMemo(() => {
		return a011.expanded ? height - 330 : height - 230;
	}, [a011.expanded, height]);

	return (
		<A011Grid
			lockRows={a011.lockRows}
			setGridRef={a011.setGridRef}
			data={a011.gridData}
			loading={a011.gridLoading}
			height={gridHeight}
			onChange={a011.handleGridChange()}
		/>
	);
};

A011GridContainer.displayName = "A011GridContainer";
