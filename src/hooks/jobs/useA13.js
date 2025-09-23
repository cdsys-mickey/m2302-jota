import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useDSG } from "../../shared-hooks/dsg/useDSG";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";

export const useA13 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A13",
	});
	const grid = useDSG({
		gridId: "A13",
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
						maxLength: 3
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
				title: "生產線別",
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
		baseUri: "v1/prod/pdlines",
		token,
		grid,
		gridMeta
	});

	useInit(() => {
		codeEditor.load();
	}, []);

	return {
		...appModule,
		...grid,
		gridMeta,
		...gridMeta,
		...codeEditor,
	};
};
