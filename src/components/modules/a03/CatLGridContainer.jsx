import { CatLContext } from "@/contexts/A03/CatLContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { A03Context } from "@/contexts/A03/A03Context";
import CatLGrid from "./CatLGrid";

export const CatLGridContainer = () => {
	// const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const catL = useContext(CatLContext);
	const a03 = useContext(A03Context);

	return (
		<CatLGrid
			lockRows={a03.lockRows}
			gridRef={catL.gridRef}
			setGridRef={catL.setGridRef}
			// ref={ref}
			data={catL.gridData}
			loading={catL.gridLoading}
			handleChange={catL.handleGridChange({
				onCreate: catL.handleCreate,
				onUpdate: catL.handleUpdate,
				onDelete: catL.handleConfirmDelete,
				onDuplicatedError: catL.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={catL.isPersisted}
			handleSelectionChange={catL.handleSelectionChangeBy({
				onRowSelectionChange: catL.handleRowSelectionChange,
			})}
			isSelected={catL.isSelected}
		/>
	);
};

CatLGridContainer.displayName = "CatLGridContainer";
