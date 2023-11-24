import { A04Context } from "@/contexts/a04/A04Context";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A04Grid from "./A04Grid";

const A04GridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const a04 = useContext(A04Context);

	return (
		<A04Grid
			lockRows={a04.lockRows}
			setGridRef={a04.setGridRef}
			data={a04.gridData}
			loading={a04.gridLoading}
			handleChange={a04.handleGridChange({
				onCreate: a04.handleCreate,
				onUpdate: a04.handleUpdate,
				onDelete: a04.handleConfirmDelete,
				onDuplicatedError: a04.handleDuplicatedError,
			})}
			// handleChange={a04.handleGridChange}
			height={height - 176}
			isPersisted={a04.isPersisted}
			// handleActiveCellChange={a04.handleActiveCellChange}
			handleSelectionChange={a04.handleSelectionChangeBy({
				// onRowSelectionChange: catM.handleRowSelectionChange,
			})}
		/>
	);
};

A04GridContainer.displayName = "A04GridContainer";

export default A04GridContainer;
