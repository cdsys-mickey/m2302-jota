import { A10Context } from "@/contexts/A10/A10Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A10Grid from "./A10Grid";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

const A10GridContainer = () => {
	const { height } = useWindowSize();
	const a10 = useContext(A10Context);

	const onChange = useMemo(() => {
		return a10.codeEditor.buildGridChangeHandler({
			onCreate: a10.codeEditor.handleCreate,
			onUpdate: a10.codeEditor.handleUpdate,
			onDelete: a10.canDelete ? a10.codeEditor.handleConfirmDelete : null,
			onDuplicatedError: a10.codeEditor.handleDuplicatedError,
		})
	}, [a10.canDelete, a10.codeEditor]);

	const onSelectionChange = useMemo(() => {
		return a10.gridMeta.buildSelectionChangeHandler({})
	}, [a10]);

	return (
		<DSGContext.Provider value={{ ...a10.gridMeta }}>
			<A10Grid
				lockRows={a10.grid.readOnly}
				gridRef={a10.gridMeta.setGridRef}
				data={a10.grid.gridData}
				loading={a10.grid.gridLoading}
				height={height - 176}
				onChange={onChange}
				onSelectionChange={onSelectionChange}
				onActiveCellChange={a10.gridMeta.handleActiveCellChange}
				canCreate={a10.canCreate}
			/>
		</DSGContext.Provider>
	);
};

A10GridContainer.displayName = "A10GridContainer";

export default A10GridContainer;
