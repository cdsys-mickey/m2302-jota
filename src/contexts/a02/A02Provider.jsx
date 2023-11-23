import { AuthContext } from "@/contexts/auth/AuthContext";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { DialogContext } from "@/shared-contexts/dialog/DialogContext";
import { A02Context } from "./A02Context";
import { startTransition } from "react";
import { useToggle } from "@/shared-hooks/useToggle";

export const A02Provider = (props) => {
	const { children } = props;
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);
	const [lockRows, toggleLockRows] = useToggle(true);

	const dsg = useContext(DSGContext);
	const dialogs = useContext(DialogContext);

	// const [loading, setLoading] = useState();

	const load = useCallback(
		async ({ supressLoading = false } = {}) => {
			if (!supressLoading) {
				dsg.setLoading(true);
			}
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/prod/pkg-types",
					bearer: token,
				});
				if (status.success) {
					dsg.handleDataLoaded(payload);
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
				dsg.setLoading(false);
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
					url: "v1/prod/pkg-types",
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
					throw error?.message || "新增失敗";
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
					url: "v1/prod/pkg-types",
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
					throw error?.message || "修改失敗";
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
					url: `v1/prod/pkg-types/${key}`,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`代碼 ${rowData.CodeID}/${rowData.CodeData} 刪除成功`
					);
				} else {
					throw error?.message || "刪除失敗";
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除代碼發生例外: ${err.message}`);
			} finally {
				dsg.setDeletingTarget(null);
				dialogs.closeLatest();
				reload();
			}
		},
		[dialogs, dsg, httpDeleteAsync, reload, token]
	);

	const handleConfirmDelete = useCallback(
		async ({ rowData }) => {
			console.debug(`confirm DELETE`, rowData);
			dsg.setDeletingTarget(rowData);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除代碼 ${rowData.CodeID}/${rowData.CodeData} ?`,
				onConfirm: () => {
					handleDelete({ rowData });
				},
				onCancel: () => {
					dsg.setDeletingTarget(null);
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

			dsg.rewriteValue(row, newValue, {
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
			console.debug(`${dsg.id}[${rowIndex}] selected, data:`, rowData);
		},
		[dsg.id]
	);

	useInit(() => {
		load();
	}, []);

	return (
		<A02Context.Provider
			value={{
				load,
				// handleGridChange,
				handleCreate,
				handleUpdate,
				handleConfirmDelete,
				handleDelete,
				handleDuplicatedError,
				handleRowSelectionChange,
				// lockRows
				lockRows,
				toggleLockRows,
			}}>
			{children}
		</A02Context.Provider>
	);
};

A02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
