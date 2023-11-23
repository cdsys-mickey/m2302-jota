import { AuthContext } from "@/contexts/auth/AuthContext";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { DialogContext } from "@/shared-contexts/dialog/DialogContext";
import { A16Context } from "./A16Context";
import { useToggle } from "@/shared-hooks/useToggle";

export const A16Provider = (props) => {
	const { children } = props;
	const [lockRows, toggleLockRows] = useToggle(true);
	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();
	const { token } = useContext(AuthContext);

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
					url: "v1/depts",
					bearer: token,
					data: {
						sd: 1,
					},
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
					throw error?.message || "新增失敗";
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
					throw error?.message || "修改失敗";
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
					throw error?.message || "更新失敗";
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
					throw error?.message || "刪除失敗";
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除門市發生例外: ${err.message}`);
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
				message: `確定要刪除門市 ${rowData.DeptID}/${rowData.DeptName} ?`,
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
			toast.error(`門市 ${row.rowData.DeptID} 已存在`);

			dsg.rewriteValue(row, newValue, {
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
			console.debug(`${dsg.id}[${rowIndex}] selected, data:`, rowData);
		},
		[dsg.id]
	);

	const handleCreateRow = useCallback(
		() => ({
			Using_N: "1",
		}),
		[]
	);

	useInit(() => {
		load();
	}, []);

	return (
		<A16Context.Provider
			value={{
				load,
				// handleGridChange,
				handleCreate,
				handleUpdate,
				handlePatch,
				handleConfirmDelete,
				handleDelete,
				handleDuplicatedError,
				handleRowSelectionChange,
				handleCreateRow,
				lockRows,
				toggleLockRows,
			}}>
			{children}
		</A16Context.Provider>
	);
};

A16Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
