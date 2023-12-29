import { A02Context } from "@/contexts/A02/A02Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A02Grid from "./A02Grid";

const A02GridContainer = () => {
	const { height } = useWindowSize();
	const a02 = useContext(A02Context);

	return (
		<A02Grid
			readOnly={a02.readOnly}
			gridRef={a02.gridRef}
			setGridRef={a02.setGridRef}
			data={a02.gridData}
			loading={a02.gridLoading}
			handleChange={a02.handleGridChange({
				onCreate: a02.handleCreate,
				onUpdate: a02.handleUpdate,
				onDelete: a02.handleConfirmDelete,
				onDuplicatedError: a02.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a02.isPersisted}
			onSelectionChange={a02.handleSelectionChange({})}
		/>
	);
};

A02GridContainer.displayName = "A02GridContainer";

export default A02GridContainer;
