import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { CatMGridContext } from "./CatMGridContext";
import { CatSGridContext } from "./CatSGridContext";
import { useRef } from "react";
import { RoomTwoTone } from "@mui/icons-material";
import { useDSG } from "@/shared-hooks/useDSG";

const CatMGridProvider = (props) => {
	const { children } = props;
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	// const dsg = useContext(DSGContext);
	const dsg = useDSG({
		gridId: "CatM",
		keyColumn: "MClas",
		otherColumns: "ClassData",
	});
	const dialogs = useContext(DialogsContext);
	const catS = useContext(CatSGridContext);

	// const selectedRowIndexRef = useRef(null);

	const [state, setState] = useState({
		// selectedRowData: null,
		// selectedRowIndex: null,
		lgId: null,
		error: null,
	});

	const clear = useCallback(() => {
		dsg.setGridData(null);
	}, [dsg]);

	const selectRow = useCallback(
		({ rowData } = {}) => {
			// selectedRowIndexRef.current = rowIndex;
			// setState((prev) => ({
			// 	...prev,
			// 	selectedRowData: rowData,
			// 	selectedRowIndex: rowIndex,
			// }));
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
			console.log(`CatM.load(${lgId})`);
			setState((prev) => ({
				...prev,
				lgId,
			}));
			if (lgId) {
				if (!supressLoading) {
					dsg.setGridLoading(true);
					dsg.setSelectedRow(null);
				}
				try {
					setState((prev) => ({
						...prev,
						error: null,
					}));
					const { status, payload } = await httpGetAsync({
						url: `v1/prod/m-cats/${lgId}`,
						bearer: token,
					});
					if (status?.success) {
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
		load({ lgId: state.lgId, supressLoading: true });
	}, [load, state.lgId]);

	const handleCreate = useCallback(
		async ({ rowData, rowIndex }, newValue) => {
			console.log(`CREATE`, rowData);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: "v1/prod/m-cats",
					bearer: token,
					data: {
						...rowData,
						LClas: state.lgId,
					},
				});
				console.log("handleCreate response.payload", payload);
				reload();
				if (status?.success) {
					dsg.commitChanges(newValue);
					selectRow({ rowData, rowIndex });
					toast.success(
						`中分類 ${rowData.MClas}/${rowData.ClassData} 新增成功`
					);
				} else {
					//dsg.rollbackChanges();
					throw error?.message || new Error("新增失敗");
				}
			} catch (err) {
				toast.error(`新增中分類發生例外: ${err.message}`);
				reload();
			}
		},
		[httpPostAsync, token, state.lgId, reload, dsg, selectRow]
	);

	const handleUpdate = useCallback(
		async ({ rowData, rowIndex }, newValue) => {
			console.log(`UPDATE`, rowData);
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
				console.log("handleCreate response.payload", payload);
				if (status?.success) {
					dsg.commitChanges(newValue);
					selectRow({ rowData, rowIndex });
					toast.success(
						`中分類 ${rowData.MClas}/${rowData.ClassData} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toast.error(`新增中分類發生例外: ${err.message}`);
				reload();
			}
		},
		[state.lgId, httpPutAsync, token, dsg, selectRow, reload]
	);

	const handleDelete = useCallback(
		async ({ rowData }) => {
			console.log(`DELETE`, rowData);
			const key = `${state.lgId},${rowData.MClas}`;
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/prod/m-cats/${key}`,
					bearer: token,
				});

				if (status?.success) {
					// 取消選取列
					selectRow(undefined);

					toast.success(
						`中分類 ${rowData.LClas}/${rowData.ClassData} 刪除成功`
					);
				} else {
					throw error?.message || new Error("刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除中分類發生例外: ${err.message}`);
			} finally {
				dsg.setDeletingRow(null);
				dialogs.closeLatest();
				reload();
			}
		},
		[state.lgId, httpDeleteAsync, token, reload, selectRow, dialogs, dsg]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			const { rowData } = row;
			console.log(`confirm DELETE`, rowData);
			dsg.setDeletingRow(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除中分類 ${rowData.MClas}/${rowData.ClassData} ?`,
				onConfirm: () => {
					handleDelete(RoomTwoTone);
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
			//dsg.rollbackChanges();
			toast.error(`中分類 ${row.rowData.MClas} 已存在`);
			dsg.rewriteRowValue(row, newValue, {
				MClas: "",
			});
			dsg.rewriteRowValue(row, newValue, {
				MClas: "",
			});
		},
		[dsg]
	);

	const onRowSelectionChange = useCallback(
		(row) => {
			dsg.setSelectedRow(row);
			selectRow(row);
		},
		[dsg, selectRow]
	);

	return (
		<CatMGridContext.Provider
			value={{
				...state,
				clear,
				load,
				onRowSelectionChange,
				handleCreate,
				handleUpdate,
				handleConfirmDelete,
				handleDelete,
				handleDuplicatedError,
				// isSelected,
				...dsg,
			}}>
			{children}
		</CatMGridContext.Provider>
	);
};

CatMGridProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CatMGridProvider;
