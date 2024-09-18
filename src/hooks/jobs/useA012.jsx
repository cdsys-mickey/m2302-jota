import A012 from "@/modules/md-a012";
import ProdGrid from "@/modules/md-prod-grid";
import { useProdGrid } from "../useProdGrid";
import { useAppModule } from "./useAppModule";
import { useDSG } from "../../shared-hooks/dsg/useDSG";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "../../shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "../../shared-components/dsg/columns/option-picker/optionPickerColumn";
import { PkgTypePickerComponentContainer } from "../../components/dsg/columns/pkg-type-picker/PkgTypePickerComponentContainer";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";

export const useA012 = () => {
	const { token } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "A012",
	});

	const grid = useDSG({
		gridId: "A012",
		keyColumn: "ProdID",
		otherColumns: "ProdData,SafeQty,StdCost,bunit,sunit,iunit,munit",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"ProdID",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				disabled: true,
				grow: 2,
				title: "商品代碼",
			},
			{
				...keyColumn("StdCost", createFloatColumn(2)),
				title: "標準成本",
				grow: 1,
				disabled: grid.readOnly,
			},
			{
				...keyColumn("SafeQty", createFloatColumn(2)),
				title: "安全存量",
				grow: 1,
				disabled: grid.readOnly,
			},
			{
				...keyColumn(
					"bunit",
					// pkgTypePickerColumn({
					// 	// name: "bunit",
					// })
					optionPickerColumn(PkgTypePickerComponentContainer, {
						name: "bunit",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: true,
						slotProps: {
							paper: {
								sx: {
									width: 160,
								},
							},
						},
					})
				),
				title: "庫存單位",
				grow: 2,
				disabled: grid.readOnly,
			},
			{
				...keyColumn(
					"sunit",
					// pkgTypePickerColumn({
					// 	// name: "sunit",
					// })
					optionPickerColumn(PkgTypePickerComponentContainer, {
						name: "sunit",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: true,
						slotProps: {
							paper: {
								sx: {
									width: 160,
								},
							},
						},
					})
				),
				title: "銷售單位",
				grow: 2,
				disabled: grid.readOnly,
			},
			{
				...keyColumn(
					"iunit",
					// pkgTypePickerColumn({
					// 	// name: "iunit",
					// })
					optionPickerColumn(PkgTypePickerComponentContainer, {
						name: "iunit",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: true,
						slotProps: {
							paper: {
								sx: {
									width: 160,
								},
							},
						},
					})
				),
				title: "進貨單位",
				grow: 2,
				disabled: grid.readOnly,
			},
			{
				...keyColumn(
					"munit",
					// pkgTypePickerColumn({
					// 	// name: "munit",
					// })
					optionPickerColumn(PkgTypePickerComponentContainer, {
						name: "munit",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						hideControlsOnActive: true,
						slotProps: {
							paper: {
								sx: {
									width: 160,
								},
							},
						},
					})
				),
				title: "BOM單位",
				grow: 2,
				disabled: grid.readOnly,
			},
			{
				...keyColumn(
					"ProdData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				grow: 3,
				disabled: grid.readOnly,
			},
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
		baseUri: "v1/prod/data-grid/A012",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmitting: A012.transformForSubmitting,
		transformForReading: A012.transformForReading,
	});

	return {
		...appModule,
		...prodGrid,
		grid,
		gridMeta
	};
};
