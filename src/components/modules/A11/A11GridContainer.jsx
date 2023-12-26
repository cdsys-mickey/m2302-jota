import { A11Context } from "@/contexts/A11/A11Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A11Grid from "./A11Grid";

const A11GridContainer = () => {
	const { height } = useWindowSize();
	const a11 = useContext(A11Context);

	return (
		<A11Grid
			lockRows={a11.lockRows}
			gridRef={a11.gridRef}
			setGridRef={a11.setGridRef}
			data={a11.gridData}
			loading={a11.gridLoading}
			handleChange={a11.handleGridChange({
				onCreate: a11.handleCreate,
				onUpdate: a11.handleUpdate,
				onDelete: a11.handleConfirmDelete,
				onDuplicatedError: a11.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a11.isPersisted}
			handleSelectionChange={a11.handleSelectionChangeBy({})}
		/>
	);
};

A11GridContainer.displayName = "A11GridContainer";

export default A11GridContainer;
