import { AuthContext } from "@/contexts/auth/AuthContext";
import { toastEx } from "@/helpers/toastEx";
import { createCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { nanoid } from "nanoid";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useA16G = () => {
	const { token } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "A16",
	});
	const { httpPatchAsync } = useWebApi();

	const createRow = useCallback(
		() => ({
			id: nanoid(),
			Using_N: "1",
		}),
		[]
	);

	const grid = useDSG({
		gridId: "A16",
		keyColumn: "DeptID",
		otherColumns: "GroupKey,DeptName,AbbrName",
		createRow
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"Using_N",
					createCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
						size: "medium"
					})
				),
				title: "使用中",
				minWidth: 60,
				disabled: grid.readOnly,
			},
			{
				...keyColumn(
					"DeptID",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				disabled: grid.isPersisted,
				title: "門市代碼",
				grow: 2,
			},
			{
				...keyColumn(
					"GroupKey",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "群組",
				grow: 1,
				disabled: grid.readOnly,
			},
			{
				...keyColumn(
					"DeptName",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "門市名稱",
				grow: 4,
				disabled: grid.readOnly,
			},
			{
				...keyColumn(
					"AbbrName",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "簡稱",
				grow: 2,
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
		baseUri: "v1/ou/depts",
		token,
		displayName: "門市代碼",
		querystring: queryString.stringify({
			all: 1,
		}),
		grid,
		gridMeta,
	});

	const { load, reload } = codeEditor;



	const handlePatch = useCallback(
		async ({ rowData }) => {
			const enabled = rowData["Using_N"] === "1";
			try {
				const { status, error } = await httpPatchAsync({
					url: `v1/ou/depts/enabled`,
					bearer: token,
					data: {
						DeptID: rowData["DeptID"],
						Using_N: rowData["Using_N"],
					},
				});
				if (status.success) {
					toastEx.success(
						`${rowData["DeptName"]} 已成功 ${enabled ? "啟用" : "停用"
						}`
					);
				} else {
					throw error || new Error("變更狀態發生錯誤");
				}
			} catch (err) {
				reload();
				toastEx.error("變更狀態失敗", err);
			}
		},
		[httpPatchAsync, reload, token]
	);

	useInit(() => {
		load();
	}, []);

	return {
		...appModule,
		...grid,
		...gridMeta,
		gridMeta,
		...codeEditor,
		createRow,
		handlePatch,
	};
};
