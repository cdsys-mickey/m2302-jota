import ProdGrid from "@/modules/ProdGrids.mjs";
import A013 from "@/modules/A013.mjs";
import { useProdGrid } from "../useProdGrid";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";

export const useA013 = () => {
	const appModule = useAppModule({
		moduleId: "A013",
	});
	const grid = useDSG({
		gridId: "A013",
		keyColumn: "ProdID",
		otherColumns: "ProdData,SRate,IRate,MRate",
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
					"ProdData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				grow: 4,
				disabled: grid.readOnly,
			},
			{
				...keyColumn("SRate", createFloatColumn(4)),
				title: "銷/存",
				grow: 1,
				disabled: grid.readOnly,
			},
			{
				...keyColumn("IRate", createFloatColumn(4)),
				title: "進/存",
				grow: 1,
				disabled: grid.readOnly,
			},
			{
				...keyColumn("MRate", createFloatColumn(4)),
				title: "BOM/存",
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
		baseUri: "v1/prod/data-grid/A013",
		transformAsQueryParams: ProdGrid.transformAsQueryParams,
		transformForSubmitting: A013.transformForSubmitting,
		transformForReading: A013.transformForReading,
	});

	return {
		...appModule,
		...prodGrid,
		...grid,
		...gridMeta,
		gridMeta,
	};
};
