import { A02Context } from "@/contexts/A02/A02Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A02Grid from "./A02Grid";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

const A02GridContainer = () => {
	const { height } = useWindowSize();
	const a02 = useContext(A02Context);

	const onChange = useMemo(() => {
		return a02.codeEditor.buildGridChangeHandler({
			onCreate: a02.codeEditor.handleCreate,
			onUpdate: a02.codeEditor.handleUpdate,
			onDelete: a02.canDelete ? a02.codeEditor.handleConfirmDelete : null,
			onDuplicatedError: a02.codeEditor.handleDuplicatedError,
		});
	}, [a02]);

	const onSelectionChange = useMemo(() => {
		return a02.gridMeta.buildSelectionChangeHandler();
	}, [a02.gridMeta]);

	return (
		<DSGContext.Provider
			value={{
				...a02.gridMeta,
			}}>
			<A02Grid
				columns={a02.gridMeta.columns}
				lockRows={a02.grid.readOnly}
				gridRef={a02.gridMeta.setGridRef}
				// setGridRef={a02.gridMeta.setGridRef}
				data={a02.grid.gridData}
				height={height - 176}
				loading={a02.grid.gridLoading}
				onChange={onChange}
				onActiveCellChange={a02.gridMeta.handleActiveCellChange}
				onSelectionChange={onSelectionChange}
				canCreate={a02.canCreate}
				createRow={a02.codeEditor.createRow}
			/>
		</DSGContext.Provider>
	);
};

A02GridContainer.displayName = "A02GridContainer";

export default A02GridContainer;
