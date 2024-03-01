import { A26Context } from "@/contexts/A26/A26Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A26Grid from "./A26Grid";

const A26GridContainer = () => {
	const { height } = useWindowSize();
	const a26 = useContext(A26Context);

	return (
		<A26Grid
			lockRows={a26.readOnly}
			setGridRef={a26.setGridRef}
			data={a26.gridData}
			loading={a26.gridLoading}
			onChange={a26.handleGridChange({
				onCreate: a26.handleCreate,
				onUpdate: a26.handleUpdate,
				onDelete: a26.canDelete ? a26.handleConfirmDelete : null,
				// onConfirmDelete: handleConfirmDelete,
				onDuplicatedError: a26.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a26.isPersisted}
			onSelectionChange={a26.handleSelectionChange({
				// onRowSelectionChange: a26.onRowSelectionChange,
			})}
			canCreate={a26.canCreate}
		/>
	);
};

A26GridContainer.displayName = "A26GridContainer";

export default A26GridContainer;
