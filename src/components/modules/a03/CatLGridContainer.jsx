import { CatLContext } from "@/contexts/a03/CatLContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { A03Context } from "../../../contexts/a03/A03Context";
import CatLGrid from "./CatLGrid";

export const CatLGridContainer = () => {
	const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const catL = useContext(CatLContext);
	const a03 = useContext(A03Context);

	return (
		<CatLGrid
			lockRows={a03.lockRows}
			gridRef={dsg.gridRef}
			setGridRef={dsg.setGridRef}
			// ref={ref}
			data={dsg.data}
			loading={dsg.loading}
			handleChange={dsg.handleChange({
				onCreate: catL.handleCreate,
				onUpdate: catL.handleUpdate,
				onDelete: catL.handleConfirmDelete,
				onDuplicatedError: catL.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={dsg.isPersisted}
			handleSelectionChange={dsg.handleSelectionChangeBy({
				onRowSelectionChange: catL.handleRowSelectionChange,
			})}
			isSelected={catL.isSelected}
		/>
	);
};

CatLGridContainer.displayName = "CatLGridContainer";
