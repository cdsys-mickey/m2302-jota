import { P16Context } from "@/contexts/P16/P16Context";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import P16Grid from "./P16Grid";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import P16 from "@/modules/md-p16";
import { useInit } from "@/shared-hooks/useInit";
import { DeptPickerComponentContainer } from "@/components/dsg/columns/dept-picker/DeptPickerComponentContainer";

const P16GridContainer = () => {
	const { height } = useWindowSize();
	const p16 = useContext(P16Context);
	const form = useForm();

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"PosNo",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				disabled: p16.grid.isPersisted,
				title: "代碼",
				minWidth: 90,
				maxWidth: 90
			},
			{
				...keyColumn(
					"dept",
					optionPickerColumn(DeptPickerComponentContainer, {
						name: "dept",
						disableOpenOnInput: true,
						// hideControlsOnActive: true,
						disableClearable: true,
						selectOnFocus: true,
						autoHighlight: true,
					})
				),
				title: "門市",
				minWidth: 220,
				maxWidth: 220,
				disabled: p16.grid.readOnly,
				grow: 1,
			},
			{
				...keyColumn(
					"Remark",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "備註",
				grow: 4,
				disabled: p16.grid.readOnly,
			},
		],
		[p16.grid.isPersisted, p16.grid.readOnly]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: p16.grid.gridData,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});

	const codeEditor = useDSGCodeEditor({
		baseUri: "v1/pos/terminals",
		grid: p16.grid,
		gridMeta,
		transformForReading: P16.transformForReading,
		transformForSubmitting: P16.transformForSubmitting,
	});

	useInit(() => {
		codeEditor.load();
	}, []);

	const onChange = useMemo(() => {
		return codeEditor.buildGridChangeHandler({
			onCreate: codeEditor.handleCreate,
			onUpdate: codeEditor.handleUpdate,
			onDelete: p16.canDelete ? codeEditor.handleConfirmDelete : null,
			onDuplicatedError: codeEditor.handleDuplicatedError,
		})
	}, [p16.canDelete, codeEditor]);

	const onSelectionChange = useMemo(() => {
		return gridMeta.buildSelectionChangeHandler()
	}, [gridMeta]);

	return (
		<FormProvider {...form}>
			<DSGContext.Provider value={{
				...p16.grid,
				...gridMeta
			}}>
				<P16Grid
					columns={columns}
					lockRows={p16.grid.readOnly}
					gridRef={gridMeta.setGridRef}
					data={p16.grid.gridData}
					loading={p16.grid.gridLoading}
					height={height - 176}
					onChange={onChange}
					onActiveCellChange={gridMeta.handleActiveCellChange}
					onSelectionChange={onSelectionChange}
					// isPersisted={p16.isPersisted}
					canCreate={p16.canCreate}
				/>
			</DSGContext.Provider>
		</FormProvider>
	);
};

P16GridContainer.displayName = "P16GridContainer";

export default P16GridContainer;

