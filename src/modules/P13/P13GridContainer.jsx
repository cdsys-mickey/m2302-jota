import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import P13Grid from "./P13Grid";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { P13Context } from "./P13Context";

const P13GridContainer = () => {
	const { height } = useWindowSize();
	const p13 = useContext(P13Context);

	const onChange = useMemo(() => {
		return p13.codeEditor.buildGridChangeHandler({
			onCreate: p13.codeEditor.handleCreate,
			onUpdate: p13.codeEditor.handleUpdate,
			onDelete: p13.canDelete ? p13.codeEditor.handleConfirmDelete : null,
			onDuplicatedError: p13.codeEditor.handleDuplicatedError,
		});
	}, [p13]);

	const onSelectionChange = useMemo(() => {
		return p13.gridMeta.buildSelectionChangeHandler();
	}, [p13.gridMeta]);

	return (
		<DSGContext.Provider
			value={{
				...p13.grid,
				...p13.gridMeta,
			}}>
			<P13Grid
				// columns={p13.gridMeta.columns}
				lockRows={p13.grid.readOnly}
				gridRef={p13.gridMeta.setGridRef}
				data={p13.grid.gridData}
				height={height - 176}
				loading={p13.grid.gridLoading}
				onChange={onChange}
				onActiveCellChange={p13.gridMeta.handleActiveCellChange}
				onSelectionChange={onSelectionChange}
				canCreate={p13.canCreate}
				createRow={p13.codeEditor.createRow}
			/>
		</DSGContext.Provider>
	);
};

P13GridContainer.displayName = "P13GridContainer";

export default P13GridContainer;

