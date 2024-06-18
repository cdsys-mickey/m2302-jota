import { A13Context } from "@/contexts/A13/A13Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A13Grid from "./A13Grid";

const A13GridContainer = () => {
	const { height } = useWindowSize();
	const a13 = useContext(A13Context);

	return (
		<A13Grid
			lockRows={a13.readOnly}
			gridRef={a13.gridRef}
			setGridRef={a13.setGridRef}
			data={a13.gridData}
			loading={a13.gridLoading}
			handleChange={a13.buildGridChangeHandler({
				onCreate: a13.handleCreate,
				onUpdate: a13.handleUpdate,
				onDelete: a13.canDelete ? a13.handleConfirmDelete : null,
				onDuplicatedError: a13.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a13.isPersisted}
			onSelectionChange={a13.handleSelectionChange({})}
			canCreate={a13.canCreate}
		/>
	);
};

A13GridContainer.displayName = "A13GridContainer";

export default A13GridContainer;
