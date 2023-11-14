import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { DSGContext } from "../../shared-contexts/datasheet-grid/DSGContext";
import { DialogContext } from "../../shared-contexts/dialog/DialogContext";
import { CatMContext } from "./CatMContext";
import { CatSContext } from "./CatSContext";
import { useRef } from "react";

const CatMProvider = (props) => {
	const { children } = props;
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	const dsg = useContext(DSGContext);
	const dialogs = useContext(DialogContext);
	const catS = useContext(CatSContext);

	// const selectedRowIndexRef = useRef(null);

	const [state, setState] = useState({
		selectedRowData: null,
		selectedRowIndex: null,
		lgId: null,
	});

	const clear = useCallback(() => {
		dsg.setData(null);
	}, [dsg]);

	const selectRow = useCallback(
		({ rowIndex, rowData } = {}) => {
			// selectedRowIndexRef.current = rowIndex;
			setState((prev) => ({
				...prev,
				selectedRowData: rowData,
				selectedRowIndex: rowIndex,
			}));
			if (rowData?.MClas) {
				catS.load({
					lgId: state.lgId,
					mdId: rowData?.MClas,
					supressLoading: false,
				});
			} else {
				catS.clear();
			}
		},
		[catS, state.lgId]
	);

	const load = useCallback(
		async ({ lgId, supressLoading = false } = {}) => {
			console.debug(`CatM.load(${lgId})`);
			setState((prev) => ({
				...prev,
				lgId,
			}));
			if (lgId) {
				if (!supressLoading) {
					dsg.setLoading(true);
				}
				try {
					const { status, payload } = await httpGetAsync({
						url: `v1/prod/m-cats/${lgId}`,
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
		load({ lgId: state.lgId, supressLoading: true });
	}, [load, state.lgId]);

	const handleCreate = useCallback(
		async ({ rowData }) => {
			console.debug(`CREATE`, rowData);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: "v1/prod/m-cats",
					bearer: token,
					data: {
						...rowData,
						LClas: state.lgId,
					},
				});
				console.debug("handleCreate response.payload", payload);
				reload();
				if (status.success) {
					// commitChanges();
					selectRow({ rowData });
					toast.success(
						`中分類 ${rowData.MClas}/${rowData.ClassData} 新增成功`
					);
				} else {
					//dsg.rollbackChanges();
					toast.error(error?.message || "新增失敗");
				}
			} catch (err) {
				toast.error(`新增中分類發生例外: ${err.message}`);
				//dsg.rollbackChanges();
				reload();
			}
		},
		[httpPostAsync, token, state.lgId, reload, selectRow]
	);

	const handleUpdate = useCallback(
		async ({ rowData }) => {
			console.debug(`UPDATE`, rowData);
			const key = `${state.lgId},${rowData.MClas}`;
			try {
				const { status, payload, error } = await httpPutAsync({
					url: `v1/prod/m-cats/${key}`,
					bearer: token,
					data: {
						...rowData,
						LClas: state.lgId,
					},
				});
				console.debug("handleCreate response.payload", payload);
				reload();
				if (status.success) {
					// commitChanges();
					selectRow({ rowData });
					toast.success(
						`中分類 ${rowData.MClas}/${rowData.ClassData} 修改成功`
					);
				} else {
					// dsg.rollbackChanges();
					toast.error(error?.message || "修改失敗");
				}
			} catch (err) {
				toast.error(`新增中分類發生例外: ${err.message}`);
				reload();
			}
		},
		[state.lgId, httpPutAsync, token, reload, selectRow]
	);

	const handleDelete = useCallback(
		async ({ rowData }) => {
			console.debug(`DELETE`, rowData);
			const key = `${state.lgId},${rowData.MClas}`;
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/prod/m-cats/${key}`,
					bearer: token,
				});
				// 重新讀取
				reload();
				if (status.success) {
					// 取消選取列
					selectRow(null);
					dialogs.closeLatest();
					toast.success(
						`中分類 ${rowData.LClas}/${rowData.ClassData} 刪除成功`
					);
				} else {
					// dsg.rollbackChanges();
					toast.error(error?.message || "刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除中分類發生例外: ${err.message}`);
			} finally {
				dsg.setDeletingTarget(null);
			}
		},
		[state.lgId, httpDeleteAsync, token, reload, selectRow, dialogs, dsg]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			console.debug(`confirm DELETE`, row);
			dsg.setDeletingTarget(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除中分類 ${row.MClas}/${row.ClassData} ?`,
				onConfirm: () => {
					handleDelete(row);
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
		(row) => {
			//dsg.rollbackChanges();
			toast.error(`中分類 ${row.MClas} 已存在`);
			reload();
		},
		[reload]
	);

	// const isSelected = useCallback(({ rowIndex }) => {
	// 	console.debug(
	// 		"selectedRowIndexRef.current",
	// 		selectedRowIndexRef.current
	// 	);
	// }, []);

	// const handleGridChange = dsg.handleChange({
	// 	onCreate: handleCreate,
	// 	onUpdate: handleUpdate,
	// 	onDelete: handleConfirmDelete,
	// 	onDuplicatedError: handleDuplicatedError,
	// });

	// const handleActiveCellChange = useCallback(({ cell }) => {
	// 	console.debug(`CatM.onActiveCellChange →`, cell);
	// 	if (cell) {
	// 		const selectedRow = dsg.getRowDataByIndex(cell.row || 0);
	// 		if (selectedRow && dsg.isAllFieldsNotNull(selectedRow)) {
	// 			console.debug(`${dsg.id} selected `, selectedRow);
	// 			selectRow(selectedRow);
	// 		}
	// 	}
	// }, []);

	// const handleSelectionChange = useCallback(
	// 	({ selection }) => {
	// 		if (selection) {
	// 			console.debug(`${dsg.id} select:`, selection);
	// 			const selectedRow = dsg.getRowDataByIndex(selection.min.row);
	// 			if (selectedRow && dsg.isAllFieldsNotNull(selectedRow)) {
	// 				console.debug(`${dsg.id} selected`, selectedRow);
	// 				selectRow(selectedRow);
	// 			}
	// 		} else {
	// 			console.debug(`${dsg.id} de-selected`);
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
		<CatMContext.Provider
			value={{
				...state,
				clear,
				load,
				handleRowSelectionChange,
				handleCreate,
				handleUpdate,
				handleConfirmDelete,
				handleDelete,
				handleDuplicatedError,
				// isSelected,
			}}>
			{children}
		</CatMContext.Provider>
	);
};

CatMProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CatMProvider;
