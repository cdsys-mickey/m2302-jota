import { useContext } from "react";
import DsgTest4Grid from "./DsgTest4Grid";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { DSGTest4Context } from "./test4/DSGTest4Context";
import { useInit } from "@/shared-hooks/useInit";
import { FormProvider, useForm } from "react-hook-form";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdTypeAPickerComponentContainer } from "@/components/dsg/columns/prod-type-a-picker/ProdTypeAPickerComponentContainer";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { useMemo } from "react";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn";
import { createDateFieldColumnEx } from "@/shared-components/dsg/columns/date/createDateFieldColumnEx";
import { createDateInputColumn } from "@/shared-components/dsg/columns/date-input/createDateInputColumn";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { SupplierPickerComponentContainer } from "@/components/dsg/columns/supplier-picker/SupplierPickerComponentContainer";
import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";

export const DsgTest4GridContainer = () => {
	const dsgTest4 = useContext(DSGTest4Context);
	const form = useForm();
	const { height } = useWindowSize();



	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						packageType: "s",
						// queryRequired: true,
						// filterByServer: true,
						// disableOpenOnInput: true,
						// hideControlsOnActive: false,
						// pressToFind: true,
						forId: true,
						disableClearable: true,
						// autoHighlight: true,
						selectOnFocus: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
					})
				),
				title: "商品",
				minWidth: 170,
				maxWidth: 170,
				disabled: dsgTest4.grid.readOnly
			},
			{
				...keyColumn(
					"SProdData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "商品名稱",
				disabled: true,
				grow: 2,
			},
			// {
			// 	...keyColumn(
			// 		"PackData_N",
			// 		createTextColumnEx({
			// 			continuousUpdates: false,
			// 		})
			// 	),
			// 	title: "包裝單位",
			// 	disabled: true,
			// 	minWidth: 90,
			// 	maxWidth: 90,
			// },
			{
				...keyColumn(
					"check1",
					createCheckboxColumn({
						size: "medium"
					})
				),
				minWidth: 48,
				maxWidth: 48,
				disabled: dsgTest4.grid.readOnly
			},
			// {
			// 	...keyColumn(
			// 		"SOrdQty",
			// 		createFloatColumn(2, {
			// 			// enterToNext: true
			// 		})
			// 	),
			// 	title: "數字欄位",
			// 	minWidth: 90,
			// 	maxWidth: 90,
			// 	disabled: grid.readOnly
			// },

			{
				...keyColumn(
					"SExpDate",
					// createDateFnsColumn()
					//dateFieldColumnEx
					createDateFieldColumnEx({
						validate: true,
						// required: true
					})
				),
				title: "DateField",
				minWidth: 140,
				maxWidth: 140,
				disabled: dsgTest4.grid.readOnly
			},
			{
				...keyColumn(
					"supplier",
					optionPickerColumn(SupplierPickerComponentContainer, {
						name: "supplier",
						selectOnFocus: true,
						forId: true,
						disableClearable: true,
						autoHighlight: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
					})
				),
				title: "供應商",
				minWidth: 120,
				maxWidth: 120,
				disabled: dsgTest4.grid.readOnly,
			},
			{
				...keyColumn(
					"stype",
					optionPickerColumn(FreeProdTypePickerComponentContainer, {
						name: "stype",
						disableClearable: true,
						disableOpenOnInput: true,
						autoHighlight: true,
						selectOnFocus: true,
						// forcePopupIcon: false
					})
				),
				title: "試贈樣",
				minWidth: 70,
				maxWidth: 70,
				disabled: dsgTest4.grid.readOnly,
			},
			{
				...keyColumn(
					"typeA",
					optionPickerColumn(ProdTypeAPickerComponentContainer, {
						name: "typeA",
						disableClearable: true,
						disableOpenOnInput: true,
						autoHighlight: true,
						selectOnFocus: true,
					})
				),
				title: "品別",
				minWidth: 160,
				maxWidth: 160,
				disabled: dsgTest4.grid.readOnly,
			},

			{
				...keyColumn(
					"SExpDate3",
					createDateInputColumn({
						// required: true,
						// requiredMessage: "有效日期為必填"
					})
				),
				title: "DateInput",
				minWidth: 110,
				maxWidth: 110,
				disabled: dsgTest4.grid.readOnly
			},

		],
		[dsgTest4.grid.readOnly]
	);

	const gridMeta = useDSGMeta({
		data: dsgTest4.grid.gridData,
		grid: dsgTest4.grid,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});

	const onChange = useMemo(() => {
		return dsgTest4.grid.buildGridChangeHandler({
			gridMeta: gridMeta,
			onUpdateRow: dsgTest4.onUpdateRow
		});
	}, [dsgTest4, gridMeta]);

	useInit(() => {
		const data = dsgTest4.grid.fillRows({
			createRow: dsgTest4.createRow,
			length: 9,
		});
		console.log("data", data);

		dsgTest4.grid.initGridData(data);
	}, []);

	return (
		<DSGContext.Provider
			value={{
				...dsgTest4.grid,
				...gridMeta,
			}}>
			<FormProvider {...form}>
				<DsgTest4Grid
					value={dsgTest4.grid.gridData}
					columns={gridMeta.columns}
					height={height - 260}
					getRowKey={dsgTest4.getRowKey}
					gridRef={gridMeta.setGridRef}
					onActiveCellChange={gridMeta.handleActiveCellChange}
					onChange={onChange}
					// getNextCell={dsg.getNextCell}
					// nextCell={dsg.nextCell}
					createRow={dsgTest4.createRow}
				/>
			</FormProvider>
		</DSGContext.Provider>
	);
};

DsgTest4GridContainer.displayName = "DsgTest4GridContainer";
