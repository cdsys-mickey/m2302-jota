import { CatSGridContext } from "@/contexts/A03/CatSGridContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import CatSGrid from "./CatSGrid";
import { A03Context } from "@/contexts/A03/A03Context";

export const CatSGridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const catS = useContext(CatSGridContext);
	const a03 = useContext(A03Context);
	const { canDelete } = a03;

	return (
		<CatSGrid
			lockRows={a03.readOnly}
			gridRef={catS.gridRef}
			setGridRef={catS.setGridRef}
			lgId={catS.lgId}
			mdId={catS.mdId}
			data={catS.gridData}
			loading={catS.gridLoading}
			handleChange={catS.buildGridChangeHandler({
				onCreate: catS.handleCreate,
				onUpdate: catS.handleUpdate,
				onDelete: canDelete ? catS.handleConfirmDelete : null,
				onDuplicatedError: catS.handleDuplicatedError,
			})}
			// handleChange={catS.handleGridChange}
			height={height - 176}
			isPersisted={catS.isPersisted}
			// handleActiveCellChange={catS.handleActiveCellChange}
			onSelectionChange={catS.handleSelectionChange({
				onRowSelectionChange: catS.onRowSelectionChange,
			})}
			canCreate={a03.canCreate}
			getRowClassName={catS.getRowClassName}
		/>
	);
};

CatSGridContainer.displayName = "CatSGridContainer";
