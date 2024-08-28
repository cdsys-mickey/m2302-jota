import ProdGrid from "@/modules/md-prod-grid";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { ProdCatLPickerComponentContainer } from "../../components/dsg/columns/prod-cat-picker/ProdCatLPickerComponentContainer";
import { ProdCatMPickerComponentContainer } from "../../components/dsg/columns/prod-cat-picker/ProdCatMPickerComponentContainer";
import { ProdCatSPickerComponentContainer } from "../../components/dsg/columns/prod-cat-picker/ProdCatSPickerComponentContainer";
import { ProdTypeBPickerComponentContainer } from "../../components/dsg/columns/prod-type-b-picker/ProdTypeBPickerComponentContainer";
import { TaxTypePickerComponentContainer } from "../../components/dsg/columns/tax-type-picker/TaxTypePickerComponentContainer";
import A014 from "../../modules/md-a014";
import { optionPickerColumn } from "../../shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";
import { useDSG } from "../../shared-hooks/dsg/useDSG";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { useProdGrid } from "../useProdGrid";
import { useAppModule } from "./useAppModule";
import { useCallback } from "react";
import { ProdTypeAPickerComponentContainer } from "../../components/dsg/columns/prod-type-a-picker/ProdTypeAPickerComponentContainer";

export const useA014 = () => {
	const appModule = useAppModule({
		moduleId: "A014",
	});

	const grid = useDSG({
		gridId: "A014",
		keyColumn: "ProdID",
		otherColumns: "ProdData,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"ProdData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				grow: 3,
				disabled: true,
			},

			// OLD STYLES
			{
				...keyColumn("catL", {
					...optionPickerColumn(ProdCatLPickerComponentContainer, {
						name: "catL",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: false,
						componentsProps: {
							paper: {
								sx: {
									width: 240,
								},
							},
						},
					}),
					title: "大分類",
					grow: 3,
					disabled: grid.readOnly,
				})
			},
			{
				...keyColumn("catM", {
					...optionPickerColumn(ProdCatMPickerComponentContainer, {
						name: "catM",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: false,
						componentsProps: {
							paper: {
								sx: {
									width: 240,
								},
							},
						},
					})
				})
				,
				title: "中分類",
				grow: 3,
				disabled: grid.readOnly,
			},

			{
				...keyColumn("catS", {
					...optionPickerColumn(ProdCatSPickerComponentContainer, {
						name: "catS",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: false,
						componentsProps: {
							paper: {
								sx: {
									width: 160,
								},
							},
						},
					}
					)
				}),
				title: "小分類",
				grow: 2,
				disabled: grid.readOnly,
			},
			{
				...keyColumn(
					"typeA",
					optionPickerColumn(ProdTypeAPickerComponentContainer, {
						name: "typeA",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: false,
						componentsProps: {
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
				minWidth: 120,
				maxWidth: 120,
			},
			{
				...keyColumn(
					"typeB",
					optionPickerColumn(ProdTypeBPickerComponentContainer, {
						name: "typeB",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: false,
						componentsProps: {
							paper: {
								sx: {
									width: 140,
								},
							},
						},
					})
				),
				disabled: grid.readOnly,
				title: "品類",
				minWidth: 100,
				maxWidth: 100,
			},
			{
				...keyColumn(
					"taxType",
					optionPickerColumn(TaxTypePickerComponentContainer, {
						name: "taxType",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: false,
						componentsProps: {
							paper: {
								sx: {
									width: 120,
								},
							},
						},
					})
				),
				disabled: grid.readOnly,
				title: "稅別",
				minWidth: 120,
				maxWidth: 120,
			},
			// {
			// 	...keyColumn(
			// 		"taxType",
			// 		optionPickerColumn(TaxTypePickerComponent, {
			// 			name: "taxType",
			// 		})
			// 	),
			// 	title: "稅別",
			// 	grow: 2,
			// 	disabled: readOnly,
			// },
		],
		[grid.readOnly]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: grid.gridData,
		lastCell: DSGLastCellBehavior.STOP_EDITING,
		skipDisabled: true
	});


	const prodGrid = useProdGrid({
		grid,
		baseUri: "v1/prod/data-grid/A014",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmitting: A014.transformForSubmitting,
		transformForReading: A014.transformForReading,
	});

	// const handleCreateRow = useCallback(
	// 	() => ({
	// 		catL: null,
	// 		catM: null,
	// 		catS: null,
	// 		typeA: null,
	// 		typeB: null,
	// 		taxType: null,
	// 	}),
	// 	[]
	// );

	const handleGridChange = useCallback(
		(newValue, operations) => {
			const newGridData = [...newValue];
			let checkFailed = false;
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					console.log("dsg.UPDATE");
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const { catL, catM } = rowData;
							const rowIndex = operation.fromRowIndex + i;
							const { catL: oldCatL, catM: oldCatM } = grid.gridData[rowIndex];
							let processedRowData = { ...rowData };
							// process UPDATE here
							if (catL?.LClas !== oldCatL?.LClas) {
								processedRowData["catM"] = null;
								processedRowData["catS"] = null;
							} else if (catM?.MClas !== oldCatM?.MClas) {
								processedRowData["catS"] = null;
							}

							newGridData[rowIndex] = processedRowData;
						});
				} else if (operation.type === "DELETE") {
					console.log("dsg.DELETE");
					checkFailed = grid.gridData
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.some((rowData, i) => {
							// process DELETE check here
							// if(xxxDisabled(rowData)){ return true }
							return false;
						});
				} else if (operation.type === "CREATE") {
					console.log("dsg.CREATE");
					// process CREATE here
					grid.toFirstColumn({ nextRow: true });
				}
			}
			if (!checkFailed) {
				grid.setGridData(newGridData);
			}
		},
		[grid]
	);

	return {
		...appModule,
		...prodGrid,
		...grid,
		grid,
		...gridMeta,
		gridMeta,
		// handleCreateRow,
		handleGridChange
	};
};
