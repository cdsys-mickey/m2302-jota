import { A04Context } from "@/contexts/A04/A04Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A04Grid from "./A04Grid";
import { useMemo } from "react";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";

const A04GridContainer = () => {
	const { height } = useWindowSize();
	const a04 = useContext(A04Context);

	const onChange = useMemo(() => {
		return a04.codeEditor.buildGridChangeHandler({
			onCreate: a04.codeEditor.handleCreate,
			onUpdate: a04.codeEditor.handleUpdate,
			onDelete: a04.canDelete ? a04.codeEditor.handleConfirmDelete : null,
			onDuplicatedError: a04.handleDuplicatedError,
		});
	}, [a04.canDelete, a04.codeEditor, a04.handleDuplicatedError]);

	const onSelectionChange = useMemo(() => {
		return a04.gridMeta.buildSelectionChangeHandler();
	}, [a04.gridMeta]);

	return (
		<DSGContext.Provider
			value={{
				...a04.gridMeta,
			}}>
			<A04Grid
				columns={a04.gridMeta.columns}
				lockRows={a04.grid.readOnly}
				gridRef={a04.gridMeta.setGridRef}
				data={a04.grid.gridData}
				loading={a04.grid.gridLoading}
				height={height - 176}
				onChange={onChange}
				onActiveCellChange={a04.gridMeta.handleActiveCellChange}
				onSelectionChange={onSelectionChange}
				canCreate={a04.canCreate}
				// isPersisted={a04.isPersisted}
				// getRowClassName={a04.getRowClassName}
			/>
		</DSGContext.Provider>
	);
};

A04GridContainer.displayName = "A04GridContainer";

export default A04GridContainer;
