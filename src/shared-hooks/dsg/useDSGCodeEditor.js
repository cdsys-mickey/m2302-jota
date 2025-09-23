/* eslint-disable no-mixed-spaces-and-tabs */
import { AuthContext } from "@/contexts/auth/AuthContext";
import { toastEx } from "@/helpers/toastEx";
import _ from "lodash";
import { nanoid } from "nanoid";
import { useCallback, useContext, useState } from "react";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import Objects from "../../shared-modules/Objects.mjs";
import { useWebApi } from "../useWebApi";

const defaultTransformForReading = (payload) => {
	return payload?.data || [];
};

const defaultTransformForSubmmit = (payload) => {
	return payload;
};

const DEFAULT_PARAMS = {
	np: 1
}

export const useDSGCodeEditor = ({
	// 要餵給 useDSG 的參數
	// gridId,
	// keyColumn = "CodeID",
	// // nameColumn = "CodeData",
	// otherColumns,
	// initialLockRows = true,
	grid,
	gridMeta,
	baseUri,
	// token,
	displayName = "代碼",
	params: defaultParams = DEFAULT_PARAMS,
	// querystring,
	autoDelete = false,
	transformForReading = defaultTransformForReading,
	transformForSubmitting = defaultTransformForSubmmit,
	onLoaded
}) => {
	const { token } = useContext(AuthContext);
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();

	const dialogs = useContext(DialogsContext);
	const [state, setState] = useState({
		baseUri: baseUri,
	});

	const load = useCallback(
		async ({ params, baseUri, supressLoading = false } = {}) => {
			if (!supressLoading) {
				grid.setGridLoading(true);
			}
			// 至少等 300ms
			await new Promise((resolve) => setTimeout(resolve, 300));

			// 更新 baseUri
			if (baseUri) {
				setState((prev) => ({
					...prev,
					baseUri,
				}));
			}
			const _params = params ?? defaultParams;
			const _uri = baseUri || state.baseUri;

			try {
				const { status, payload } = await httpGetAsync({
					url: _uri,
					bearer: token,
					...(_params && {
						params: _params
					})
					// params: {
					// 	..._params,
					// 	...(querystring && {
					// 		params: queryString.parse(querystring),
					// 	}),
					// },
				});
				if (status.success) {
					if (onLoaded) {
						onLoaded(payload);
					}
					grid.handleGridDataLoaded(transformForReading(payload));
				} else {
					switch (status.code) {
						default:
							toastEx.error(`發生未預期例外 ${status.code}`, {
								position: "top-right"
							});
							break;
					}
				}
			} catch (err) {
				console.error("load", err);
			} finally {
				grid.setGridLoading(false);
			}
		},
		[defaultParams, grid, httpGetAsync, onLoaded, state.baseUri, token, transformForReading]
	);

	const reload = useCallback(() => {
		load({ supressLoading: true });
	}, [load]);

	const handleCreate = useCallback(
		async ({ rowIndex, rowData }, newValue) => {
			console.log(`CREATE`, rowData);
			try {
				const { status, payload, error } = await httpPostAsync({
					url: state.baseUri,
					bearer: token,
					data: transformForSubmitting(rowData),
				});
				console.log("handleCreate response.payload", payload);
				if (status.success) {
					grid.commitChanges(newValue);
					toastEx.success(
						`${displayName} ${rowData[grid.keyColumn]} 新增成功`
					);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				toastEx.error(`新增${displayName}發生例外`, err);
				reload();
				setTimeout(() => {
					gridMeta.setActiveCell(null);
				});
			}
		},
		[displayName, grid, gridMeta, httpPostAsync, reload, state.baseUri, token, transformForSubmitting]
	);

	const handleUpdate = useCallback(
		async ({ rowData }, newValue) => {
			console.log(`UPDATE`, rowData);
			try {
				const { status, payload, error } = await httpPutAsync({
					url: state.baseUri,
					data: transformForSubmitting(rowData),
					bearer: token,
				});
				console.log("handleUpdate response.payload", payload);
				if (status.success) {
					grid.commitChanges(newValue);
					toastEx.success(
						`${displayName} ${rowData[grid.keyColumn]} 修改成功`
					);
				} else {
					throw error?.message || new Error("修改失敗");
				}
			} catch (err) {
				toastEx.error(`修改${displayName}發生例外`, err);
				reload();
			}
		},
		[
			displayName,
			grid,
			httpPutAsync,
			reload,
			state.baseUri,
			token,
			transformForSubmitting,
		]
	);

	const handleDelete = useCallback(
		async (rows, opts = {}) => {
			const { onDeleted, disableToast = false } = opts;
			console.log(`DELETE`, rows);
			try {
				let success = 0;
				let error;
				await Promise.all(
					rows.map(async (rowData) => {
						const key = rowData[grid.keyColumn];
						try {
							const { status, error } = await httpDeleteAsync({
								url: `${state.baseUri}`,
								bearer: token,
								params: {
									id: key
								}
							});

							if (status.success) {
								success++;
							} else {
								throw error || new Error();
							}
						} catch (err) {
							error = err;
						}
					})
				);
				if (success > 0) {
					if (!disableToast) {
						toastEx.success(`刪除成功 ${success} 筆${displayName || ""}`);
					}
					if (onDeleted) {
						onDeleted(rows);
					}
				} else {
					if (!disableToast) {
						toastEx.warn("沒有刪除任何資料" + error?.message ? ": " + error.message : "", {
							position: "top-right"
						});
					}
				}
			} catch (err) {
				console.error(err);
				if (!disableToast) {
					toastEx.error(`刪除${displayName}發生例外`, err);
				}
			} finally {
				// grid.setDeletingRow(null);
				reload();
			}
		},
		[
			displayName,
			grid.keyColumn,
			httpDeleteAsync,
			reload,
			state.baseUri,
			token,
		]
	);

	const isExistingRow = useCallback(
		({ rowData }) => {
			return grid.prevGridData.some((prevRowData) => {
				const prevKey = _.get(prevRowData, grid.keyColumn);
				const key = _.get(rowData, grid.keyColumn);
				return prevKey === key;
			});
		},
		[grid?.keyColumn, grid?.prevGridData]
	);

	const isUnchanged = useCallback(
		({ rowData, rowIndex }) => {
			const prevRowData = grid.prevGridData[rowIndex];
			const prevKey = _.get(prevRowData, grid.keyColumn);
			const rowKey = _.get(rowData, grid.keyColumn);

			if (prevKey !== rowKey) {
				throw `keys mismatched ${prevKey} → ${rowKey}`;
			}

			return Objects.arePropsEqual(prevRowData, rowData, {
				fields: grid.otherColumnNames,
			});
		},
		[grid?.keyColumn, grid?.otherColumnNames, grid?.prevGridData]
	);

	const handleConfirmDelete = useCallback(
		async (rows, opts = {}) => {
			const { onDeleted } = opts;
			if (!rows || rows.length === 0) {
				throw new Error("未指定 rows");
			}



			let message;
			const firstRow = rows[0];
			if (rows.length > 1) {
				const lastRow = rows[rows.length - 1];
				message = ` ${rows.length} 筆${displayName} (${firstRow[grid.keyColumn]
					} ~ ${lastRow[grid.keyColumn]})`;
			} else {
				const key = firstRow[grid.keyColumn];
				message = `${displayName}${!key ? "" : "「" + key + "」"}`;
				// 若整列空白則直接刪除不確認
			}

			gridMeta.saveSelection();
			// if (!effectiveRows || effectiveRows.length == 0) {
			// 	handleDelete(effectiveRows, {
			// 		onDeleted,
			// 		disableToast: true
			// 	});
			// 	dialogs.closeLatest();
			// 	gridMeta.resetSelection();
			// 	toastEx.info("已移除空白的資料")
			// 	return;
			// }
			// deletingRef.current.rows = grid.gridData?.length || 0;

			dialogs.create({
				title: "刪除確認",
				message: `確定要刪除${message}?`,
				triggerCancelOnClose: true,
				onConfirm: () => {
					handleDelete(rows, {
						onDeleted,
					});
					// 下列順序不可改變, 否則會導致對話框未正常關閉

					dialogs.closeLatest();
					gridMeta.resetSelection();
				},
				onCancel: () => {
					grid.rollbackChanges();
					// dialogs.closeLatest();
					// 游標移回原來的位置
					gridMeta.restoreSelection();
				},
				// onClose: () => {
				// 	if (grid.gridData?.length < deletingRef.current.rows) {
				// 		return;
				// 	}
				// 	gridMeta.restoreSelection();
				// },
			});
		},
		[dialogs, displayName, grid, gridMeta, handleDelete]
	);

	const handleDuplicatedError = useCallback(
		(row, newValue) => {
			toastEx.error(`${displayName} ${row.rowData[grid.keyColumn]} 已存在`);

			// 先把重複那筆的 key 清掉
			newValue[row.rowIndex][grid.keyColumn] = "";

			// 使用 reducer 過濾掉 CodeID 為空字串的物件(會因此清掉重複那筆)
			const filteredData = newValue.reduce((acc, item) => {
				if (item.CodeID !== "") {
					acc.push(item);
				}
				return acc;
			}, []);
			grid.setGridData(filteredData, {
				commit: true
			});
			// grid.spreadOnRow(
			// 	row.rowIndex,
			// 	{
			// 		[grid.keyColumn]: "",
			// 	},
			// 	{
			// 		data: newValue,
			// 	}
			// );
			// setTimeout(() => {
			// 	gridMeta.setActiveCell({ row: row.rowIndex, col: 0 });
			// }, 100);
		},
		[displayName, grid]
	);

	const handleDeleteOperation = useCallback(
		({ operation, newValue, onDelete, onDeleted }) => {
			const rows = grid.gridData.slice(
				operation.fromRowIndex,
				operation.toRowIndex
			);

			const effectiveRows = rows.filter(row => row[grid.keyColumn]);

			let goAhead = true;
			if (onDelete && effectiveRows && effectiveRows.length > 0) {
				goAhead = !!onDelete(effectiveRows, { onDeleted });
			}
			if (!goAhead) {
				grid.setGridData(newValue, {
					commit: true
				});
			}
		},
		[grid]
	);

	/**
	 * 行為判斷都是靠第一行, 但處理時資料要餵全部
	 */
	const handleUpdateOperation = useCallback(
		({
			operation,
			newValue,
			onDuplicatedError,
			onPatch,
			onBeforeUpdate,
			onUpdate,
			onBeforeCreate,
			onCreate,
			onDelete,
			onDeleted,
		}) => {
			const firstRow = {
				rowIndex: operation.fromRowIndex,
				rowData: newValue[operation.fromRowIndex],
			};
			const prevRowData = grid.prevGridData[operation.fromRowIndex];
			if (
				Objects.isAllPropsNotNull(firstRow.rowData, [
					// Objects.isAllPropsNotUndefined(firstRow.rowData, [
					grid.keyColumn,
					...grid.checkColumnNames,
				])
			) {
				// 所有欄位都有值(包含 Key)
				grid.handleDirtyCheck(firstRow.rowData, prevRowData);
				console.log("CREATE or UPDATE", firstRow.rowData);
				const key = _.get(firstRow.rowData, grid.keyColumn);
				// 新增 或 修改

				if (grid.isKeyDuplicated(newValue, key)) {
					console.log(`[DSG]${key} duplicated`, firstRow);
					if (onDuplicatedError) {
						onDuplicatedError(firstRow, newValue);
					}
				} else {
					if (isExistingRow(firstRow)) {
						// 確認是否是額外欄位造成的異動
						// Extra UPDATE
						if (isUnchanged(firstRow)) {
							if (onPatch) {
								onPatch(firstRow, newValue);
							}
						} else {
							// UPDATE
							if (onBeforeUpdate) {
								onBeforeUpdate(firstRow);
							}
							if (onUpdate) {
								onUpdate(firstRow, newValue);
							}
						}
						grid.setGridData(newValue, {
							commit: true
						});
					} else {
						// CREATE
						if (onBeforeCreate) {
							onBeforeCreate(firstRow);
						}
						if (onCreate) {
							onCreate(firstRow, newValue);
						}
						grid.setGridData(newValue);
					}

				}

			} else if (
				autoDelete &&
				Objects.isAllPropsNull(firstRow.rowData, [
					...grid.checkColumnNames,
				])
			) {
				// 刪除: Key 以外都是 null, 因為 createRow 好的時候是 undefined,
				// 按下 DELETE 才會清成 null
				const rows = grid.prevGridData.slice(
					operation.fromRowIndex,
					operation.toRowIndex
				);
				console.log(`DELETE`, rows);
				if (onDelete) {
					onDelete(rows, { onDeleted });
				}
			} else {
				grid.setGridData(newValue);
			}
		},
		[autoDelete, grid, isExistingRow, isUnchanged]
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
			onDeleted,
			// E
			onDuplicatedError,
			// Support Methods
			// toFirstColumn,
		} = {}) =>
			(newValue, operations) => {
				console.log(`${grid.gridId}.handleGridChange`, newValue);
				// 只處理第一行
				const operation = operations[0];
				console.log("operation", operation);
				if (operation.type === "DELETE") {
					handleDeleteOperation({
						operation,
						newValue,
						onDelete,
						onDeleted,
					});
				} else if (operation.type === "CREATE") {
					grid.setGridData(newValue);
					// 25.03.25 判斷是否為插入
					const rowIndex = operation.fromRowIndex;
					setTimeout(() => {
						gridMeta?.setActiveCell({
							row: rowIndex,
							col: 0,
						});
					});
				} else if (operation.type === "UPDATE") {
					// const rowIndex = operation.fromRowIndex;
					// const rowData = newValue[rowIndex];
					// const prevRowData = dsg.prevGridData[rowIndex];
					// console.log(`[DSG UPDATE]`, rowData);

					// dsg.handleDirtyCheck({ rowData, prevRowData });
					handleUpdateOperation({
						operation,
						newValue,
						onDuplicatedError,
						onPatch,
						onBeforeUpdate,
						onUpdate,
						onBeforeCreate,
						onCreate,
						onDelete,
						onDeleted,
					});
				} else {
					grid.setGridData(newValue);
				}
			},
		[grid, gridMeta, handleDeleteOperation, handleUpdateOperation]
	);

	const createRow = useCallback(() => ({
		id: nanoid()
	}), []);

	return {
		load,
		// handleGridChange,
		handleCreate,
		handleUpdate,
		handleConfirmDelete,
		handleDelete,
		handleDuplicatedError,
		// onRowSelectionChange,
		// ...grid,
		// override
		buildGridChangeHandler,
		createRow
	};
};
