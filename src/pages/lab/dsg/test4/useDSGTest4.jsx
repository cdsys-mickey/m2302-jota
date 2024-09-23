import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";

import { createDateFnsColumn } from "@/shared-components/dsg/columns/date/createDateFnsColumn";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { nanoid } from "nanoid";
import { useCallback, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { createCheckboxExColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxExColumn";
import { ProdTypeAPickerComponentContainer } from "@/components/dsg/columns/prod-type-a-picker/ProdTypeAPickerComponentContainer";
import { createDateFieldColumnEx } from "@/shared-components/dsg/columns/date/createDateFieldColumnEx";
import { dateFieldColumnEx } from "@/shared-components/dsg/columns/date/dateFieldColumnEx";
import { muiDateColumn } from "@/shared-components/dsg/columns/date/muiDateColumn";
import { createMuiDateColumn } from "@/shared-components/dsg/columns/date/createMuiDateColumn";

export const useDSGTest4 = () => {
	const grid = useDSG({});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						withSalesPackageName: true,
						queryRequired: true,
						filterByServer: true,
						disableOpenOnInput: true,
						hideControlsOnActive: false,
						// pressToFind: true,
						forId: true,
						disableClearable: true,
						fuzzy: true,
						autoHighlight: true,
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
				disabled: grid.readOnly
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
					createCheckboxExColumn({
						size: "medium"
					})
				),
				minWidth: 48,
				maxWidth: 48,
				disabled: grid.readOnly
			},
			{
				...keyColumn(
					"SOrdQty",
					createFloatColumn(2, {
						// enterToNext: true
					})
				),
				title: "數字欄位",
				minWidth: 90,
				maxWidth: 90,
				disabled: grid.readOnly
			},

			{
				...keyColumn(
					"SExpDate",
					// createDateFnsColumn()
					dateFieldColumnEx
				),
				title: "有效日期",
				minWidth: 140,
				maxWidth: 140,
				disabled: grid.readOnly
			},
			// {
			// 	...keyColumn(
			// 		"SExpDate2",
			// 		createMuiDateColumn({
			// 			name: "SExpDate2"
			// 		})
			// 	),
			// 	title: "有效日期2",
			// 	minWidth: 140,
			// 	maxWidth: 140,
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
		],
		[grid.readOnly]
	);



	const gridMeta = useDSGMeta({
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		data: grid.gridData,
	});

	const handleGridProdChange = useCallback(({ rowData }) => {
		const { prod } = rowData;
		return {
			...rowData,
			["SProdData"]: prod?.ProdData || "",
			["PackData_N"]: prod?.PackData_N || "",
		};
	}, []);

	const handleGridChange = useCallback(
		(newValue, operations) => {
			const newGridData = [...newValue];
			let checkFailed = false;
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const rowIndex = operation.fromRowIndex + i;
							const oldRowData = grid.gridData[rowIndex];
							let processedRowData = { ...rowData };
							// 商品
							if (
								rowData.prod?.ProdID !== oldRowData.prod?.ProdID
							) {
								processedRowData = handleGridProdChange({
									rowData: processedRowData,
								});
							}
							newGridData[rowIndex] = processedRowData;
						});
				} else if (operation.type === "DELETE") {
					checkFailed = grid.gridData
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.some((rowData, i) => {
							// process DELETE check here
							return false;
						});
				} else if (operation.type === "CREATE") {
					console.log("dsg.CREATE");
					// process CREATE here
					gridMeta.toFirstColumn({ nextRow: true });
				}
			}
			if (!checkFailed) {
				grid.setGridData(newGridData);
				console.log("newGridData", newGridData);
			}
		},
		[grid, gridMeta, handleGridProdChange]
	);

	const createRow = useCallback(
		() => ({
			id: nanoid(),
			prod: null,
			SProdName: "",
			lastName: "",
			typeA: null,
			SExpDate: null,
		}),
		[]
	);

	return {
		grid,
		gridMeta,
		handleGridChange,
		createRow,
	};
};
