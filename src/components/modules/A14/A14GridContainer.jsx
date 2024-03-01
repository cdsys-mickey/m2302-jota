import { A14Context } from "@/contexts/A14/A14Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A14Grid from "./A14Grid";

const A14GridContainer = () => {
	const { height } = useWindowSize();
	const a14 = useContext(A14Context);

	return (
		<A14Grid
			lockRows={a14.readOnly}
			gridRef={a14.gridRef}
			setGridRef={a14.setGridRef}
			data={a14.gridData}
			loading={a14.gridLoading}
			handleChange={a14.handleGridChange({
				onCreate: a14.handleCreate,
				onUpdate: a14.handleUpdate,
				onDelete: a14.canDelete ? a14.handleConfirmDelete : null,
				onDuplicatedError: a14.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a14.isPersisted}
			onSelectionChange={a14.handleSelectionChange({})}
			canCreate={a14.canCreate}
		/>
	);
};

A14GridContainer.displayName = "A14GridContainer";

export default A14GridContainer;
