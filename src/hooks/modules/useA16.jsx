import { AuthContext } from "@/contexts/auth/AuthContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useDSG } from "../../shared-hooks/useDSG";

export const useA16 = ({ token }) => {
	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();

	// const dsg = useContext(DSGContext);
	const dsg = useDSG({
		id: "A16",
		keyColumn: "DeptID",
		otherColumns: "GroupKey,DeptName,AbbrName",
	});
	const dialogs = useContext(DialogsContext);

	// const [loading, setLoading] = useState();

	const load = useCallback(
		async ({ supressLoading = false } = {}) => {
			if (!supressLoading) {
				dsg.setGridLoading(true);
			}
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/depts",
					bearer: token,
					data: {
						sd: 1,
					},
				});
				if (status.success) {
					dsg.handleGridDataLoaded(payload["data"]);
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
		[dsg, httpGetAsync, token]
	);

	const reload = useCallback(() => {
		load({ supressLoading: true });
	}, [load]);

	const handleCreate = useCallback(
		async ({ rowData }, newValue) => {
			console.debug(`CREATE`, rowData);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: "v1/depts",
					bearer: token,
					data: rowData,
				});
				console.debug("handleCreate response.payload", payload);
				if (status.success) {
					dsg.commitChanges(newValue);
					toast.success(
						`門市 ${rowData.DeptID}/${rowData.DeptName} 新增成功`
					);
				} else {
					throw error || new Error("新增失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`新增門市發生例外: ${err.message}`);
				reload();
			}
		},
		[dsg, httpPostAsync, reload, token]
	);

	const handleUpdate = useCallback(
		async ({ rowData }, newValue) => {
			console.debug(`UPDATE`, rowData);
			try {
				const { status, payload, error } = await httpPutAsync({
					url: "v1/depts",
					data: rowData,
					bearer: token,
				});
				console.debug("handleCreate response.payload", payload);

				if (status.success) {
					dsg.commitChanges(newValue);
					toast.success(
						`門市 ${rowData.DeptID}/${rowData.DeptName} 修改成功`
					);
				} else {
					throw error || new Error("修改失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`修改門市發生例外: ${err.message}`);
				reload();
			}
		},
		[dsg, httpPutAsync, reload, token]
	);

	const handlePatch = useCallback(
		async ({ rowData }, newValue) => {
			console.debug(`PATCH`, rowData);
			try {
				const { status, payload, error } = await httpPatchAsync({
					url: "v1/depts",
					data: rowData,
					bearer: token,
				});
				console.debug("handlePatch response.payload", payload);
				if (status.success) {
					dsg.commitChanges(newValue);
					toast.success(
						`門市 ${rowData.DeptID}/${rowData.DeptName} 更新成功`
					);
				} else {
					throw error?.message || new Error("更新失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`更新門市發生例外: ${err.message}`);
				reload();
			}
		},
		[dsg, httpPatchAsync, reload, token]
	);

	const handleDelete = useCallback(
		async ({ rowData }) => {
			console.debug(`DELETE`, rowData);
			const key = rowData.DeptID;
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/depts/${key}`,
					bearer: token,
				});
				if (status.success) {
					toast.success(
						`門市 ${rowData.DeptID}/${rowData.DeptName} 刪除成功`
					);
				} else {
					throw error?.message || new Error("刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除門市發生例外: ${err.message}`);
			} finally {
				dsg.setDeletingRow(null);
				dialogs.closeLatest();
				reload();
			}
		},
		[dialogs, dsg, httpDeleteAsync, reload, token]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			const { rowData } = row;
			console.debug(`confirm DELETE`, rowData);
			dsg.setDeletingRow(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除門市 ${rowData.DeptID}/${rowData.DeptName} ?`,
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
		[dialogs, dsg, handleDelete]
	);

	const handleDuplicatedError = useCallback(
		(row, newValue) => {
			toast.error(`門市 ${row.rowData.DeptID} 已存在`);

			dsg.rewriteRowValue(row, newValue, {
				DeptID: "",
			});
			setTimeout(() => {
				dsg.setActiveCell({ row: row.rowIndex, col: 0 });
			}, 0);
		},
		[dsg]
	);

	const handleRowSelectionChange = useCallback(
		({ rowIndex, rowData }) => {
			console.debug(
				`${dsg.gridId}[${rowIndex}] selected, data:`,
				rowData
			);
		},
		[dsg.gridId]
	);

	const handleCreateRow = useCallback(
		() => ({
			Using_N: "1",
		}),
		[]
	);

	return {
		load,
		handleCreate,
		handleUpdate,
		handlePatch,
		handleConfirmDelete,
		handleDelete,
		handleDuplicatedError,
		handleRowSelectionChange,
		handleCreateRow,
		...dsg,
	};
};
