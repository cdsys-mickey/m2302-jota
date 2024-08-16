import { A08Context } from "@/contexts/A08/A08Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A08Grid from "./A08Grid";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

const A08GridContainer = () => {
	const { height } = useWindowSize();
	const a08 = useContext(A08Context);
	const form = useForm();

	const onChange = useMemo(() => {
		return a08.codeEditor.buildGridChangeHandler({
			onCreate: a08.codeEditor.handleCreate,
			onUpdate: a08.codeEditor.handleUpdate,
			onDelete: a08.canDelete ? a08.codeEditor.handleConfirmDelete : null,
			onDuplicatedError: a08.codeEditor.handleDuplicatedError,
		})
	}, [a08]);

	const onSelectionChange = useMemo(() => {
		return a08.gridMeta.buildSelectionChangeHandler()
	}, [a08]);

	return (
		<FormProvider {...form}>
			<DSGContext.Provider value={{ ...a08.gridMeta }}>
				<A08Grid
					columns={a08.gridMeta.columns}
					lockRows={a08.grid.readOnly}
					gridRef={a08.gridMeta.setGridRef}
					data={a08.grid.gridData}
					loading={a08.grid.gridLoading}
					height={height - 176}
					onChange={onChange}
					onActiveCellChange={a08.gridMeta.handleActiveCellChange}
					onSelectionChange={onSelectionChange}
					// isPersisted={a08.isPersisted}
					canCreate={a08.canCreate}
				/>
			</DSGContext.Provider>
		</FormProvider>
	);
};

A08GridContainer.displayName = "A08GridContainer";

export default A08GridContainer;
