import { A03Context } from "@/contexts/A03/A03Context";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { CatMContext } from "@/contexts/A03/CatMContext";
import CatMGrid from "./CatMGrid";
import { useMemo } from "react";

export const CatMGridContainer = () => {
	const { height } = useWindowSize();
	// const catM = useContext(CatMGridContext);
	const catM = useContext(CatMContext);
	const a03 = useContext(A03Context);
	const { canDelete } = a03;

	const onChange = useMemo(() => {
		return catM.codeEditor.buildGridChangeHandler({
			onCreate: catM.codeEditor.handleCreate,
			onUpdate: catM.codeEditor.handleUpdate,
			onDelete: canDelete ? catM.codeEditor.handleConfirmDelete : null,
			onDeleted: catM.onDeleted,
			onDuplicatedError: catM.codeEditor.handleDuplicatedError,
		});
	}, [canDelete, catM.codeEditor, catM.onDeleted]);

	const onSelectionChange = useMemo(() => {
		return catM.gridMeta.buildSelectionChangeHandler({
			onRowSelectionChange: catM.onRowSelectionChange,
		});
	}, [catM.gridMeta, catM.onRowSelectionChange]);

	const lockRows = useMemo(() => {
		return a03.readOnly || !a03.lgId;
	}, [a03.lgId, a03.readOnly]);

	return (
		<DSGContext.Provider value={{ ...catM.gridMeta }}>
			<CatMGrid
				lockRows={lockRows}
				setGridRef={catM.gridMeta.setGridRef}
				columns={catM.gridMeta.columns}
				data={catM.grid.gridData}
				loading={catM.grid.gridLoading}
				height={height - 176}
				onChange={onChange}
				onSelectionChange={onSelectionChange}
				onActiveCellChange={catM.gridMeta.handleActiveCellChange}
				createRow={catM.codeEditor.createRow}
				canCreate={a03.canCreate}
				getRowClassName={catM.gridMeta.getRowClassName}
			/>
			{/* <CatMGrid
				lockRows={a03.readOnly}
				setGridRef={catM.setGridRef}
				lgId={catM.lgId}
				columns={catM.gridMeta.columns}
				data={catM.grid.gridData}
				loading={catM.grid.gridLoading}
				handleChange={catM.codeEditor.buildGridChangeHandler({
					onCreate: catM.handleCreate,
					onUpdate: catM.handleUpdate,
					onDelete: canDelete ? catM.handleConfirmDelete : null,
					onDuplicatedError: catM.handleDuplicatedError,
				})}
				height={height - 176}
				onSelectionChange={catM.gridMeta.buildSelectionChangeHandler({
					onRowSelectionChange: catM.onRowSelectionChange,
				})}
				canCreate={a03.canCreate}
				getRowClassName={catM.gridMeta.getRowClassName}
			/> */}
		</DSGContext.Provider>
	);
};

CatMGridContainer.displayName = "CatMGridContainer";
