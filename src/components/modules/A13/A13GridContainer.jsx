import { A13Context } from "@/contexts/A13/A13Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A13Grid from "./A13Grid";

const A13GridContainer = () => {
	const { height } = useWindowSize();
	const a13 = useContext(A13Context);

	return (
		<A13Grid
			readOnly={a13.readOnly}
			gridRef={a13.gridRef}
			setGridRef={a13.setGridRef}
			data={a13.gridData}
			loading={a13.gridLoading}
			handleChange={a13.handleGridChange({
				onCreate: a13.handleCreate,
				onUpdate: a13.handleUpdate,
				onDelete: a13.handleConfirmDelete,
				onDuplicatedError: a13.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={a13.isPersisted}
			onSelectionChange={a13.handleSelectionChange({})}
		/>
	);
};

A13GridContainer.displayName = "A13GridContainer";

export default A13GridContainer;
