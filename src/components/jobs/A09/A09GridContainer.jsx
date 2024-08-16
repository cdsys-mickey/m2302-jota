import { A09Context } from "@/contexts/A09/A09Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A09Grid from "./A09Grid";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useMemo } from "react";

const A09GridContainer = () => {
	const { height } = useWindowSize();
	const a09 = useContext(A09Context);

	const onChange = useMemo(() => {
		return a09.codeEditor.buildGridChangeHandler({
			onCreate: a09.codeEditor.handleCreate,
			onUpdate: a09.codeEditor.handleUpdate,
			onDelete: a09.canDelete ? a09.codeEditor.handleConfirmDelete : null,
			onDuplicatedError: a09.codeEditor.handleDuplicatedError,
		})
	}, [a09]);

	const onSelectionChange = useMemo(() => {
		return a09.gridMeta.buildSelectionChangeHandler({});
	}, [a09.gridMeta]);
	return (
		<DSGContext.Provider value={{ ...a09.gridMeta }}>
			<A09Grid
				// columns={a09.gridMeta.columns}
				lockRows={a09.grid.readOnly}
				gridRef={a09.gridMeta.setGridRef}
				data={a09.grid.gridData}
				loading={a09.grid.gridLoading}
				height={height - 176}
				onChange={onChange}
				onSelectionChange={onSelectionChange}
				onActiveCellChange={a09.gridMeta.handleActiveCellChange}
				canCreate={a09.canCreate}
			/>
		</DSGContext.Provider>
	);
};

A09GridContainer.displayName = "A09GridContainer";

export default A09GridContainer;
