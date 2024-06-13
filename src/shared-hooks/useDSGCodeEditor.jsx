import { useCallback } from "react";
import { useWebApi } from "./useWebApi";
import { useDSG } from "./useDSG";
import { useContext } from "react";
import { DialogsContext } from "../shared-contexts/dialog/DialogsContext";
import { toast } from "react-toastify";
import queryString from "query-string";

const defaultTransformForReading = (payload) => {
	return payload?.data || [];
};

const defaultTransformForSubmmit = (payload) => {
	return payload;
};

export const useDSGCodeEditor = ({
	token,
	gridId,
	keyColumn = "CodeID",
	nameColumn = "CodeData",
	otherColumns,
	initialLockRows = true,
	baseUri,
	displayName = "代碼",
	querystring,
	transformForReading = defaultTransformForReading,
	transformForSubmitting = defaultTransformForSubmmit,
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
					...(querystring && {
						params: queryString.parse(querystring),
					}),
				});
				if (status.success) {
					dsg.handleGridDataLoaded(transformForReading(payload));
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
		[baseUri, dsg, httpGetAsync, querystring, token, transformForReading]
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
					data: transformForSubmitting(rowData),
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
		[
			baseUri,
			displayName,
			dsg,
			httpPostAsync,
			keyColumn,
			reload,
			token,
			transformForSubmitting,
		]
	);

	const handleUpdate = useCallback(
		async ({ rowData }, newValue) => {
			console.log(`UPDATE`, rowData);
			try {
				const { status, payload, error } = await httpPutAsync({
					url: baseUri,
					data: transformForSubmitting(rowData),
					bearer: token,
				});
				console.log("handleCreate response.payload", payload);
				if (status.success) {
					dsg.commitChanges(newValue);
					toast.success(
						`${displayName} ${rowData[keyColumn]}/${rowData[nameColumn]} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toast.error(`修改${displayName}發生例外: ${err.message}`);
				reload();
			}
		},
		[
			baseUri,
			displayName,
			dsg,
			httpPutAsync,
			keyColumn,
			nameColumn,
			reload,
			token,
			transformForSubmitting,
		]
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
				reload();
			}
		},
		[baseUri, displayName, dsg, httpDeleteAsync, keyColumn, reload, token]
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
					dialogs.closeLatest();
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

			dsg.setValueByRowIndex(
				row.rowIndex,
				{
					[keyColumn]: "",
				},
				{
					data: newValue,
				}
			);
			setTimeout(() => {
				dsg.setActiveCell({ row: row.rowIndex, col: 0 });
			}, 0);
		},
		[displayName, dsg, keyColumn]
	);

	return {
		load,
		// handleGridChange,
		handleCreate,
		handleUpdate,
		handleConfirmDelete,
		handleDelete,
		handleDuplicatedError,
		// onRowSelectionChange,
		...dsg,
	};
};
