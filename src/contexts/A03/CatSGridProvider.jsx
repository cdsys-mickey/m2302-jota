import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { CatSGridContext } from "./CatSGridContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";
import { A03Context } from "./A03Context";

const CatSGridProvider = (props) => {
	const { children } = props;
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	const a03 = useContext(A03Context);
	const grid = useDSG({
		gridId: "CatS",
		keyColumn: "SClas",
		otherColumns: "ClassData",
	});

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"SClas",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				disabled: grid.isPersisted,
				title: "代碼",
				grow: 1,
				minWidth: 60,
			},
			{
				...keyColumn(
					"ClassData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "小分類名稱",
				grow: 5,
				disabled: a03.readOnly,
			},
		],
		[grid.isPersisted, a03.readOnly]
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
	const [state, setState] = useState({
		lgId: null,
		mdId: null,
		error: null,
	});

	const clear = useCallback(() => {
		grid.setGridData([], {
			reset: true,
			commit: true,
		});
	}, [grid]);

	const selectRow = useCallback(({ rowData } = {}) => {
		setState((prev) => ({
			...prev,
			selected: rowData,
		}));
	}, []);

	const load = useCallback(
		async ({ lgId, mdId, supressLoading = false } = {}) => {
			console.log(`CatS.load(${lgId}, ${mdId})`);
			setState((prev) => ({
				...prev,
				lgId,
				mdId,
			}));
			if (lgId && mdId) {
				if (!supressLoading) {
					grid.setGridLoading(true);
				}
				try {
					const { status, payload } = await httpGetAsync({
						url: `v1/prod/s-cats/${lgId},${mdId}`,
						bearer: token,
					});
					if (status.success) {
						grid.handleGridDataLoaded(payload.data || []);
					} else {
						switch (status.code) {
							default:
								toast.error(`發生未預期例外 ${status.code}`, {
									position: "top-center"
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
		load({ lgId: state.lgId, mdId: state.mdId, supressLoading: true });
	}, [load, state.lgId, state.mdId]);

	const handleCreate = useCallback(
		async ({ rowData }, newValue) => {
			console.log(`CREATE`, rowData);
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
				console.log("handleCreate response.payload", payload);
				if (status.success) {
					grid.commitChanges(newValue);
					selectRow({ rowData });
					toast.success(
						`小分類 ${rowData.SClas}/${rowData.ClassData} 新增成功`
					);
				} else {
					throw error?.message || new Error("新增失敗");
				}
			} catch (err) {
				toast.error(`新增小分類發生例外: ${err.message}`, {
					position: "top-center"
				});
				reload();
			}
		},
		[httpPostAsync, token, state.lgId, state.mdId, grid, selectRow, reload]
	);

	const handleUpdate = useCallback(
		async ({ rowData }, newValue) => {
			console.log(`UPDATE`, rowData);
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
				console.log("handleCreate response.payload", payload);

				if (status.success) {
					grid.commitChanges(newValue);
					selectRow({ rowData });
					toast.success(
						`小分類 ${rowData.SClas}/${rowData.ClassData} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toast.error(`新增小分類發生例外: ${err.message}`, {
					position: "top-center"
				});
				reload();
			}
		},
		[state.lgId, state.mdId, httpPutAsync, token, reload, grid, selectRow]
	);

	const handleDelete = useCallback(
		async ({ rowData }) => {
			console.log(`DELETE`, rowData);
			const key = `${state.lgId},${state.mdId},${rowData.SClas}`;
			try {
				const { status, error } = await httpDeleteAsync({
					url: `v1/prod/s-cats/${key}`,
					bearer: token,
				});
				if (status.success) {
					selectRow(undefined);
					toast.success(
						`小分類 ${rowData.SClas}/${rowData.ClassData} 刪除成功`
					);
				} else {
					throw error?.message || new Error("刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除小分類發生例外: ${err.message}`, {
					position: "top-center"
				});
			} finally {
				// grid.setDeletingRow(null);
				dialogs.closeLatest();
				reload();
			}
		},
		[
			dialogs,
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
			console.log(`confirm DELETE`, rowData);
			// grid.setDeletingRow(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除小分類 ${rowData.SClas}/${rowData.ClassData} ?`,
				onConfirm: () => {
					handleDelete(row);
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
			// grid.rollbackChanges();
			toast.error(`小分類 ${row.rowData.SClas} 已存在`, {
				position: "top-center"
			});
			grid.setValueByRowIndex(
				row.rowIndex,
				{
					SClas: "",
				},
				{
					data: newValue,
				}
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
		<CatSGridContext.Provider
			value={{
				grid,
				gridMeta,
				codeEditor,

				clear,
				load,
				// handleGridChange,
				// handleActiveCellChange,
				handleCreate,
				handleUpdate,
				handleConfirmDelete,
				handleDelete,
				handleDuplicatedError,
				onRowSelectionChange,
			}}>
			{children}
		</CatSGridContext.Provider>
	);
};

CatSGridProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CatSGridProvider;
