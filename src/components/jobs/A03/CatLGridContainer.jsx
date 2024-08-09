import { CatLGridContext } from "@/contexts/A03/CatLGridContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { A03Context } from "@/contexts/A03/A03Context";
import CatLGrid from "./CatLGrid";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { CatLContext } from "../../../contexts/A03/CatLContext";

export const CatLGridContainer = () => {
	const { height } = useWindowSize();
	// const catL = useContext(CatLGridContext);
	const catL = useContext(CatLContext);
	const a03 = useContext(A03Context);
	const { canDelete } = a03;

	return (
		<DSGContext.Provider value={{ ...catL.grid, ...catL.gridMeta }}>
			<CatLGrid
				lockRows={a03.readOnly}
				setGridRef={catL.gridMeta.setGridRef}
				columns={catL.gridMeta.columns}
				data={catL.grid.gridData}
				loading={catL.grid.gridLoading}
				handleChange={catL.codeEditor.buildGridChangeHandler({
					onCreate: catL.codeEditor.handleCreate,
					onUpdate: catL.codeEditor.handleUpdate,
					onDelete: canDelete
						? catL.codeEditor.handleConfirmDelete
						: null,
					onDuplicatedError: catL.codeEditor.handleDuplicatedError,
				})}
				height={height - 176}
				onSelectionChange={catL.gridMeta.buildSelectionChangeHandler({
					onRowSelectionChange: catL.onRowSelectionChange,
				})}
				onActiveCellChange={catL.gridMeta.handleActiveCellChange}
				canCreate={a03.canCreate}
				getRowClassName={catL.grid.getRowClassName}
			/>
			{/* <CatLGrid
				lockRows={a03.readOnly}
				gridRef={catL.gridMeta.gridRef}
				setGridRef={catL.gridMeta.setGridRef}
				columns={catL.gridMeta.columns}
				data={catL.grid.gridData}
				loading={catL.grid.gridLoading}
				handleChange={catL.codeEditor.buildGridChangeHandler({
					onCreate: catL.handleCreate,
					onUpdate: catL.handleUpdate,
					onDelete: canDelete ? catL.handleConfirmDelete : null,
					onDuplicatedError: catL.handleDuplicatedError,
				})}
				height={height - 176}
				onSelectionChange={catL.gridMeta.buildSelectionChangeHandler({
					onRowSelectionChange: catL.onRowSelectionChange,
				})}
				canCreate={a03.canCreate}
				getRowClassName={catL.grid.getRowClassName}
			/> */}
		</DSGContext.Provider>
	);
};

CatLGridContainer.displayName = "CatLGridContainer";
