import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import P31Grid from "./P31Grid";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { P31Context } from "./P31Context";

const P31GridContainer = () => {
	const { height } = useWindowSize();
	const p31 = useContext(P31Context);

	const onChange = useMemo(() => {
		return p31.codeEditor.buildGridChangeHandler({
			onCreate: p31.codeEditor.handleCreate,
			onUpdate: p31.codeEditor.handleUpdate,
			onDelete: p31.canDelete ? p31.codeEditor.handleConfirmDelete : null,
			onDuplicatedError: p31.codeEditor.handleDuplicatedError,
		});
	}, [p31]);

	const onSelectionChange = useMemo(() => {
		return p31.gridMeta.buildSelectionChangeHandler();
	}, [p31.gridMeta]);

	return (
		<DSGContext.Provider
			value={{
				...p31.grid,
				...p31.gridMeta,
			}}>
			<P31Grid
				// columns={p31.gridMeta.columns}
				lockRows={p31.grid.readOnly}
				gridRef={p31.gridMeta.setGridRef}
				data={p31.grid.gridData}
				height={height - 176}
				loading={p31.grid.gridLoading}
				onChange={onChange}
				onActiveCellChange={p31.gridMeta.handleActiveCellChange}
				onSelectionChange={onSelectionChange}
				canCreate={p31.canCreate}
				createRow={p31.codeEditor.createRow}
			/>
		</DSGContext.Provider>
	);
};

P31GridContainer.displayName = "P31GridContainer";

export default P31GridContainer;


