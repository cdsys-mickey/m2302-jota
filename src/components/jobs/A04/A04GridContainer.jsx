import { A04Context } from "@/contexts/A04/A04Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A04Grid from "./A04Grid";
import { useMemo } from "react";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

const A04GridContainer = () => {
	const { height } = useWindowSize();
	const a04 = useContext(A04Context);
	const formMeta = useContext(FormMetaContext);

	const onChange = useMemo(() => {
		return a04.buildGridChangeHandler({
			onCreate: a04.handleCreate,
			onUpdate: a04.handleUpdate,
			onDelete: a04.canDelete ? a04.handleConfirmDelete : null,
			onDuplicatedError: a04.handleDuplicatedError,
		});
	}, [a04]);

	const onSelectionChange = useMemo(() => {
		return a04.buildSelectionChangeHandler();
	}, [a04]);

	return (
		<DSGContext.Provider
			value={{
				...a04.gridMeta,
			}}>
			<A04Grid
				columns={a04.columns}
				lockRows={a04.readOnly}
				gridRef={a04.setGridRef}
				data={a04.gridData}
				loading={a04.gridLoading}
				height={height - 176}
				onChange={onChange}
				onActiveCellChange={a04.handleActiveCellChange}
				onSelectionChange={onSelectionChange}
				canCreate={a04.canCreate}
				createRow={a04.createRow}
			// isPersisted={a04.isPersisted}
			// getRowClassName={a04.getRowClassName}
			/>
		</DSGContext.Provider>
	);
};

A04GridContainer.displayName = "A04GridContainer";

export default A04GridContainer;
