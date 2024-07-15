import { A09Context } from "@/contexts/A09/A09Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A09Grid from "./A09Grid";

const A09GridContainer = () => {
	const { height } = useWindowSize();
	const a09 = useContext(A09Context);

	return (
		<A09Grid
			lockRows={a09.readOnly}
			gridRef={a09.gridRef}
			setGridRef={a09.setGridRef}
			data={a09.gridData}
			loading={a09.gridLoading}
			handleChange={a09.buildGridChangeHandler({
				onCreate: a09.handleCreate,
				onUpdate: a09.handleUpdate,
				onDelete: a09.canDelete ? a09.handleConfirmDelete : null,
				onDuplicatedError: a09.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a09.isPersisted}
			onSelectionChange={a09.buildSelectionChangeHandler({})}
			canCreate={a09.canCreate}
		/>
	);
};

A09GridContainer.displayName = "A09GridContainer";

export default A09GridContainer;
