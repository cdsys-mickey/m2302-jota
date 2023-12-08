import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A16Grid from "./A16Grid";
import { A16Context } from "@/contexts/A16/A16Context";

const A16GridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const a16 = useContext(A16Context);

	return (
		<A16Grid
			lockRows={a16.lockRows}
			gridRef={a16.setGridRef}
			data={a16.gridData}
			loading={a16.gridLoading}
			handleChange={a16.handleGridChange({
				onCreate: a16.handleCreate,
				onUpdate: a16.handleUpdate,
				onPatch: a16.handlePatch,
				onDelete: a16.handleConfirmDelete,
				onDuplicatedError: a16.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a16.isPersisted}
			handleSelectionChange={a16.handleSelectionChangeBy({})}
			handleCreateRow={a16.handleCreateRow}
		/>
	);
};

A16GridContainer.displayName = "A16GridContainer";

export default A16GridContainer;
