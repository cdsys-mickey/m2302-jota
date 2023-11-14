import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { CatLContext } from "@/contexts/a03/CatLContext";
import CatLGrid from "./CatLGrid";

const CatLGridContainer = () => {
	const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const catL = useContext(CatLContext);

	return (
		<CatLGrid
			ref={dsg.gridRef}
			data={dsg.data}
			loading={dsg.loading}
			handleChange={dsg.handleChange({
				onCreate: catL.handleCreate,
				onUpdate: catL.handleUpdate,
				onDelete: catL.handleConfirmDelete,
				onDuplicatedError: catL.handleDuplicatedError,
			})}
			// handleChange={catL.handleGridChange}
			height={height - 176}
			isPersisted={dsg.isPersisted}
			// handleActiveCellChange={catL.handleActiveCellChange}
			handleSelectionChange={dsg.handleSelectionChangeBy({
				onRowSelectionChange: catL.handleRowSelectionChange,
			})}
			isSelected={catL.isSelected}
		/>
	);
};

CatLGridContainer.displayName = "CatLGridContainer";

export default CatLGridContainer;
