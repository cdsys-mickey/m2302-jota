import { useAppModule } from "@/hooks/jobs/useAppModule";
import A011 from "@/modules/md-a011";
import ProdGrid from "@/modules/ProdGrids.mjs";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { useProdGrid } from "../useProdGrid";

export const useA011 = () => {
	const appModule = useAppModule({
		moduleId: "A011",
	});
	const grid = useDSG({
		gridId: "A011",
		keyColumn: "ProdID",
		otherColumns: "ProdData_N,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
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
				...keyColumn("Price", createFloatColumn(2)),
				title: "建議售價",
				grow: 1,
				disabled: grid.readOnly,
			},
			{
				...keyColumn("PriceA", createFloatColumn(2)),
				title: "售價A",
				grow: 1,
				disabled: grid.readOnly,
			},
			{
				...keyColumn("PriceB", createFloatColumn(2)),
				title: "售價B",
				grow: 1,
				disabled: grid.readOnly,
			},
			{
				...keyColumn("PriceC", createFloatColumn(2)),
				title: "售價C",
				grow: 1,
				disabled: grid.readOnly,
			},
			{
				...keyColumn("PriceD", createFloatColumn(2)),
				title: "售價D",
				grow: 1,
				disabled: grid.readOnly,
			},
			{
				...keyColumn("PriceE", createFloatColumn(2)),
				title: "售價E",
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
		baseUri: "v1/prod/data-grid/A011",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmitting: A011.transformForSubmitting,
		transformForReading: A011.transformForReading,
	});

	return {
		...appModule,
		...prodGrid,
		...grid,
		...gridMeta,
		gridMeta,
	};
};
