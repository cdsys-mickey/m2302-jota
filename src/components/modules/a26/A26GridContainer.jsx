import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A26Grid from "./A26Grid";
import { A26Context } from "@/contexts/a26/A26Context";

const A26GridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const a26 = useContext(A26Context);

	return (
		<A26Grid
			lockRows={a26.lockRows}
			setGridRef={a26.setGridRef}
			data={a26.gridData}
			loading={a26.gridLoading}
			handleChange={a26.handleGridChange({
				onCreate: a26.handleCreate,
				onUpdate: a26.handleUpdate,
				onDelete: a26.handleConfirmDelete,
				// onConfirmDelete: handleConfirmDelete,
				onDuplicatedError: a26.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a26.isPersisted}
			handleSelectionChange={a26.handleSelectionChangeBy({
				// onRowSelectionChange: a26.handleRowSelectionChange,
			})}
		/>
	);
};

A26GridContainer.displayName = "A26GridContainer";

export default A26GridContainer;
