import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { CatSContext } from "./CatSContext";
import { useDSG } from "../../shared-hooks/useDSG";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";

const CatSProvider = (props) => {
	const { children } = props;
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	// const dsg = useContext(DSGContext);
	const dsg = useDSG({
		id: "sm",
		keyColumn: "SClas",
		otherColumns: "ClassData",
	});
	const dialogs = useContext(DialogsContext);
	const [state, setState] = useState({
		lgId: null,
		mdId: null,
		error: null,
	});

	const clear = useCallback(() => {
		dsg.setGridData(null);
	}, [dsg]);

	const selectRow = useCallback(({ rowData }) => {
		setState((prev) => ({
			...prev,
			selected: rowData,
		}));
	}, []);

	const load = useCallback(
		async ({ lgId, mdId, supressLoading = false } = {}) => {
			console.debug(`CatS.load(${lgId}, ${mdId})`);
			setState((prev) => ({
				...prev,
				lgId,
				mdId,
			}));
			if (lgId && mdId) {
				if (!supressLoading) {
					dsg.setGridLoading(true);
				}
				try {
					const { status, payload } = await httpGetAsync({
						url: `v1/prod/s-cats/${lgId},${mdId}`,
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
					setState((prev) => ({
						...prev,
						error: err,
					}));
				} finally {
					dsg.setGridLoading(false);
				}
			} else {
				dsg.clear();
			}
		},
		[dsg, httpGetAsync, token]
	);

	const reload = useCallback(() => {
		load({ lgId: state.lgId, mdId: state.mdId, supressLoading: true });
	}, [load, state.lgId, state.mdId]);

	const handleCreate = useCallback(
		async ({ rowData }, newValue) => {
			console.debug(`CREATE`, rowData);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: "v1/prod/s-cats",
					bearer: token,
					data: {
						...rowData,
						LClas: state.lgId,
						MClas: state.mdId,
					},
				});
				console.debug("handleCreate response.payload", payload);
				if (status.success) {
					dsg.commitChanges(newValue);
					selectRow({ rowData });
					toast.success(
						`小分類 ${rowData.SClas}/${rowData.ClassData} 新增成功`
					);
				} else {
					throw error?.message || new Error("新增失敗");
				}
			} catch (err) {
				toast.error(`新增小分類發生例外: ${err.message}`);
				reload();
			}
		},
		[httpPostAsync, token, state.lgId, state.mdId, dsg, selectRow, reload]
	);

	const handleUpdate = useCallback(
		async ({ rowData }, newValue) => {
			console.debug(`UPDATE`, rowData);
			const key = `${state.lgId},${state.mdId},${rowData.SClas}`;
			try {
				const { status, payload, error } = await httpPutAsync({
					url: `v1/prod/s-cats/${key}`,
					bearer: token,
					data: {
						...rowData,
						LClas: state.lgId,
						MClas: state.mdId,
					},
				});
				console.debug("handleCreate response.payload", payload);

				if (status.success) {
					dsg.commitChanges(newValue);
					selectRow({ rowData });
					toast.success(
						`小分類 ${rowData.SClas}/${rowData.ClassData} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toast.error(`新增小分類發生例外: ${err.message}`);
				reload();
			}
		},
		[state.lgId, state.mdId, httpPutAsync, token, reload, dsg, selectRow]
	);

	const handleDelete = useCallback(
		async ({ rowData }) => {
			console.debug(`DELETE`, rowData);
			const key = `${state.lgId},${state.mdId},${rowData.SClas}`;
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/prod/s-cats/${key}`,
					bearer: token,
				});
				if (status.success) {
					selectRow({});
					toast.success(
						`小分類 ${rowData.SClas}/${rowData.ClassData} 刪除成功`
					);
				} else {
					throw error?.message || new Error("刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除小分類發生例外: ${err.message}`);
			} finally {
				dsg.setDeletingRow(null);
				dialogs.closeLatest();
				reload();
			}
		},
		[
			dialogs,
			dsg,
			httpDeleteAsync,
			reload,
			selectRow,
			state.lgId,
			state.mdId,
			token,
		]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			const { rowData } = row;
			console.debug(`confirm DELETE`, rowData);
			dsg.setDeletingRow(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除小分類 ${rowData.SClas}/${rowData.ClassData} ?`,
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
		[dialogs, handleDelete, dsg]
	);

	const handleDuplicatedError = useCallback(
		(row, newValue) => {
			// dsg.rollbackChanges();
			toast.error(`小分類 ${row.rowData.SClas} 已存在`);
			dsg.rewriteRowValue(row, newValue, {
				SClas: "",
			});
			dsg.rewriteRowValue(row, newValue, {
				SClas: "",
			});
		},
		[dsg]
	);

	const handleRowSelectionChange = useCallback(
		({ rowIndex, rowData }) => {
			selectRow({ rowIndex, rowData });
		},
		[selectRow]
	);

	return (
		<CatSContext.Provider
			value={{
				clear,
				load,
				// handleGridChange,
				// handleActiveCellChange,
				handleCreate,
				handleUpdate,
				handleConfirmDelete,
				handleDelete,
				handleDuplicatedError,
				handleRowSelectionChange,
				...dsg,
			}}>
			{children}
		</CatSContext.Provider>
	);
};

CatSProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CatSProvider;
