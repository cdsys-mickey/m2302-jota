import { A08Context } from "@/contexts/A08/A08Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import A08Grid from "./A08Grid";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { AreaTypePickerComponentContainer } from "@/components/dsg/columns/area-type-picker/AreaTypePickerComponentContainer";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import A08 from "@/modules/md-a08";
import { useInit } from "@/shared-hooks/useInit";

const A08GridContainer = () => {
	const { height } = useWindowSize();
	const a08 = useContext(A08Context);
	const form = useForm();

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"CodeID",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				disabled: a08.grid.isPersisted,
				title: "代碼",
				minWidth: 60,
				maxWidth: 60
			},
			{
				...keyColumn(
					"areaType",
					optionPickerColumn(AreaTypePickerComponentContainer, {
						name: "areaType",
						disableOpenOnInput: true,
						hideControlsOnActive: true,
						disableClearable: true,
						selectOnFocus: true,
						autoHighlight: true,
					})
				),
				title: "範圍",
				minWidth: 140,
				maxWidth: 140,
				disabled: a08.grid.readOnly,
				grow: 1,
			},
			{
				...keyColumn(
					"CodeData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "客戶區域",
				grow: 4,
				disabled: a08.grid.readOnly,
			},
		],
		[a08.grid.isPersisted, a08.grid.readOnly]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: a08.grid.gridData,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});

	const codeEditor = useDSGCodeEditor({
		baseUri: "v1/sales/customer/areas",
		// token,
		grid: a08.grid,
		gridMeta,
		transformForReading: A08.transformForReading,
		transformForSubmitting: A08.transformForSubmitting,
	});

	useInit(() => {
		codeEditor.load();
	}, []);

	const onChange = useMemo(() => {
		return codeEditor.buildGridChangeHandler({
			onCreate: codeEditor.handleCreate,
			onUpdate: codeEditor.handleUpdate,
			onDelete: a08.canDelete ? codeEditor.handleConfirmDelete : null,
			onDuplicatedError: codeEditor.handleDuplicatedError,
		})
	}, [a08.canDelete, codeEditor]);

	const onSelectionChange = useMemo(() => {
		return gridMeta.buildSelectionChangeHandler()
	}, [gridMeta]);

	return (
		<FormProvider {...form}>
			<DSGContext.Provider value={{
				...a08.grid,
				...gridMeta
			}}>
				<A08Grid
					columns={columns}
					lockRows={a08.grid.readOnly}
					gridRef={gridMeta.setGridRef}
					data={a08.grid.gridData}
					loading={a08.grid.gridLoading}
					height={height - 176}
					onChange={onChange}
					onActiveCellChange={gridMeta.handleActiveCellChange}
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
