import { A04Context } from "@/contexts/A04/A04Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A04Grid from "./A04Grid";

const A04GridContainer = () => {
	const { height } = useWindowSize();
	const a04 = useContext(A04Context);

	return (
		<A04Grid
			lockRows={a04.readOnly}
			setGridRef={a04.setGridRef}
			data={a04.gridData}
			loading={a04.gridLoading}
			handleChange={a04.buildGridChangeHandler({
				onCreate: a04.handleCreate,
				onUpdate: a04.handleUpdate,
				onDelete: a04.handleConfirmDelete,
				onDuplicatedError: a04.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a04.isPersisted}
			onSelectionChange={a04.handleSelectionChange({})}
			canCreate={a04.canCreate}
			getRowClassName={a04.getRowClassName}
		/>
	);
};

A04GridContainer.displayName = "A04GridContainer";

export default A04GridContainer;
