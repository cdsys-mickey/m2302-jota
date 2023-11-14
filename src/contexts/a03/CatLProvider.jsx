import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { DSGContext } from "../../shared-contexts/datasheet-grid/DSGContext";
import { useContext } from "react";
import { useState } from "react";
import { DialogContext } from "../../shared-contexts/dialog/DialogContext";
import { useInit } from "@/shared-hooks/useInit";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { CatLContext } from "./CatLContext";
import { CatMContext } from "./CatMContext";
import { CatSContext } from "./CatSContext";

const CatLProvider = (props) => {
	const { children } = props;
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	const dsg = useContext(DSGContext);
	const dialogs = useContext(DialogContext);
	const catM = useContext(CatMContext);
	const catS = useContext(CatSContext);

	const [state, setState] = useState({
		selected: null,
		selectedRowIndex: null,
	});

	const clear = useCallback(() => {
		dsg.setData(null);
	}, [dsg]);

	const selectRow = useCallback(
		({ rowIndex, rowData } = {}) => {
			setState((prev) => ({
				...prev,
				selected: rowData,
			}));
			if (rowData?.LClas) {
				catM.load({
					lgId: rowData?.LClas,
					supressLoading: false,
				});
			} else {
				catM.clear();
			}
			catS.clear();
		},
		[catM, catS]
	);

	const load = useCallback(
		async ({ supressLoading = false } = {}) => {
			if (!supressLoading) {
				dsg.setLoading(true);
			}
			try {
				const { status, payload } = await httpGetAsync({
					url: "v1/prod/l-cats",
					bearer: token,
				});
				if (status.success) {
					dsg.handleDataLoaded(payload);
					setState((prev) => ({
						...prev,
						selected: null,
					}));
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
		async ({ rowIndex, rowData }) => {
			console.debug(`CREATE`, rowData);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: "v1/prod/l-cats",
					bearer: token,
					data: rowData,
				});
				console.debug("handleCreate response.payload", payload);
				reload();
				if (status.success) {
					selectRow({ rowIndex, rowData });
					toast.success(
						`大分類 ${rowData.LClas}/${rowData.ClassData} 新增成功`
					);
				} else {
					// rollback 無效
					// dsg.rollbackChanges();
					toast.error(error?.message || "新增失敗");
				}
			} catch (err) {
				toast.error(`新增大分類發生例外: ${err.message}`);
				// dsg.rollbackChanges();
				reload();
			}
		},
		[httpPostAsync, reload, selectRow, token]
	);

	const handleUpdate = useCallback(
		async ({ rowIndex, rowData }) => {
			console.debug(`UPDATE`, rowData);
			const key = rowData.LClas;
			try {
				const { status, payload, error } = await httpPutAsync({
					url: `v1/prod/l-cats/${key}`,
					data: rowData,
					bearer: token,
				});
				console.debug("handleCreate response.payload", payload);
				reload();
				if (status.success) {
					selectRow({ rowIndex, rowData });
					toast.success(
						`代碼 ${rowData.LClas}/${rowData.ClassData} 修改成功`
					);
				} else {
					// dsg.rollbackChanges();
					toast.error(error?.message || "修改失敗");
				}
			} catch (err) {
				toast.error(`新增代碼發生例外: ${err.message}`);
				reload();
			}
		},
		[httpPutAsync, reload, selectRow, token]
	);

	const handleDelete = useCallback(
		async ({ rowIndex, rowData }) => {
			console.debug(`DELETE`, rowData);
			const key = rowData.LClas;
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/prod/l-cats/${key}`,
					bearer: token,
				});
				if (status.success) {
					// 重新讀取
					reload();
					// 取消選取列
					selectRow(null);

					dialogs.closeLatest();
					toast.success(
						`代碼 ${rowData.LClas}/${rowData.ClassData} 刪除成功`
					);
				} else {
					dsg.rollbackChanges();
					toast.error(error?.message || "刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除大分類發生例外: ${err.message}`);
			} finally {
				dsg.setDeletingTarget(null);
			}
		},
		[dialogs, dsg, httpDeleteAsync, reload, token, selectRow]
	);

	const handleConfirmDelete = useCallback(
		async ({ rowIndex, rowData }) => {
			console.debug(`confirm DELETE`, rowData);
			dsg.setDeletingTarget(rowData);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除大分類 ${rowData.LClas}/${rowData.ClassData} ?`,
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
		[dialogs, dsg, handleDelete]
	);

	const handleDuplicatedError = useCallback(
		({ rowIndex, rowData }) => {
			// dsg.rollbackChanges();
			toast.error(`大分類 ${rowData.LClas} 已存在`);
			reload();
		},
		[reload]
	);

	// const handleGridChange = dsg.handleChange({
	// 	onCreate: handleCreate,
	// 	onUpdate: handleUpdate,
	// 	onDelete: handleConfirmDelete,
	// 	onDuplicatedError: handleDuplicatedError,
	// });

	// const handleActiveCellChange = useCallback(({ cell }) => {
	// 	console.debug(`CatL.onActiveCellChange →`, cell);
	// 	if (cell) {
	// 		selectRowIndex(cell.row);
	// 		const selectedRow = dsg.getRowDataByIndex(cell?.row || 0);
	// 		if (selectedRow && dsg.isAllFieldsNotNull(selectedRow)) {
	// 			console.debug(`${dsg.id} selected`, selectedRow);
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

	const isSelected = useCallback(
		(rowIndex) => {
			console.debug(
				`state.selectedRowIndex: ${state.selectedRowIndex}, rowIndex: ${rowIndex}`,
				rowIndex
			);
			return state.selectedRowIndex === rowIndex;
		},
		[state.selectedRowIndex]
	);

	useInit(() => {
		load();
	}, []);

	return (
		<CatLContext.Provider
			value={{
				...state,
				load,
				clear,
				handleRowSelectionChange,
				handleCreate,
				handleUpdate,
				handleConfirmDelete,
				handleDelete,
				handleDuplicatedError,
				isSelected,
			}}>
			{children}
		</CatLContext.Provider>
	);
};

CatLProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CatLProvider;
