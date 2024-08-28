import { A26Context } from "@/contexts/A26/A26Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A26Grid from "./A26Grid";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";
import { useMemo } from "react";

const A26GridContainer = () => {
	const { height } = useWindowSize();
	const a26 = useContext(A26Context);

	const onChange = useMemo(() => {
		return a26.buildGridChangeHandler({
			onCreate: a26.handleCreate,
			onUpdate: a26.handleUpdate,
			onDelete: a26.canDelete ? a26.handleConfirmDelete : null,
			// onConfirmDelete: handleConfirmDelete,
			onDuplicatedError: a26.handleDuplicatedError,
		})
	}, [a26]);

	const onSelectionChange = useMemo(() => {
		return a26.buildSelectionChangeHandler({
			// onRowSelectionChange: a26.onRowSelectionChange,
		})
	}, [a26]);

	return (
		<DSGContext.Provider value={{
			...a26.grid,
			...a26.gridMeta
		}}>
			<A26Grid
				lockRows={a26.readOnly}
				setGridRef={a26.setGridRef}
				data={a26.gridData}
				loading={a26.gridLoading}
				height={height - 176}
				onChange={onChange}
				onActiveCellChange={a26.handleActiveCellChange}
				onSelectionChange={onSelectionChange}
				canCreate={a26.canCreate}
			/>
		</DSGContext.Provider>
	);
};

A26GridContainer.displayName = "A26GridContainer";

export default A26GridContainer;
