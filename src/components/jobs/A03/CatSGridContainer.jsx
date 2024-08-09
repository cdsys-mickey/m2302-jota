import { CatSGridContext } from "@/contexts/A03/CatSGridContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import CatSGrid from "./CatSGrid";
import { A03Context } from "@/contexts/A03/A03Context";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { CatSContext } from "../../../contexts/A03/CatSContext";

export const CatSGridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	// const catS = useContext(CatSGridContext);
	const catS = useContext(CatSContext);
	const a03 = useContext(A03Context);
	const { canDelete } = a03;

	return (
		<DSGContext.Provider value={{ ...catS.grid, ...catS.gridMeta }}>
			<CatSGrid
				lockRows={a03.readOnly}
				setGridRef={catS.gridMeta.setGridRef}
				columns={catS.gridMeta.columns}
				data={catS.grid.gridData}
				loading={catS.grid.gridLoading}
				handleChange={catS.codeEditor.buildGridChangeHandler({
					onCreate: catS.codeEditor.handleCreate,
					onUpdate: catS.codeEditor.handleUpdate,
					onDelete: canDelete
						? catS.codeEditor.handleConfirmDelete
						: null,
					onDuplicatedError: catS.codeEditor.handleDuplicatedError,
				})}
				height={height - 176}
				onSelectionChange={catS.gridMeta.buildSelectionChangeHandler({
					onRowSelectionChange: catS.onRowSelectionChange,
				})}
				canCreate={a03.canCreate}
				getRowClassName={catS.grid.getRowClassName}
			/>
			{/* <CatSGrid
				lockRows={a03.readOnly}
				// gridRef={catS.gridMeta.gridRef}
				setGridRef={catS.gridMeta.setGridRef}
				lgId={catS.lgId}
				mdId={catS.mdId}
				columns={catS.gridMeta.columns}
				data={catS.grid.gridData}
				loading={catS.grid.gridLoading}
				handleChange={catS.codeEditor.buildGridChangeHandler({
					onCreate: catS.handleCreate,
					onUpdate: catS.handleUpdate,
					onDelete: canDelete ? catS.handleConfirmDelete : null,
					onDuplicatedError: catS.handleDuplicatedError,
				})}
				height={height - 176}
				onSelectionChange={catS.gridMeta.buildSelectionChangeHandler({
					onRowSelectionChange: catS.onRowSelectionChange,
				})}
				canCreate={a03.canCreate}
				getRowClassName={catS.grid.getRowClassName}
			/> */}
		</DSGContext.Provider>
	);
};

CatSGridContainer.displayName = "CatSGridContainer";
