import { A15Context } from "@/contexts/A15/A15Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A15Grid from "./A15Grid";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useMemo } from "react";

const A15GridContainer = () => {
	const { height } = useWindowSize();
	const a15 = useContext(A15Context);

	const onChange = useMemo(() => {
		return a15.buildGridChangeHandler({
			onCreate: a15.handleCreate,
			onUpdate: a15.handleUpdate,
			onDelete: a15.canDelete ? a15.handleConfirmDelete : null,
			onDuplicatedError: a15.handleDuplicatedError,
		})
	}, [a15]);

	const onSelectionChange = useMemo(() => {
		return a15.buildSelectionChangeHandler({})
	}, [a15]);

	return (
		<DSGContext.Provider value={{ ...a15.gridMeta }}>
			<A15Grid
				lockRows={a15.readOnly}
				gridRef={a15.setGridRef}
				data={a15.gridData}
				loading={a15.gridLoading}
				height={height - 176}
				onChange={onChange}
				onSelectionChange={onSelectionChange}
				onActiveCellChange={a15.handleActiveCellChange}
				canCreate={a15.canCreate}
				createRow={a15.createRow}
			/>
		</DSGContext.Provider>
	);
};

A15GridContainer.displayName = "A15GridContainer";

export default A15GridContainer;
