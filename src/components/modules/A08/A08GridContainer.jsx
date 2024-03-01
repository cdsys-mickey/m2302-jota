import { A08Context } from "@/contexts/A08/A08Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A08Grid from "./A08Grid";

const A08GridContainer = () => {
	const { height } = useWindowSize();
	const a08 = useContext(A08Context);

	return (
		<A08Grid
			lockRows={a08.readOnly}
			gridRef={a08.gridRef}
			setGridRef={a08.setGridRef}
			data={a08.gridData}
			loading={a08.gridLoading}
			handleChange={a08.handleGridChange({
				onCreate: a08.handleCreate,
				onUpdate: a08.handleUpdate,
				onDelete: a08.canDelete ? a08.handleConfirmDelete : null,
				onDuplicatedError: a08.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a08.isPersisted}
			onSelectionChange={a08.handleSelectionChange({})}
			canCreate={a08.canCreate}
		/>
	);
};

A08GridContainer.displayName = "A08GridContainer";

export default A08GridContainer;
