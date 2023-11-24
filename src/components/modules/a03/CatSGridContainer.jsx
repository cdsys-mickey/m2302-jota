import { CatSContext } from "@/contexts/a03/CatSContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import CatSGrid from "./CatSGrid";
import { A03Context } from "@/contexts/a03/A03Context";

export const CatSGridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const catS = useContext(CatSContext);
	const a03 = useContext(A03Context);

	return (
		<CatSGrid
			lockRows={a03.lockRows}
			gridRef={catS.gridRef}
			setGridRef={catS.setGridRef}
			lgId={catS.lgId}
			mdId={catS.mdId}
			data={catS.gridData}
			loading={catS.loading}
			handleChange={catS.handleGridChange({
				onCreate: catS.handleCreate,
				onUpdate: catS.handleUpdate,
				onDelete: catS.handleConfirmDelete,
				onDuplicatedError: catS.handleDuplicatedError,
			})}
			// handleChange={catS.handleGridChange}
			height={height - 176}
			isPersisted={catS.isPersisted}
			// handleActiveCellChange={catS.handleActiveCellChange}
			handleSelectionChange={catS.handleSelectionChangeBy({
				onRowSelectionChange: catS.handleRowSelectionChange,
			})}
		/>
	);
};

CatSGridContainer.displayName = "CatSGridContainer";
