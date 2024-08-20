import { A12Context } from "@/contexts/A12/A12Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A12Grid from "./A12Grid";
import { useMemo } from "react";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";

const A12GridContainer = () => {
	const { height } = useWindowSize();
	const a12 = useContext(A12Context);

	const onChange = useMemo(() => {
		return a12.buildGridChangeHandler({
			onCreate: a12.handleCreate,
			onUpdate: a12.handleUpdate,
			onDelete: a12.handleConfirmDelete,
			onDuplicatedError: a12.handleDuplicatedError,
		})
	}, [a12]);

	const onSelectionChange = useMemo(() => {
		return a12.gridMeta.buildSelectionChangeHandler({});
	}, [a12]);

	return (
		<DSGContext.Provider value={{ ...a12.gridMeta }}>
			<A12Grid
				lockRows={a12.readOnly}
				gridRef={a12.setGridRef}
				data={a12.gridData}
				loading={a12.gridLoading}
				height={height - 176}
				onChange={onChange}
				onSelectionChange={onSelectionChange}
				onActiveCellChange={a12.handleActiveCellChange}
				canCreate={a12.canCreate}
			/>
		</DSGContext.Provider>
	);
};

A12GridContainer.displayName = "A12GridContainer";

export default A12GridContainer;
