import { A11Context } from "@/contexts/A11/A11Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A11Grid from "./A11Grid";
import { useMemo } from "react";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";

const A11GridContainer = () => {
	const { height } = useWindowSize();
	const a11 = useContext(A11Context);

	const onChange = useMemo(() => {
		return a11.buildGridChangeHandler({
			onCreate: a11.handleCreate,
			onUpdate: a11.handleUpdate,
			onDelete: a11.canDelete ? a11.handleConfirmDelete : null,
			onDuplicatedError: a11.handleDuplicatedError,
		})
	}, [a11]);

	const onSelectionChange = useMemo(() => {
		return a11.gridMeta.buildSelectionChangeHandler({});
	}, [a11]);

	return (
		<DSGContext.Provider value={{ ...a11.gridMeta }}>
			<A11Grid
				lockRows={a11.readOnly}
				gridRef={a11.gridMeta.setGridRef}
				data={a11.gridData}
				loading={a11.gridLoading}
				height={height - 180}
				onChange={onChange}
				onSelectionChange={onSelectionChange}
				onActiveCellChange={a11.gridMeta.handleActiveCellChange}
				canCreate={a11.canCreate}
			// isPersisted={a11.isPersisted}
			/>
		</DSGContext.Provider>
	);
};

A11GridContainer.displayName = "A11GridContainer";

export default A11GridContainer;
