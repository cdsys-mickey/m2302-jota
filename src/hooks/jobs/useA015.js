import ProdGrid from "@/modules/ProdGrids.mjs";
import { useProdGrid } from "../useProdGrid";
import A015 from "@/modules/md-a015";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";

export const useA015 = () => {
	const appModule = useAppModule({
		moduleId: "A015",
	});

	const grid = useDSG({
		gridId: "A015",
		keyColumn: "ProdID",
		otherColumns: "ProdData,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
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
				grow: 1,
				title: "商品代碼",
				disabled: true,
			},
			{
				...keyColumn(
					"PackData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "包裝單位",
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn(
					"ProdData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				grow: 4,
				disabled: true,
			},

			{
				...keyColumn("SafeQty", createFloatColumn(2)),
				title: "安全存量",
				grow: 1,
				disabled: grid.readOnly,
			},
		],
		[grid.readOnly]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: grid.gridData,
		lastCell: DSGLastCellBehavior.STOP_EDITING,
		skipDisabled: true,
	});

	const prodGrid = useProdGrid({
		grid,
		baseUri: "v1/prod/data-grid/A015",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmitting: A015.transformForSubmitting,
		transformForReading: A015.transformForReading,
	});

	return {
		...appModule,
		...prodGrid,
		...grid,
		...gridMeta,
		gridMeta,
	};
};
