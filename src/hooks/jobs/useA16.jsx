import { useInit } from "@/shared-hooks/useInit";
import { useCallback } from "react";
import { useDSGCodeEditor } from "../../shared-hooks/useDSGCodeEditor";
import queryString from "query-string";
import { useWebApi } from "../../shared-hooks/useWebApi";
import { toast } from "react-toastify";
import Errors from "../../shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";

export const useA16 = ({ token }) => {
	const appModule = useAppModule({
		token,
		moduleId: "A16",
	});
	const { httpPatchAsync } = useWebApi();
	const dsgEditor = useDSGCodeEditor({
		token,
		gridId: "A16",
		keyColumn: "DeptID",
		nameColumn: "DeptName",
		otherColumns: "GroupKey,DeptName,AbbrName",
		baseUri: "v1/ou/depts",
		displayName: "門市代碼",
		querystring: queryString.stringify({
			all: 1,
		}),
	});

	const { load, reload } = dsgEditor;

	const handleCreateRow = useCallback(
		() => ({
			Using_N: "1",
		}),
		[]
	);

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
					toast.success(
						`${rowData["DeptName"]} 已成功 ${
							enabled ? "啟用" : "停用"
						}`
					);
				} else {
					throw error || new Error("變更狀態發生錯誤");
				}
			} catch (err) {
				reload();
				toast.error(Errors.getMessage("變更狀態失敗", err));
			}
		},
		[httpPatchAsync, reload, token]
	);

	useInit(() => {
		load();
	}, []);

	return {
		...appModule,
		...dsgEditor,
		handleCreateRow,
		handlePatch,
	};
};