import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { DSGContext } from "../../shared-contexts/datasheet-grid/DSGContext";
import { DialogContext } from "../../shared-contexts/dialog/DialogContext";
import { CatSContext } from "./CatSContext";

const CatSProvider = (props) => {
	const { children } = props;
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	const dsg = useContext(DSGContext);
	const dialogs = useContext(DialogContext);
	const [state, setState] = useState({
		lgId: null,
		mdId: null,
	});

	const clear = useCallback(() => {
		dsg.setData(null);
	}, [dsg]);

	const selectRow = useCallback(({ rowData } = {}) => {
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
					dsg.setLoading(true);
				}
				try {
					const { status, payload } = await httpGetAsync({
						url: `v1/prod/s-cats/${lgId},${mdId}`,
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
		async ({ rowData }) => {
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
				reload();
				if (status.success) {
					// commitChanges();
					selectRow({ rowData });
					toast.success(
						`小分類 ${rowData.SClas}/${rowData.ClassData} 新增成功`
					);
				} else {
					//dsg.rollbackChanges();
					toast.error(error?.message || "新增失敗");
				}
			} catch (err) {
				toast.error(`新增小分類發生例外: ${err.message}`);
				//dsg.rollbackChanges();
				reload();
			}
		},
		[httpPostAsync, token, state.lgId, state.mdId, reload, selectRow]
	);

	const handleUpdate = useCallback(
		async ({ rowData }) => {
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
				reload();
				if (status.success) {
					// commitChanges();
					selectRow({ rowData });
					toast.success(
						`小分類 ${rowData.SClas}/${rowData.ClassData} 修改成功`
					);
				} else {
					// dsg.rollbackChanges();
					toast.error(error?.message || "修改失敗");
				}
			} catch (err) {
				toast.error(`新增小分類發生例外: ${err.message}`);
				reload();
			}
		},
		[httpPutAsync, token, state.lgId, state.mdId, reload, selectRow]
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
				// 重新讀取
				reload();
				if (status.success) {
					selectRow(null);
					dialogs.closeLatest();
					toast.success(
						`小分類 ${rowData.SClas}/${rowData.ClassData} 刪除成功`
					);
				} else {
					// dsg.rollbackChanges();
					toast.error(error?.message || "刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除小分類發生例外: ${err.message}`);
			} finally {
				dsg.setDeletingTarget(null);
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
		async ({ rowData }) => {
			console.debug(`confirm DELETE`, rowData);
			dsg.setDeletingTarget(rowData);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除小分類 ${rowData.SClas}/${rowData.ClassData} ?`,
				onConfirm: () => {
					handleDelete(rowData);
				},
				onCancel: () => {
					dsg.setDeletingTarget(null);
					dsg.rollbackChanges();
					dialogs.closeLatest();
				},
			});
		},
		[dialogs, handleDelete, dsg]
	);

	const handleDuplicatedError = useCallback(
		({ rowData }) => {
			// dsg.rollbackChanges();
			toast.error(`小分類 ${rowData.SClas} 已存在`);
			reload();
		},
		[reload]
	);

	const handleGridChange = dsg.handleChange({
		onCreate: handleCreate,
		onUpdate: handleUpdate,
		onDelete: handleConfirmDelete,
		// onConfirmDelete: handleConfirmDelete,
		onDuplicatedError: handleDuplicatedError,
	});

	// const handleActiveCellChange = useCallback(
	// 	({ cell }) => {
	// 		console.debug(`CatS.onActiveCellChange →`, cell);
	// 		if (cell) {
	// 			const selectedRow = dsg.getRowDataByIndex(cell.row || 0);
	// 			if (selectedRow && dsg.isAllFieldsNotNull(selectedRow)) {
	// 				console.debug(`${dsg.id} selected `, selectedRow);
	// 				selectRow(selectedRow);
	// 			}
	// 		}
	// 	},
	// 	[dsg, selectRow]
	// );

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
			}}>
			{children}
		</CatSContext.Provider>
	);
};

CatSProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CatSProvider;
