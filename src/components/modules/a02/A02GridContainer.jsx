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
			lockRows={a02.lockRows}
			gridRef={dsg.gridRef}
			setGridRef={dsg.setGridRef}
			data={dsg.data}
			loading={dsg.loading}
			handleChange={dsg.handleChange({
				onCreate: a02.handleCreate,
				onUpdate: a02.handleUpdate,
				onDelete: a02.handleConfirmDelete,
				onDuplicatedError: a02.handleDuplicatedError,
			})}
			// handleChange={a02.handleGridChange}
			height={height - 176}
			isPersisted={dsg.isPersisted}
			// handleActiveCellChange={dsg.handleActiveCellChange}
			handleSelectionChange={dsg.handleSelectionChangeBy({
				// onRowSelectionChange: catM.handleRowSelectionChange,
			})}
		/>
	);
};

A02GridContainer.displayName = "A02GridContainer";

export default A02GridContainer;
