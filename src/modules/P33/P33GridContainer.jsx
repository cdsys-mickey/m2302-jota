import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import P33Grid from "./P33Grid";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { P33Context } from "./P33Context";

const P33GridContainer = () => {
	const { height } = useWindowSize();
	const p33 = useContext(P33Context);

	const onChange = useMemo(() => {
		return p33.codeEditor.buildGridChangeHandler({
			onCreate: p33.codeEditor.handleCreate,
			onUpdate: p33.codeEditor.handleUpdate,
			onDelete: p33.canDelete ? p33.codeEditor.handleConfirmDelete : null,
			onDuplicatedError: p33.codeEditor.handleDuplicatedError,
		});
	}, [p33]);

	const onSelectionChange = useMemo(() => {
		return p33.gridMeta.buildSelectionChangeHandler();
	}, [p33.gridMeta]);

	return (
		<DSGContext.Provider
			value={{
				...p33.grid,
				...p33.gridMeta,
			}}>
			<P33Grid
				// columns={p33.gridMeta.columns}
				lockRows={p33.grid.readOnly}
				gridRef={p33.gridMeta.setGridRef}
				data={p33.grid.gridData}
				height={height - 176}
				loading={p33.grid.gridLoading}
				onChange={onChange}
				onActiveCellChange={p33.gridMeta.handleActiveCellChange}
				onSelectionChange={onSelectionChange}
				canCreate={p33.canCreate}
				createRow={p33.codeEditor.createRow}
			/>
		</DSGContext.Provider>
	);
};

P33GridContainer.displayName = "P33GridContainer";

export default P33GridContainer;




