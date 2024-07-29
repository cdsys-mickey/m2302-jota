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
import { useDSG } from "@/shared-hooks/useDSG";
import DSG from "../../shared-modules/sd-dsg";
import { useDSGCodeEditor } from "../../shared-hooks/useDSGCodeEditor";

const CatLGridProvider = (props) => {
	const { children } = props;
	const [isPending, startTransition] = useTransition();
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const { token } = useContext(AuthContext);

	// const dsg = useContext(DSGContext);
	const dsg = useDSGCodeEditor({
		gridId: "CatL",
		keyColumn: "LClas",
		otherColumns: "ClassData",
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
		dsg.setGridData([], {
			reset: true,
			commit: true,
		});
	}, [dsg]);

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
				dsg.setGridLoading(true);
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
					dsg.handleGridDataLoaded(payload.data);
					// setState((prev) => ({
					// 	...prev,
					// 	selected: null,
					// }));
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
		},
		[dsg, httpGetAsync, token]
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
					dsg.commitChanges(newValue);
					selectRow({ rowIndex, rowData });
					toast.success(
						`大分類 ${rowData.LClas}/${rowData.ClassData} 新增成功`
					);
				} else {
					throw error?.message || new Error("新增失敗");
				}
			} catch (err) {
				toast.error(`新增大分類發生例外: ${err.message}`);
				reload();
			}
		},
		[dsg, httpPostAsync, reload, selectRow, token]
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
					dsg.commitChanges(newValue);
					selectRow({ rowIndex, rowData });
					toast.success(
						`大分類 ${rowData.LClas}/${rowData.ClassData} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toast.error(`新增大分類發生例外: ${err.message}`);
				reload();
			}
		},
		[dsg, httpPutAsync, reload, selectRow, token]
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
				toast.error(`刪除大分類發生例外: ${err.message}`);
			} finally {
				dsg.setDeletingRow(null);
				dialogs.closeLatest();
				reload();
			}
		},
		[dialogs, dsg, httpDeleteAsync, reload, token, selectRow]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			const { rowData } = row;
			console.log(`confirm DELETE`, rowData);
			dsg.setDeletingRow(row);

			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除大分類 ${rowData.LClas}/${rowData.ClassData} ?`,
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
		[dialogs, dsg, handleDelete]
	);

	const handleDuplicatedError = useCallback(
		(row, newValue) => {
			// dsg.rollbackChanges();
			toast.error(`大分類 ${row.rowData.LClas} 已存在`);
			dsg.setValueByRowIndex(
				row.rowIndex,
				{
					LClas: "",
				},
				{
					data: newValue,
				}
			);
		},
		[dsg]
	);

	const onRowSelectionChange = useCallback(
		(row) => {
			// setState((prev) => ({
			// 	...prev,
			// 	selected: opts,
			// }));
			dsg.setSelectedRow(row);
			selectRow(row);
		},
		[dsg, selectRow]
	);

	// const isSelected = useCallback(
	// 	(rowIndex) => {
	// 		console.log(
	// 			`state.selectedRowIndex: ${state.selectedRowIndex}, rowIndex: ${rowIndex}`,
	// 			rowIndex
	// 		);
	// 		return state.selectedRowIndex === rowIndex;
	// 	},
	// 	[state.selectedRowIndex]
	// );

	useInit(() => {
		load();
	}, []);

	return (
		<CatLGridContext.Provider
			value={{
				...state,
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
				...dsg,
			}}>
			{children}
		</CatLGridContext.Provider>
	);
};

CatLGridProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CatLGridProvider;
