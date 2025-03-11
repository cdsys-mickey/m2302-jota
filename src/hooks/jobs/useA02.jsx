import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useInit } from "@/shared-hooks/useInit";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";

export const useA02 = () => {
	const { token } = useContext(AuthContext);
	const crud = useContext(CrudContext);
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
