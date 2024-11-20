import { useWebApi } from "@/shared-hooks/useWebApi";
import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useState } from "react";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInit } from "@/shared-hooks/useInit";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { CatLGridContext } from "./CatLGridContext";
import { CatMGridContext } from "./CatMGridContext";
import { CatSGridContext } from "./CatSGridContext";
import { useTransition } from "react";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import DSG from "../../shared-modules/sd-dsg";
import { useDSGCodeEditor } from "@/shared-hooks/dsg/useDSGCodeEditor";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "../../shared-hooks/dsg/DSGLastCellBehavior";
import { useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { A03Context } from "./A03Context";

const CatLGridProvider = (props) => {
	const { children } = props;
	const [isPending, startTransition] = useTransition();
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	// const dsg = useContext(DSGContext);
	const grid = useDSG({
		gridId: "CatL",
		keyColumn: "LClas",
		otherColumns: "ClassData",
	});
	const a03 = useContext(A03Context);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"LClas",
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
				title: "大分類名稱",
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
	const catM = useContext(CatMGridContext);
	const catS = useContext(CatSGridContext);

	const [state, setState] = useState({
		// selected: null,
		// selectedRowIndex: null,
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
			console.log(`catL.selectedRow`, rowData);
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
				grid.setGridLoading(true);
			}
			try {
				setState((prev) => ({
					...prev,
					error: null,
				}));
				const { status, payload } = await httpGetAsync({
					url: "v1/prod/l-cats",
					bearer: token,
				});
				if (status.success) {
					grid.handleGridDataLoaded(payload.data);
					// setState((prev) => ({
					// 	...prev,
					// 	selected: null,
					// }));
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
		},
		[grid, httpGetAsync, token]
	);

	const reload = useCallback(() => {
		load({ supressLoading: true });
	}, [load]);

	const handleCreate = useCallback(
		async ({ rowIndex, rowData }, newValue) => {
			console.log(`CREATE`, rowData);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: "v1/prod/l-cats",
					bearer: token,
					data: rowData,
				});
				console.log("handleCreate response.payload", payload);
				if (status.success) {
					grid.commitChanges(newValue);
					selectRow({ rowIndex, rowData });
					toast.success(
						`大分類 ${rowData.LClas}/${rowData.ClassData} 新增成功`
					);
				} else {
					throw error?.message || new Error("新增失敗");
				}
			} catch (err) {
				toast.error(`新增大分類發生例外: ${err.message}`, {
					position: "top-right"
				});
				reload();
			}
		},
		[grid, httpPostAsync, reload, selectRow, token]
	);

	const handleUpdate = useCallback(
		async ({ rowIndex, rowData }, newValue) => {
			console.log(`UPDATE`, rowData);
			const key = rowData.LClas;
			try {
				const { status, payload, error } = await httpPutAsync({
					url: `v1/prod/l-cats/${key}`,
					data: rowData,
					bearer: token,
				});
				console.log("handleCreate response.payload", payload);

				if (status.success) {
					grid.commitChanges(newValue);
					selectRow({ rowIndex, rowData });
					toast.success(
						`大分類 ${rowData.LClas}/${rowData.ClassData} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toast.error(`新增大分類發生例外: ${err.message}`, {
					position: "top-right"
				});
				reload();
			}
		},
		[grid, httpPutAsync, reload, selectRow, token]
	);

	const handleDelete = useCallback(
		async ({ rowData }) => {
			console.log(`DELETE`, rowData);
			try {
				const key = rowData.LClas;
				const { status, error } = await httpDeleteAsync({
					url: `v1/prod/l-cats/${key}`,
					bearer: token,
				});

				if (status.success) {
					// 取消選取列
					selectRow({});
					toast.success(
						`大分類 ${rowData.LClas}/${rowData.ClassData} 刪除成功`
					);
				} else {
					throw error?.message || new Error("刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除大分類發生例外: ${err.message}`, {
					position: "top-right"
				});
			} finally {
				// grid.setDeletingRow(null);
				dialogs.closeLatest();
				reload();
			}
		},
		[dialogs, httpDeleteAsync, reload, token, selectRow]
	);

	const handleConfirmDelete = useCallback(
		async (rows) => {
			if (!rows || rows.length === 0) {
				throw new Error("未指定 rows");
			}

			let message;

			if (rows.length > 1) {
				message = ` ${rows.length} 筆代碼`;
			} else {
				const firstRow = rows[0];
				message = `大分類「${firstRow[grid.keyColumn]}」`;
			}

			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除${message}?`,
				onConfirm: () => {
					handleDelete(rows);
				},
				onCancel: () => {
					// grid.setDeletingRow(null);
					grid.rollbackChanges();
					dialogs.closeLatest();
				},
			});
		},
		[dialogs, grid, handleDelete]
	);

	const handleDuplicatedError = useCallback(
		(row, newValue) => {
			// grid.rollbackChanges();
			toast.error(`大分類 ${row.rowData.LClas} 已存在`, {
				position: "top-right"
			});
			grid.setValueByRowIndex(
				row.rowIndex,
				{
					LClas: "",
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
			// setState((prev) => ({
			// 	...prev,
			// 	selected: opts,
			// }));
			gridMeta.setSelectedRow(row);
			selectRow(row);
		},
		[grid, selectRow]
	);

	useInit(() => {
		load();
	}, []);

	return (
		<CatLGridContext.Provider
			value={{
				...state,
				grid,
				gridMeta,
				codeEditor,

				load,
				clear,
				onRowSelectionChange,
				handleCreate,
				handleUpdate,
				handleConfirmDelete,
				handleDelete,
				handleDuplicatedError,
				// isSelected,
				// getRowClassName,
			}}>
			{children}
		</CatLGridContext.Provider>
	);
};

CatLGridProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CatLGridProvider;
