import { A03Context } from "@/contexts/A03/A03Context";
import { CatMGridContext } from "@/contexts/A03/CatMGridContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import CatMGrid from "./CatMGrid";

export const CatMGridContainer = () => {
	const { height } = useWindowSize();
	const catM = useContext(CatMGridContext);
	const a03 = useContext(A03Context);
	const { canDelete } = a03;

	return (
		<CatMGrid
			lockRows={a03.readOnly}
			setGridRef={catM.setGridRef}
			lgId={catM.lgId}
			data={catM.gridData}
			loading={catM.gridLoading}
			handleChange={catM.buildGridChangeHandler({
				onCreate: catM.handleCreate,
				onUpdate: catM.handleUpdate,
				onDelete: canDelete ? catM.handleConfirmDelete : null,
				onDuplicatedError: catM.handleDuplicatedError,
			})}
			height={height - 176}
			isPersisted={catM.isPersisted}
			onSelectionChange={catM.buildSelectionChangeHandler({
				onRowSelectionChange: catM.onRowSelectionChange,
			})}
			canCreate={a03.canCreate}
			getRowClassName={catM.getRowClassName}
		/>
	);
};

CatMGridContainer.displayName = "CatMGridContainer";
