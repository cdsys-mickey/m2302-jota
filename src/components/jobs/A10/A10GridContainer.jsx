import { A10Context } from "@/contexts/A10/A10Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A10Grid from "./A10Grid";

const A10GridContainer = () => {
	const { height } = useWindowSize();
	const a10 = useContext(A10Context);

	return (
		<A10Grid
			lockRows={a10.readOnly}
			gridRef={a10.gridRef}
			setGridRef={a10.setGridRef}
			data={a10.gridData}
			loading={a10.gridLoading}
			handleChange={a10.buildGridChangeHandler({
				onCreate: a10.handleCreate,
				onUpdate: a10.handleUpdate,
				onDelete: a10.canDelete ? a10.handleConfirmDelete : null,
				onDuplicatedError: a10.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a10.isPersisted}
			onSelectionChange={a10.buildSelectionChangeHandler({})}
			canCreate={a10.canCreate}
		/>
	);
};

A10GridContainer.displayName = "A10GridContainer";

export default A10GridContainer;
