import { useCallback } from "react";
import { useWebApi } from "./useWebApi";
import { useDSG } from "./useDSG";
import { useContext } from "react";
import { DialogsContext } from "../shared-contexts/dialog/DialogsContext";
import { toast } from "react-toastify";
import QueryString from "query-string";

export const useWebApiDSG = ({
	token,
	gridId,
	keyColumn,
	otherColumns,
	initialLockRows = true,
	baseUri,
	displayName = "代碼",
	queryString,
}) => {
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();

	const dsg = useDSG({ gridId, keyColumn, otherColumns, initialLockRows });
	const dialogs = useContext(DialogsContext);

	const load = useCallback(
		async ({ supressLoading = false } = {}) => {
			if (!supressLoading) {
				dsg.setGridLoading(true);
			}
			try {
				const { status, payload } = await httpGetAsync({
					url: baseUri,
					bearer: token,
					...(queryString && {
						data: QueryString.parse(queryString),
					}),
				});
				if (status.success) {
					dsg.handleGridDataLoaded(payload.data || []);
				} else {
					switch (status.code) {
						default:
							toast.error(`發生未預期例外 ${status.code}`);
							break;
					}
				}
			} catch (err) {
				console.error("load", err);
			} finally {
				dsg.setGridLoading(false);
			}
		},
		[baseUri, dsg, httpGetAsync, queryString, token]
	);

	const reload = useCallback(() => {
		load({ supressLoading: true });
	}, [load]);

	const handleCreate = useCallback(
		async ({ rowData }, newValue) => {
			console.log(`CREATE`, rowData);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: baseUri,
					bearer: token,
					data: rowData,
				});
				console.log("handleCreate response.payload", payload);
				if (status.success) {
					dsg.commitChanges(newValue);
					toast.success(
						`${displayName} ${rowData[keyColumn]} 新增成功`
					);
				} else {
					throw error?.message || new Error("新增失敗");
				}
			} catch (err) {
				toast.error(`新增${displayName}發生例外: ${err.message}`);
				reload();
			}
		},
		[baseUri, displayName, dsg, httpPostAsync, keyColumn, reload, token]
	);

	const handleUpdate = useCallback(
		async ({ rowData }, newValue) => {
			console.log(`UPDATE`, rowData);
			try {
				const { status, payload, error } = await httpPutAsync({
					url: baseUri,
					data: rowData,
					bearer: token,
				});
				console.log("handleCreate response.payload", payload);
				if (status.success) {
					dsg.commitChanges(newValue);
					toast.success(
						`${displayName} ${rowData[keyColumn]}/${rowData.CodeData} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toast.error(`修改${displayName}發生例外: ${err.message}`);
				reload();
			}
		},
		[baseUri, displayName, dsg, httpPutAsync, keyColumn, reload, token]
	);

	const handleDelete = useCallback(
		async ({ rowData }) => {
			console.log(`DELETE`, rowData);
			try {
				const key = rowData[keyColumn];
				const { status, error } = await httpDeleteAsync({
					url: `${baseUri}/${key}`,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`${displayName} ${rowData[keyColumn]} 刪除成功`
					);
				} else {
					throw error?.message || new Error("刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除${displayName}發生例外: ${err.message}`);
			} finally {
				dsg.setDeletingRow(null);
				dialogs.closeLatest();
				reload();
			}
		},
		[
			baseUri,
			dialogs,
			displayName,
			dsg,
			httpDeleteAsync,
			keyColumn,
			reload,
			token,
		]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			const { rowData } = row;
			console.log(`confirm DELETE`, rowData);
			dsg.setDeletingRow(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除${displayName} ${rowData[keyColumn]}?`,
				onConfirm: () => {
					handleDelete(row);
				},
				onCancel: () => {
					dsg.setDeletingRow(null);
					dsg.rollbackChanges();
					dialogs.closeLatest();
				},
			});
		},
		[dialogs, displayName, dsg, handleDelete, keyColumn]
	);

	const handleDuplicatedError = useCallback(
		(row, newValue) => {
			toast.error(`${displayName} ${row.rowData[keyColumn]} 已存在`);

			dsg.rewriteRowValue(row, newValue, {
				[keyColumn]: "",
			});
			setTimeout(() => {
				dsg.setActiveCell({ row: row.rowIndex, col: 0 });
			}, 0);
		},
		[displayName, dsg, keyColumn]
	);

	const onRowSelectionChange = useCallback(
		({ rowIndex, rowData }) => {
			console.log(`${dsg.gridId}[${rowIndex}] selected, data:`, rowData);
		},
		[dsg.gridId]
	);

	return {
		load,
		// handleGridChange,
		handleCreate,
		handleUpdate,
		handleConfirmDelete,
		handleDelete,
		handleDuplicatedError,
		onRowSelectionChange,
		...dsg,
	};
};
