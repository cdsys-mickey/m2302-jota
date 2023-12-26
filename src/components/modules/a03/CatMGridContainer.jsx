import { A03Context } from "@/contexts/A03/A03Context";
import { CatMContext } from "@/contexts/A03/CatMContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import CatMGrid from "./CatMGrid";

export const CatMGridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const catM = useContext(CatMContext);
	const a03 = useContext(A03Context);

	return (
		<CatMGrid
			lockRows={a03.lockRows}
			setGridRef={catM.setGridRef}
			lgId={catM.lgId}
			data={catM.gridData}
			loading={catM.loading}
			handleChange={catM.handleGridChange({
				onCreate: catM.handleCreate,
				onUpdate: catM.handleUpdate,
				onDelete: catM.handleConfirmDelete,
				onDuplicatedError: catM.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={catM.isPersisted}
			handleSelectionChange={catM.handleSelectionChangeBy({
				onRowSelectionChange: catM.handleRowSelectionChange,
			})}
		/>
	);
};

CatMGridContainer.displayName = "CatMGridContainer";
