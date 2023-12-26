import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useDSG } from "@/shared-hooks/useDSG";

export const useA10 = ({ token }) => {
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();

	// const dsg = useContext(DSGContext);
	const dsg = useDSG({
		gridId: "A10",
		keyColumn: "CodeID",
		otherColumns: "CodeData",
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
					url: "v1/customer/areas",
					bearer: token,
				});
				if (status.success) {
					dsg.handleGridDataLoaded(payload.data);
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
					url: "v1/customer/areas",
					bearer: token,
					data: rowData,
				});
				console.debug("handleCreate response.payload", payload);
				if (status.success) {
					dsg.commitChanges(newValue);
					toast.success(
						`代碼 ${rowData.CodeID}/${rowData.CodeData} 新增成功`
					);
				} else {
					throw error?.message || new Error("新增失敗");
				}
			} catch (err) {
				toast.error(`新增代碼發生例外: ${err.message}`);
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
					url: "v1/customer/areas",
					data: rowData,
					bearer: token,
				});
				console.debug("handleCreate response.payload", payload);
				if (status.success) {
					dsg.commitChanges(newValue);
					toast.success(
						`代碼 ${rowData.CodeID}/${rowData.CodeData} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toast.error(`修改代碼發生例外: ${err.message}`);
				reload();
			}
		},
		[dsg, httpPutAsync, reload, token]
	);

	const handleDelete = useCallback(
		async ({ rowData }) => {
			console.debug(`DELETE`, rowData);
			try {
				const key = rowData.CodeID;
				const { status, error } = await httpDeleteAsync({
					url: `v1/customer/areas/${key}`,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`代碼 ${rowData.CodeID}/${rowData.CodeData} 刪除成功`
					);
				} else {
					throw error?.message || new Error("刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除代碼發生例外: ${err.message}`);
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
				message: `確定要刪除代碼 ${rowData.CodeID}/${rowData.CodeData} ?`,
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
			toast.error(`代碼 ${row.rowData.CodeID} 已存在`);

			dsg.rewriteRowValue(row, newValue, {
				CodeID: "",
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

	useInit(() => {
		load();
	}, []);

	return {
		load,
		// handleGridChange,
		handleCreate,
		handleUpdate,
		handleConfirmDelete,
		handleDelete,
		handleDuplicatedError,
		handleRowSelectionChange,
		...dsg,
	};
};
