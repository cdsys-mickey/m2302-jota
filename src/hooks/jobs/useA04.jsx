import { useInit } from "@/shared-hooks/useInit";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useContext } from "react";
import { useAppModule } from "./useAppModule";
import CrudContext from "@/contexts/crud/CrudContext";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";

export const useA04 = () => {
	const { token } = useContext(AuthContext);
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "A04",
	});

	const grid = useDSG({
		gridId: "A04",
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
				title: "櫃位名稱",
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
		baseUri: "v1/prod/counters",
		token,
		grid,
		gridMeta,
	});

	useInit(() => {
		crud.cancelAction();
		codeEditor.load();
	}, []);

	return {
		...crud,
		...appModule,
		grid,
		gridMeta,
		codeEditor,
	};
};
