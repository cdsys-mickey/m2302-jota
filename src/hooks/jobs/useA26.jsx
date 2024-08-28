import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useAppModule } from "./useAppModule";
import { useDSG } from "../../shared-hooks/dsg/useDSG";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "../../shared-components/dsg/columns/float/createFloatColumn";
import { useMemo } from "react";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";

export const useA26 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A26",
	});
	const grid = useDSG({
		gridId: "A26",
		keyColumn: "CodeID",
		otherColumns: "CodeData,Other1",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"CodeID",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				minWidth: 70,
				title: "代碼",
				disabled: grid.isPersisted,
			},
			{
				...keyColumn(
					"CodeData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "佣金類別",
				grow: 5,
				disabled: grid.readOnly,
			},
			{
				...keyColumn("Other1", createFloatColumn(1)),
				title: "佣金比例",
				minWidth: 120,
				disabled: grid.readOnly,
			},
		],
		[grid.isPersisted, grid.readOnly]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: grid.gridData,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});

	const codeEditor = useDSGCodeEditor({
		baseUri: "v1/prod/cms-types",
		token,
		grid,
		gridMeta
	});

	useInit(() => {
		codeEditor.load();
	}, []);

	return {
		...appModule,
		...codeEditor,
		...grid,
		...gridMeta,
		...codeEditor,
		grid,
		gridMeta,
	};
};
