import { useContext } from "react";
import CatMGrid from "./CatMGrid";
import { CatLContext } from "@/contexts/a03/CatLContext";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { CatMContext } from "../../../contexts/a03/CatMContext";

export const CatMGridContainer = () => {
	const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const catM = useContext(CatMContext);

	return (
		<CatMGrid
			ref={dsg.gridRef}
			lgId={catM.lgId}
			data={dsg.data}
			loading={dsg.loading}
			handleChange={dsg.handleChange({
				onCreate: catM.handleCreate,
				onUpdate: catM.handleUpdate,
				onDelete: catM.handleConfirmDelete,
				onDuplicatedError: catM.handleDuplicatedError,
			})}
			// handleChange={catM.handleGridChange}
			height={height - 176}
			isPersisted={dsg.isPersisted}
			// handleActiveCellChange={catM.handleActiveCellChange}
			// handleSelectionChange={catM.handleSelectionChange}
			handleSelectionChange={dsg.handleSelectionChangeBy({
				onRowSelectionChange: catM.handleRowSelectionChange,
			})}
			// isSelected={catM.isSelected}
			// selectedRowIndex={catM.selectedRowIndex}
		/>
	);
};

CatMGridContainer.displayName = "CatMGridContainer";
