/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback } from "react";
import { useWebApi } from "../useWebApi";
import { useDSG } from "./useDSG";
import { useContext } from "react";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { toast } from "react-toastify";
import queryString from "query-string";
import Objects from "../../shared-modules/sd-objects";
import _ from "lodash";

const defaultTransformForReading = (payload) => {
	return payload?.data || [];
};

const defaultTransformForSubmmit = (payload) => {
	return payload;
};

export const useDSGCodeEditor = ({
	token,
	gridId,
	keyColumn = "CodeID",
	nameColumn = "CodeData",
	otherColumns,
	initialLockRows = true,
	baseUri,
	displayName = "代碼",
	querystring,
	disableAutoDelete = false,
	transformForReading = defaultTransformForReading,
	transformForSubmitting = defaultTransformForSubmmit,
}) => {
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();

	const dsg = useDSG({ gridId, keyColumn, otherColumns, initialLockRows });
	const dialogs = useContext(DialogsContext);

	const load = useCallback(
		async ({ supressLoading = false } = {}) => {
			if (!supressLoading) {
				dsg.setGridLoading(true);
			}
			try {
				const { status, payload } = await httpGetAsync({
					url: baseUri,
					bearer: token,
					...(querystring && {
						params: queryString.parse(querystring),
					}),
				});
				if (status.success) {
					dsg.handleGridDataLoaded(transformForReading(payload));
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
				dsg.setGridLoading(false);
			}
		},
		[baseUri, dsg, httpGetAsync, querystring, token, transformForReading]
	);

	const reload = useCallback(() => {
		load({ supressLoading: true });
	}, [load]);

	const handleCreate = useCallback(
		async ({ rowData }, newValue) => {
			console.log(`CREATE`, rowData);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: baseUri,
					bearer: token,
					data: transformForSubmitting(rowData),
				});
				console.log("handleCreate response.payload", payload);
				if (status.success) {
					dsg.commitChanges(newValue);
					toast.success(
						`${displayName} ${rowData[keyColumn]} 新增成功`
					);
				} else {
					throw error?.message || new Error("新增失敗");
				}
			} catch (err) {
				toast.error(`新增${displayName}發生例外: ${err.message}`);
				reload();
			}
		},
		[
			baseUri,
			displayName,
			dsg,
			httpPostAsync,
			keyColumn,
			reload,
			token,
			transformForSubmitting,
		]
	);

	const handleUpdate = useCallback(
		async ({ rowData }, newValue) => {
			console.log(`UPDATE`, rowData);
			try {
				const { status, payload, error } = await httpPutAsync({
					url: baseUri,
					data: transformForSubmitting(rowData),
					bearer: token,
				});
				console.log("handleCreate response.payload", payload);
				if (status.success) {
					dsg.commitChanges(newValue);
					toast.success(
						`${displayName} ${rowData[keyColumn]}/${rowData[nameColumn]} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toast.error(`修改${displayName}發生例外: ${err.message}`);
				reload();
			}
		},
		[
			baseUri,
			displayName,
			dsg,
			httpPutAsync,
			keyColumn,
			nameColumn,
			reload,
			token,
			transformForSubmitting,
		]
	);

	const handleDelete = useCallback(
		async ({ rowData }) => {
			console.log(`DELETE`, rowData);
			try {
				const key = rowData[keyColumn];
				const { status, error } = await httpDeleteAsync({
					url: `${baseUri}/${key}`,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`${displayName} ${rowData[keyColumn]} 刪除成功`
					);
				} else {
					throw error?.message || new Error("刪除失敗");
				}
			} catch (err) {
				console.error(err);
				toast.error(`刪除${displayName}發生例外: ${err.message}`);
			} finally {
				dsg.setDeletingRow(null);
				reload();
			}
		},
		[baseUri, displayName, dsg, httpDeleteAsync, keyColumn, reload, token]
	);

	const isExistingRow = useCallback(
		({ rowData }) => {
			return dsg.prevGridData.some((prevRowData) => {
				const prevKey = _.get(prevRowData, keyColumn);
				const key = _.get(rowData, keyColumn);
				return prevKey === key;
			});
		},
		[dsg.prevGridData, keyColumn]
	);

	const isUnchanged = useCallback(
		({ rowData, rowIndex }) => {
			const prevRowData = dsg.prevGridData[rowIndex];
			const prevKey = _.get(prevRowData, keyColumn);
			const rowKey = _.get(rowData, keyColumn);

			if (prevKey !== rowKey) {
				throw `keys mismatched ${prevKey} → ${rowKey}`;
			}

			return Objects.arePropsEqual(prevRowData, rowData, {
				fields: dsg.otherColumnNames,
			});
		},
		[dsg.otherColumnNames, dsg.prevGridData, keyColumn]
	);

	const handleConfirmDelete = useCallback(
		async (row) => {
			const { rowData } = row;
			console.log(`confirm DELETE`, rowData);
			dsg.setDeletingRow(row);
			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除${displayName} ${rowData[keyColumn]}?`,
				onConfirm: () => {
					handleDelete(row);
					dialogs.closeLatest();
				},
				onCancel: () => {
					dsg.setDeletingRow(null);
					dsg.rollbackChanges();
					dialogs.closeLatest();
					// 游標移回原來的位置
				},
			});
		},
		[dialogs, displayName, dsg, handleDelete, keyColumn]
	);

	const handleDuplicatedError = useCallback(
		(row, newValue) => {
			toast.error(`${displayName} ${row.rowData[keyColumn]} 已存在`);

			dsg.setValueByRowIndex(
				row.rowIndex,
				{
					[keyColumn]: "",
				},
				{
					data: newValue,
				}
			);
			setTimeout(() => {
				dsg.setActiveCell({ row: row.rowIndex, col: 0 });
			}, 0);
		},
		[displayName, dsg, keyColumn]
	);

	const handleDeleteOperation = useCallback(
		({ operation, onDelete, newValue }) => {
			const fromRowIndex = operation.fromRowIndex;
			const prevFromRowData = dsg.prevGridData[fromRowIndex];

			const toRowIndex = operation.toRowIndex;
			const prevToRowData = dsg.prevGridData[toRowIndex];

			if (prevFromRowData) {
				const fromRow = {
					rowIndex: fromRowIndex,
					rowData: prevFromRowData,
				};
				const toRow =
					fromRowIndex === toRowIndex
						? null
						: {
								rowIndex: toRowIndex,
								rowData: prevToRowData,
						  };
				console.log(`[DSG DELETE]`, fromRow, toRow);
				if (onDelete) {
					onDelete(fromRow, toRow);
				}
			} else {
				dsg.setGridData(newValue);
			}
		},
		[dsg]
	);

	const handleUpdateOperation = useCallback(
		({
			rowIndex,
			rowData,
			newValue,
			onDuplicatedError,
			onPatch,
			onBeforeUpdate,
			onUpdate,
			onBeforeCreate,
			onCreate,
			onDelete,
		}) => {
			const row = {
				rowIndex,
				rowData,
			};
			if (
				Objects.isAllPropsNotNullOrEmpty(rowData, [
					keyColumn,
					...dsg.otherColumnNames,
				])
			) {
				// 所有欄位都有值(包含 Key)

				console.log("CREATE or UPDATE", rowData);
				const key = _.get(rowData, keyColumn);
				// 新增 或 修改

				if (dsg.isKeyDuplicated(newValue, key)) {
					console.log("[DSG]DuplicatedError detected", key);
					if (onDuplicatedError) {
						onDuplicatedError(row, newValue);
					}
				} else {
					if (isExistingRow(row)) {
						// 確認是否是額外欄位造成的異動
						// Extra UPDATE
						if (isUnchanged(row)) {
							if (onPatch) {
								onPatch(row, newValue);
							}
						} else {
							// UPDATE
							if (onBeforeUpdate) {
								onBeforeUpdate(row);
							}
							if (onUpdate) {
								onUpdate(row, newValue);
							}
						}
					} else {
						// CREATE
						if (onBeforeCreate) {
							onBeforeCreate(row);
						}
						if (onCreate) {
							onCreate(row, newValue);
						}
					}
				}
				dsg.setGridData(newValue);
			} else if (
				!disableAutoDelete &&
				Objects.isAllPropsNull(rowData, [...dsg.otherColumnNames])
			) {
				// 刪除: Key 以外都是 null
				const prevRowData = dsg.prevGridData[rowIndex];
				if (prevRowData) {
					console.log(`DELETE`, row);
					if (onDelete) {
						onDelete(
							{
								rowIndex,
								rowData: prevRowData,
							},
							newValue
						);
					}
				}
			} else {
				dsg.setGridData(newValue);
			}
		},
		[disableAutoDelete, dsg, isExistingRow, isUnchanged, keyColumn]
	);

	const buildGridChangeHandler = useCallback(
		({
				// C
				onBeforeCreate,
				onCreate,
				// U
				onBeforeUpdate,
				onUpdate,
				onPatch,
				// D
				onDelete,
				// E
				onDuplicatedError,
			} = {}) =>
			(newValue, operations) => {
				console.log(`${gridId}.handleGridChange`, newValue);
				// 只處理第一行
				const operation = operations[0];
				console.log("operation", operation);
				if (operation.type === "DELETE") {
					handleDeleteOperation({ operation, newValue, onDelete });
				} else if (operation.type === "CREATE") {
					dsg.setGridData(newValue);
				} else if (operation.type === "UPDATE") {
					const rowIndex = operation.fromRowIndex;
					const rowData = newValue[rowIndex];
					const prevRowData = dsg.prevGridData[rowIndex];
					console.log(`[DSG UPDATE]`, rowData);

					// *** MOVED TO handleDirtyCheck ***
					// const isDirty = isRowDataEquals(prevRowData, rowData);
					// console.log("isDirty", isDirty);

					// const key = _.get(rowData, keyColumn);
					// if (key) {
					// 	if (isDirty) {
					// 		dirtyIds.add(key);
					// 		console.log(`dirtyId ${key} added`);
					// 	} else {
					// 		dirtyIds.delete(key);
					// 		console.log(`dirtyId ${key} removed`);
					// 	}
					// }
					dsg.handleDirtyCheck({ rowData, prevRowData });
					handleUpdateOperation({
						rowIndex,
						rowData,
						newValue,
						onDuplicatedError,
						onPatch,
						onBeforeUpdate,
						onUpdate,
						onBeforeCreate,
						onCreate,
						onDelete,
					});
				} else {
					dsg.setGridData(newValue);
				}
			},
		[gridId, handleDeleteOperation, dsg, handleUpdateOperation]
	);

	return {
		load,
		// handleGridChange,
		handleCreate,
		handleUpdate,
		handleConfirmDelete,
		handleDelete,
		handleDuplicatedError,
		// onRowSelectionChange,
		...dsg,
		// override
		buildGridChangeHandler,
	};
};
