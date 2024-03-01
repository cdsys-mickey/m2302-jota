import { A12Context } from "@/contexts/A12/A12Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A12Grid from "./A12Grid";

const A12GridContainer = () => {
	const { height } = useWindowSize();
	const a12 = useContext(A12Context);

	return (
		<A12Grid
			lockRows={a12.readOnly}
			gridRef={a12.gridRef}
			setGridRef={a12.setGridRef}
			data={a12.gridData}
			loading={a12.gridLoading}
			handleChange={a12.handleGridChange({
				onCreate: a12.handleCreate,
				onUpdate: a12.handleUpdate,
				onDelete: a12.handleConfirmDelete,
				onDuplicatedError: a12.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a12.isPersisted}
			onSelectionChange={a12.handleSelectionChange({})}
			canCreate={a12.canCreate}
		/>
	);
};

A12GridContainer.displayName = "A12GridContainer";

export default A12GridContainer;
