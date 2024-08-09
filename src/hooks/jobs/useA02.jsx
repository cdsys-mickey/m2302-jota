import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useAppModule } from "./useAppModule";
import { useMemo } from "react";
import { createTextColumn, keyColumn } from "react-datasheet-grid";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";
import { useDSG } from "../../shared-hooks/dsg/useDSG";

export const useA02 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A02",
	});
	const grid = useDSG({
		gridId: "A02",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
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
				disabled: grid.isPersisted,
				title: "代碼",
			},
			{
				...keyColumn(
					"CodeData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "包裝名稱",
				grow: 4,
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
		baseUri: "v1/prod/pkg-types",
		token,
		grid,
		gridMeta,
	});

	useInit(() => {
		codeEditor.load();
	}, []);

	return {
		...appModule,
		grid,
		gridMeta,
		codeEditor,
	};
};
