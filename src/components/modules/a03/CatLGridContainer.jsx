import { CatLGridContext } from "@/contexts/A03/CatLGridContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { A03Context } from "@/contexts/A03/A03Context";
import CatLGrid from "./CatLGrid";

export const CatLGridContainer = () => {
	const { height } = useWindowSize();
	const catL = useContext(CatLGridContext);
	const a03 = useContext(A03Context);
	const { canDelete } = a03;

	return (
		<CatLGrid
			lockRows={a03.readOnly}
			gridRef={catL.gridRef}
			setGridRef={catL.setGridRef}
			// ref={ref}
			data={catL.gridData}
			loading={catL.gridLoading}
			handleChange={catL.handleGridChange({
				onCreate: catL.handleCreate,
				onUpdate: catL.handleUpdate,
				onDelete: canDelete ? catL.handleConfirmDelete : null,
				onDuplicatedError: catL.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={catL.isPersisted}
			onSelectionChange={catL.handleSelectionChange({
				onRowSelectionChange: catL.onRowSelectionChange,
			})}
			// isSelected={catL.isSelected}
			canCreate={a03.canCreate}
			getRowClassName={catL.getRowClassName}
		/>
	);
};

CatLGridContainer.displayName = "CatLGridContainer";
