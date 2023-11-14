import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { A02Context } from "./A02Context";
import { DSGContext } from "../../shared-contexts/datasheet-grid/DSGContext";
import { useContext } from "react";
import { useState } from "react";
import { DialogContext } from "../../shared-contexts/dialog/DialogContext";
import { useInit } from "@/shared-hooks/useInit";
import { AuthContext } from "@/contexts/auth/AuthContext";

const A02Provider = (props) => {
	const { children } = props;
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	const {
		loading,
		setLoading,
		handleDataLoaded,
		handleChange,
		// commitChanges,
		rollbackChanges,
		// deletingTarget,
		setDeletingTarget,
		// removeByKey,
	} = useContext(DSGContext);
	const dialogs = useContext(DialogContext);

	// const [loading, setLoading] = useState();

	const load = useCallback(
		async ({ supressLoading = false } = {}) => {
			if (!supressLoading) {
				setLoading(true);
			}
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/prod/pkg-types",
					bearer: token,
				});
				if (status.success) {
					handleDataLoaded(payload);
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
				setLoading(false);
			}
		},
		[handleDataLoaded, httpGetAsync, setLoading, token]
	);

	const handleCreate = useCallback(
		async (row) => {
			console.debug(`CREATE`, row);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: "v1/prod/pkg-types",
					bearer: token,
					data: row,
				});
				console.debug("handleCreate response.payload", payload);
				if (status.success) {
					// commitChanges();
					load({ supressLoading: true });
					toast.success(
						`代碼 ${row.CodeID}/${row.CodeData} 新增成功`
					);
				} else {
					rollbackChanges();
					toast.error(error?.message || "新增失敗");
				}
			} catch (err) {
				toast.error(`新增代碼發生例外: ${err.message}`);
				rollbackChanges();
			}
		},
		[httpPostAsync, load, rollbackChanges, token]
	);

	const handleUpdate = useCallback(
		async (row) => {
			console.debug(`UPDATE`, row);
			try {
				const { status, payload, error } = await httpPutAsync({
					url: "v1/prod/pkg-types",
					data: row,
					bearer: token,
				});
				console.debug("handleCreate response.payload", payload);
				if (status.success) {
					// commitChanges();
					load({ supressLoading: true });
					toast.success(
						`代碼 ${row.CodeID}/${row.CodeData} 修改成功`
					);
				} else {
					rollbackChanges();
					toast.error(error?.message || "修改失敗");
				}
			} catch (err) {
				toast.error(`新增代碼發生例外: ${err.message}`);
			}
		},
		[httpPutAsync, load, rollbackChanges, token]
	);

	const handleDelete = useCallback(
		async (row) => {
			console.debug(`DELETE`, row);
			const key = row.CodeID;
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/prod/pkg-types/${key}`,
					bearer: token,
				});
				if (status.success) {
					// removeByKey(key);
					load({ supressLoading: true });
					setDeletingTarget(null);
					dialogs.closeLatest();
					toast.success(
						`代碼 ${row.CodeID}/${row.CodeData} 刪除成功`
					);
				} else {
					rollbackChanges();
					toast.error(error?.message || "刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除代碼發生例外: ${err.message}`);
			}
		},
		[
			dialogs,
			httpDeleteAsync,
			load,
			rollbackChanges,
			setDeletingTarget,
			token,
		]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			console.debug(`confirm DELETE`, row);
			setDeletingTarget(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除代碼 ${row.CodeID}/${row.CodeData} ?`,
				onConfirm: () => {
					handleDelete(row);
				},
				onCancel: () => {
					setDeletingTarget(null);
					rollbackChanges();
					dialogs.closeLatest();
				},
			});
		},
		[dialogs, handleDelete, rollbackChanges, setDeletingTarget]
	);

	const handleDuplicatedError = useCallback(
		(row) => {
			rollbackChanges();
			toast.error(`代碼 ${row.CodeID} 已存在`);
		},
		[rollbackChanges]
	);

	const handleGridChange = handleChange({
		onCreate: handleCreate,
		onUpdate: handleUpdate,
		onDelete: handleConfirmDelete,
		// onConfirmDelete: handleConfirmDelete,
		onDuplicatedError: handleDuplicatedError,
	});

	useInit(() => {
		load();
	}, []);

	return (
		<A02Context.Provider
			value={{
				load,
				handleGridChange,
			}}>
			{children}
		</A02Context.Provider>
	);
};

A02Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default A02Provider;
