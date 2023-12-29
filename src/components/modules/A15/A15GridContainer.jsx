import { A15Context } from "@/contexts/A15/A15Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A15Grid from "./A15Grid";

const A15GridContainer = () => {
	const { height } = useWindowSize();
	const a15 = useContext(A15Context);

	return (
		<A15Grid
			readOnly={a15.readOnly}
			gridRef={a15.gridRef}
			setGridRef={a15.setGridRef}
			data={a15.gridData}
			loading={a15.gridLoading}
			handleChange={a15.handleGridChange({
				onCreate: a15.handleCreate,
				onUpdate: a15.handleUpdate,
				onDelete: a15.handleConfirmDelete,
				onDuplicatedError: a15.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a15.isPersisted}
			onSelectionChange={a15.handleSelectionChange({})}
		/>
	);
};

A15GridContainer.displayName = "A15GridContainer";

export default A15GridContainer;
