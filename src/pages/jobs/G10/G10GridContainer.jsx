import { G10Context } from "@/pages/jobs/G10/G10Context";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm } from "react-hook-form";
import G10DocPickerCell from "./G10DocPickerCell/G10DocPickerCell";
import G10Grid from "./G10Grid";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";

const G10GridContainer = () => {
	const { height } = useWindowSize();
	const g10 = useContext(G10Context);
	const form = useForm();

	const columns = useMemo(
		() => [

			{
				...keyColumn(
					"doc",
					// optionPickerColumn(G10DocPickerCellContainer, {
					optionPickerColumn(G10DocPickerCell, {
						name: "doc",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						autoHighlight: true,
						forId: true,
						slotProps: {
							paper: {
								sx: {
									width: 340,
								},
							},
						},
					})
				),
				title: "單號",
				minWidth: 160,
				maxWidth: 160,
				disabled: g10.grid.readOnly,
			},
			{
				...keyColumn(
					"DocType",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "類型",
				disabled: true,
			},
			{
				...keyColumn(
					"DocDate_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "單據日期",
				disabled: true,
			},
			{
				...keyColumn(
					"CustID_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "客戶編號",
				disabled: true,
			},
			{
				...keyColumn(
					"CustName_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "客戶名稱",
				disabled: true,
			},
			{
				...keyColumn("Amt_N", createFloatColumn(2)),
				title: "應收金額",
				disabled: true,
			},

		],
		[g10.grid.readOnly]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: g10.grid.gridData,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		defaultCell: {
			col: 0,
			row: 0
		}
	});



	const onSelectionChange = useMemo(() => {
		return gridMeta.buildSelectionChangeHandler()
	}, [gridMeta]);

	const onChange = useMemo(() => {
		return g10.grid.buildGridChangeHandler({ gridMeta, onUpdateRow: g10.onUpdateRow })
	}, [g10.grid, g10.onUpdateRow, gridMeta])

	const _height = useMemo(() => {
		return height - 204
	}, [height]);

	useInit(() => {
		g10.load();
		// gridMeta.setActiveCell({ col: 0, row: 0 });
	}, []);

	return (
		<FormProvider {...form}>
			<DSGContext.Provider value={{
				...g10.grid,
				...gridMeta
			}}>
				<G10Grid
					columns={columns}
					lockRows={g10.grid.readOnly}
					gridRef={gridMeta.setGridRef}
					data={g10.grid.gridData}
					loading={g10.grid.gridLoading}
					height={_height}
					onChange={onChange}
					onActiveCellChange={gridMeta.handleActiveCellChange}
					onSelectionChange={onSelectionChange}
					// isPersisted={g10.isPersisted}
					canCreate={g10.canCreate}
				/>
			</DSGContext.Provider>
		</FormProvider>
	);
};

G10GridContainer.displayName = "G10GridContainer";

export default G10GridContainer;






