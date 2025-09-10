import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import P32Grid from "./P32Grid";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { P32Context } from "./P32Context";
import { FormProvider, useForm } from "react-hook-form";
import { SharedOptionsProvider } from "@/shared-components/option-picker/SharedOptionsProvider";

const P32GridContainer = () => {
	const { height } = useWindowSize();
	const p32 = useContext(P32Context);
	const form = useForm();

	const onChange = useMemo(() => {
		return p32.codeEditor.buildGridChangeHandler({
			onCreate: p32.codeEditor.handleCreate,
			onUpdate: p32.codeEditor.handleUpdate,
			onDelete: p32.canDelete ? p32.codeEditor.handleConfirmDelete : null,
			onDuplicatedError: p32.codeEditor.handleDuplicatedError,
		});
	}, [p32]);

	const onSelectionChange = useMemo(() => {
		return p32.gridMeta.buildSelectionChangeHandler();
	}, [p32.gridMeta]);

	const _height = useMemo(() => {
		return p32.grid.readOnly ? height - 176 : height - 156;
	}, [height, p32.grid.readOnly])

	return (
		<FormProvider {...form}>

			<DSGContext.Provider
				value={{
					...p32.grid,
					...p32.gridMeta,
				}}>
				<P32Grid
					// columns={p32.gridMeta.columns}
					lockRows={p32.grid.readOnly}
					gridRef={p32.gridMeta.setGridRef}
					data={p32.grid.gridData}
					height={_height}
					loading={p32.grid.gridLoading}
					onChange={onChange}
					onActiveCellChange={p32.gridMeta.handleActiveCellChange}
					onSelectionChange={onSelectionChange}
					canCreate={p32.canCreate}
					createRow={p32.codeEditor.createRow}
				/>
			</DSGContext.Provider>
		</FormProvider>
	);
};

P32GridContainer.displayName = "P32GridContainer";

export default P32GridContainer;



