import { A03Context } from "@/contexts/a03/A03Context";
import { CatMContext } from "@/contexts/a03/CatMContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import CatMGrid from "./CatMGrid";

export const CatMGridContainer = () => {
	const dsg = useContext(DSGContext);
	const { height } = useWindowSize();
	const catM = useContext(CatMContext);
	const a03 = useContext(A03Context);

	return (
		<CatMGrid
			lockRows={a03.lockRows}
			setGridRef={dsg.setGridRef}
			lgId={catM.lgId}
			data={dsg.data}
			loading={dsg.loading}
			handleChange={dsg.handleChange({
				onCreate: catM.handleCreate,
				onUpdate: catM.handleUpdate,
				onDelete: catM.handleConfirmDelete,
				onDuplicatedError: catM.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={dsg.isPersisted}
			handleSelectionChange={dsg.handleSelectionChangeBy({
				onRowSelectionChange: catM.handleRowSelectionChange,
			})}
		/>
	);
};

CatMGridContainer.displayName = "CatMGridContainer";
