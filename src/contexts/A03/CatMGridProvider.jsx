import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { CatMGridContext } from "./CatMGridContext";
import { CatSGridContext } from "./CatSGridContext";
import { useRef } from "react";
import { RoomTwoTone } from "@mui/icons-material";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";
import { A03Context } from "./A03Context";

const CatMGridProvider = (props) => {
	const { children } = props;
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	const a03 = useContext(A03Context);
	const grid = useDSG({
		gridId: "CatM",
		keyColumn: "MClas",
		otherColumns: "ClassData",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"MClas",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				disabled: grid.isPersisted,
				title: "代碼",
				minWidth: 60,
			},
			{
				...keyColumn(
					"ClassData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "中分類名稱",
				grow: 5,
				disabled: a03.readOnly,
			},
		],
		[a03.readOnly, grid.isPersisted]
	);

	const gridMeta = useDSGMeta({
		columns,
		data: grid.gridData,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
	});

	const codeEditor = useDSGCodeEditor({
		grid,
		gridMeta,
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
		grid.setGridData([], {
			reset: true,
			commit: true,
		});
	}, [grid]);

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
					grid.setGridLoading(true);
					gridMeta.setSelectedRow(null);
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
					if (status.success) {
						grid.handleGridDataLoaded(payload.data);
					} else {
						switch (status.code) {
							default:
								toast.error(`發生未預期例外 ${status.code}`, {
									position: "top-right"
								});
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
					grid.setGridLoading(false);
				}
			} else {
				grid.clear();
			}
		},
		[grid, httpGetAsync, token]
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
				if (status.success) {
					grid.commitChanges(newValue);
					selectRow({ rowData, rowIndex });
					toast.success(
						`中分類 ${rowData.MClas}/${rowData.ClassData} 新增成功`
					);
				} else {
					//grid.rollbackChanges();
					throw error?.message || new Error("新增失敗");
				}
			} catch (err) {
				toast.error(`新增中分類發生例外: ${err.message}`, {
					position: "top-right"
				});
				reload();
			}
		},
		[httpPostAsync, token, state.lgId, reload, grid, selectRow]
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
				if (status.success) {
					grid.commitChanges(newValue);
					selectRow({ rowData, rowIndex });
					toast.success(
						`中分類 ${rowData.MClas}/${rowData.ClassData} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toast.error(`新增中分類發生例外: ${err.message}`, {
					position: "top-right"
				});
				reload();
			}
		},
		[state.lgId, httpPutAsync, token, grid, selectRow, reload]
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

				if (status.success) {
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
				toast.error(`刪除中分類發生例外: ${err.message}`, {
					position: "top-right"
				});
			} finally {
				// grid.setDeletingRow(null);
				dialogs.closeLatest();
				reload();
			}
		},
		[state.lgId, httpDeleteAsync, token, reload, selectRow, dialogs]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			const { rowData } = row;
			console.log(`confirm DELETE`, rowData);
			// grid.setDeletingRow(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除中分類 ${rowData.MClas}/${rowData.ClassData} ?`,
				onConfirm: () => {
					handleDelete(RoomTwoTone);
				},
				onCancel: () => {
					// grid.setDeletingRow(null);
					grid.rollbackChanges();
					dialogs.closeLatest();
				},
			});
		},
		[dialogs, handleDelete, grid]
	);

	const handleDuplicatedError = useCallback(
		(row, newValue) => {
			//dsg.rollbackChanges();
			toast.error(`中分類 ${row.rowData.MClas} 已存在`, {
				position: "top-right"
			});
			grid.spreadOnRow(
				row.rowIndex,
				{
					MClas: "",
				},
				{ data: newValue }
			);
		},
		[grid]
	);

	const onRowSelectionChange = useCallback(
		(row) => {
			gridMeta.setSelectedRow(row);
			selectRow(row);
		},
		[grid, selectRow]
	);

	return (
		<CatMGridContext.Provider
			value={{
				...state,
				grid,
				gridMeta,
				codeEditor,

				clear,
				load,
				onRowSelectionChange,
				handleCreate,
				handleUpdate,
				handleConfirmDelete,
				handleDelete,
				handleDuplicatedError,
				// isSelected,
			}}>
			{children}
		</CatMGridContext.Provider>
	);
};

CatMGridProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CatMGridProvider;
