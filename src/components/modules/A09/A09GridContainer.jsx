import { A09Context } from "@/contexts/A09/A09Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A09Grid from "./A09Grid";

const A09GridContainer = () => {
	const { height } = useWindowSize();
	const a09 = useContext(A09Context);

	return (
		<A09Grid
			lockRows={a09.lockRows}
			gridRef={a09.gridRef}
			setGridRef={a09.setGridRef}
			data={a09.gridData}
			loading={a09.gridLoading}
			handleChange={a09.handleGridChange({
				onCreate: a09.handleCreate,
				onUpdate: a09.handleUpdate,
				onDelete: a09.handleConfirmDelete,
				onDuplicatedError: a09.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a09.isPersisted}
			handleSelectionChange={a09.handleSelectionChangeBy({})}
		/>
	);
};

A09GridContainer.displayName = "A09GridContainer";

export default A09GridContainer;