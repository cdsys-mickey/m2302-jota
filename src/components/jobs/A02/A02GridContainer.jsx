import { A02Context } from "@/contexts/A02/A02Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A02Grid from "./A02Grid";
import { useMemo } from "react";

const A02GridContainer = () => {
	const { height } = useWindowSize();
	const a02 = useContext(A02Context);

	const gridChangeHandler = useMemo(() => {
		return a02.buildGridChangeHandler({
			onCreate: a02.handleCreate,
			onUpdate: a02.handleUpdate,
			onDelete: a02.canDelete ? a02.handleConfirmDelete : null,
			onDuplicatedError: a02.handleDuplicatedError,
		});
	}, [a02]);

	return (
		<A02Grid
			lockRows={a02.readOnly}
			gridRef={a02.gridRef}
			setGridRef={a02.setGridRef}
			data={a02.gridData}
			loading={a02.gridLoading}
			handleChange={gridChangeHandler}
			height={height - 176}
			isPersisted={a02.isPersisted}
			onSelectionChange={a02.buildSelectionChangeHandler({})}
			canCreate={a02.canCreate}
		/>
	);
};

A02GridContainer.displayName = "A02GridContainer";

export default A02GridContainer;
