import { AuthContext } from "@/contexts/auth/AuthContext";
import { DialogContext } from "@/shared-contexts/dialog/DialogContext";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useDSG } from "../../shared-hooks/useDSG";
import { A26Context } from "./A26Context";

export const A26Provider = (props) => {
	const { children } = props;
	// const [lockRows, toggleLockRows] = useToggle(true);
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	// const dsg = useContext(DSGContext);
	const dsg = useDSG({
		id: "A26",
		keyColumn: "CodeID",
		otherColumns: "CodeData,Other1",
	});
	const dialogs = useContext(DialogContext);

	// const [loading, setLoading] = useState();

	const load = useCallback(
		async ({ supressLoading = false } = {}) => {
			if (!supressLoading) {
				dsg.setGridLoading(true);
			}
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/prod/cms-types",
					bearer: token,
				});
				if (status.success) {
					dsg.handleGridDataLoaded(payload);
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
		async ({ rowData }) => {
			console.debug(`CREATE`, rowData);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: "v1/prod/cms-types",
					bearer: token,
					data: rowData,
				});
				console.debug("handleCreate response.payload", payload);
				if (status.success) {
					toast.success(
						`代碼 ${rowData.CodeID}/${rowData.CodeData} 新增成功`
					);
				} else {
					// rollbackChanges();
					toast.error(error?.message || "新增失敗");
				}
			} catch (err) {
				toast.error(`新增代碼發生例外: ${err.message}`);
				// rollbackChanges();
			} finally {
				reload();
			}
		},
		[httpPostAsync, reload, token]
	);

	const handleUpdate = useCallback(
		async ({ rowData }) => {
			console.debug(`UPDATE`, rowData);
			try {
				const { status, payload, error } = await httpPutAsync({
					url: "v1/prod/cms-types",
					data: rowData,
					bearer: token,
				});
				console.debug("handleCreate response.payload", payload);

				if (status.success) {
					// commitChanges();
					toast.success(
						`代碼 ${rowData.CodeID}/${rowData.CodeData} 修改成功`
					);
				} else {
					toast.error(error?.message || "修改失敗");
				}
			} catch (err) {
				toast.error(`新增代碼發生例外: ${err.message}`);
			} finally {
				reload();
			}
		},
		[httpPutAsync, reload, token]
	);

	const handleDelete = useCallback(
		async ({ rowData }) => {
			console.debug(`DELETE`, rowData);
			const key = rowData.CodeID;
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/prod/cms-types/${key}`,
					bearer: token,
				});

				if (status.success) {
					dsg.setDeletingRow(null);
					dialogs.closeLatest();
					toast.success(
						`代碼 ${rowData.CodeID}/${rowData.CodeData} 刪除成功`
					);
				} else {
					// rollbackChanges();
					toast.error(error?.message || "刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除代碼發生例外: ${err.message}`);
			} finally {
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
			toast.error(`代碼 ${row.CodeID} 已存在`);
			dsg.setActiveCell({ row: row.rowIndex, col: 0 });

			dsg.rewriteRowValue(row, newValue, {
				CodeID: "",
			});
		},
		[dsg]
	);

	// const handleGridChange = handleChange({
	// 	onCreate: handleCreate,
	// 	onUpdate: handleUpdate,
	// 	onDelete: handleConfirmDelete,
	// 	onDuplicatedError: handleDuplicatedError,
	// });

	const handleRowSelectionChange = useCallback(({ rowIndex, rowData }) => {},
	[]);

	useInit(() => {
		// load({ init: true });
		load();
	}, []);

	return (
		<A26Context.Provider
			value={{
				load,
				// handleGridChange,
				handleCreate,
				handleUpdate,
				handleConfirmDelete,
				handleDelete,
				handleDuplicatedError,
				handleRowSelectionChange,
				// lockRows,
				// toggleLockRows,
				...dsg,
			}}>
			{children}
		</A26Context.Provider>
	);
};

A26Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
