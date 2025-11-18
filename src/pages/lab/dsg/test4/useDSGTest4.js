import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";

import { ProdTypeAPickerComponentContainer } from "@/components/dsg/columns/prod-type-a-picker/ProdTypeAPickerComponentContainer";
import { createCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn";
import { createDateInputColumn } from "@/shared-components/dsg/columns/date-input/createDateInputColumn";
import { createDateFieldColumnEx } from "@/shared-components/dsg/columns/date/createDateFieldColumnEx";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";

export const useDSGTest4 = () => {
	const createRow = useCallback(
		() => ({
			id: nanoid(),
			prod: null,
			SProdData: "",
			SExpDate: null,
			typeA: null,
			SExpDate3: null,
			supplier: null,
			stype: null,
			check1: false,
		}),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "id",
		createRow,
	});

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
				minWidth: 130,
				maxWidth: 150,
				disabled: grid.readOnly,
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
						size: "medium",
					})
				),
				minWidth: 48,
				maxWidth: 48,
				disabled: grid.readOnly,
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
				minWidth: 130,
				maxWidth: 150,
				disabled: grid.readOnly,
			},
			// {
			// 	...keyColumn(
			// 		"SExpDate2",
			// 		createMuiDateColumn({
			// 			name: "SExpDate2"
			// 		})
			// 	),
			// 	title: "MuiDate",
			// 	minWidth: 130,
			// 	maxWidth: 150,
			// 	disabled: grid.readOnly
			// },
			{
				...keyColumn(
					"typeA",
					optionPickerColumn(ProdTypeAPickerComponentContainer, {
						name: "typeA",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: false,
						slotProps: {
							paper: {
								sx: {
									width: 160,
								},
							},
						},
					})
				),
				disabled: grid.readOnly,
				title: "品別",
				minWidth: 160,
				maxWidth: 160,
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
				disabled: grid.readOnly,
			},
		],
		[grid.readOnly]
	);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return `${rowData?.id || rowIndex}`;
	}, []);

	const gridMeta = useDSGMeta({
		data: grid.gridData,
		grid: grid,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});

	const handleGridProdChange = useCallback(({ rowData }) => {
		const { prod } = rowData;
		return {
			...rowData,
			["SProdData"]: prod?.ProdData || "",
			["PackData_N"]: prod?.PackData_N || "",
		};
	}, []);

	const onUpdateRow = useCallback(
		({
				fromRowIndex,
				formData,
				newValue,
				setValue,
				gridMeta,
				updateResult,
			}) =>
			async (rowData, index) => {
				const rowIndex = fromRowIndex + index;
				const oldRowData = grid.gridData[rowIndex];
				updateResult.rowIndex = rowIndex;
				console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);
				let processedRowData = {
					...rowData,
				};
				// prod
				if (processedRowData.prod?.ProdID != oldRowData.prod?.ProdID) {
					console.log(
						`prod[${rowIndex}] changed`,
						processedRowData?.prod
					);
					processedRowData = await handleGridProdChange({
						rowData: processedRowData,
						formData,
					});
				}
				return processedRowData;
			},
		[grid.gridData, handleGridProdChange]
	);

	return {
		grid,
		gridMeta,
		createRow,
		getRowKey,
		onUpdateRow,
	};
};
