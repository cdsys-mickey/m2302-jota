import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A02Grid from "./A02Grid";
import { A02Context } from "@/contexts/a02/A02Context";

const A02GridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const a02 = useContext(A02Context);

	return (
		<A02Grid
			lockRows={a02.lockRows}
			gridRef={a02.gridRef}
			setGridRef={a02.setGridRef}
			data={a02.gridData}
			loading={a02.loading}
			handleChange={a02.handleGridChange({
				onCreate: a02.handleCreate,
				onUpdate: a02.handleUpdate,
				onDelete: a02.handleConfirmDelete,
				onDuplicatedError: a02.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a02.isPersisted}
			// handleActiveCellChange={a02.handleActiveCellChange}
			handleSelectionChange={a02.handleSelectionChangeBy({
				// onRowSelectionChange: catM.handleRowSelectionChange,
			})}
		/>
	);
};

A02GridContainer.displayName = "A02GridContainer";

export default A02GridContainer;
