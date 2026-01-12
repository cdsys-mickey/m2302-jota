/* eslint-disable no-mixed-spaces-and-tabs */
import { toastEx } from "shared-components/toast-ex";
import { useToggle } from "@/shared-hooks/useToggle";
import Objects from "@/shared-modules/Objects.mjs";
import Types from "@/shared-modules/Types.mjs";
import _ from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import Fields from "@/shared-modules/Fields.mjs";
import CommonCSS from "@/shared-modules/CommonCSS.mjs";
import CommonStyles from "@/shared-modules/CommonStyles.mjs";

const DEFAULT_SET_DATA_OPTS = {
	reset: false,
	commit: false,
	prev: null,
	doDirtyCheck: false,
	doDirtyCheckByIndex: false,
	debug: false,
	init: false,
	supressEvents: false,
};

const DEFAULT_ON_DELETE_ROW =
	({ fromRowIndex, updateResult }) =>
	(rowData, index) => {
		const rowIndex = fromRowIndex + index;
		updateResult.rowIndex = rowIndex;

		console.log(`刪除第 ${rowIndex + 1} 列...`, rowData);
		updateResult.rows++;
	};

export const useDSG = ({
	gridId = "NO_NAME",
	keyColumn,
	otherColumns: _otherColumns,

	initialLockRows = true,

	createRow: _createRow,
	onUpdateRow: _onUpdateRow,
	onGridChanged,
	doDirtyCheck = false,
	doDirtyCheckByIndex = false,
}) => {
	const asyncRef = useRef({
		supressEvents: false,
	});
	const [readOnly, toggleReadOnly, handleLock, handleUnlock] =
		useToggle(initialLockRows);

	const persistedIds = useMemo(() => new Set(), []);
	const dirtyIds = useMemo(() => new Set(), []);
	const deletedIds = useMemo(() => new Set(), []);
	// const [state, setState] = useState({
	// 	gridLoading: null,
	// 	prevGridData: [],
	// 	gridData: null,
	// });

	const [gridLoading, setGridLoading] = useState(null);
	// const [prevGridData, setPrevGridData] = useState([]);
	const prevGridDataRef = useRef([]);
	const setPrevGridData = useCallback((newValue) => {
		console.log("prevGridDataRef.current=", newValue);
		prevGridDataRef.current = newValue;
	}, []);
	const [gridData, setGridData] = useState([]);

	const otherColumns = useMemo(() => {
		return Fields.parse(_otherColumns);
	}, [_otherColumns]);

	/**
	 * 所有其他欄位
	 */
	const otherColumnNames = useMemo(() => {
		return Object.keys(otherColumns);
	}, [otherColumns]);

	/**
	 * 需要檢查的欄位(排除 nullable: true 的欄位)
	 */
	const checkColumnNames = useMemo(() => {
		return Object.keys(otherColumns).filter(
			(key) => otherColumns[key]?.nullble !== true
		);
	}, [otherColumns]);

	const isRowDataEquals = useCallback((prevRowData, rowData) => {
		const result = Objects.arePropsEqual(prevRowData, rowData, {
			ignoresEmpty: true,
			deepCompare: true,
		});
		console.log(`isRowDataEquals: ${result}`, prevRowData, rowData);
		return result;
	}, []);

	const getRowKey = useCallback(
		(rowData, rowIndex) => {
			if (!doDirtyCheckByIndex && !keyColumn) {
				console.error(
					"未啟用 doDirtyCheckByIndex 或未定義 keyColumn, 無法執行 getRowKey"
				);
				return;
			}
			return doDirtyCheckByIndex ? rowIndex : _.get(rowData, keyColumn);
		},
		[doDirtyCheckByIndex, keyColumn]
	);

	const handleDirtyCheck = useCallback(
		(prevRowData, rowData, rowIndex, opts = {}) => {
			const { debug } = opts;
			// const key = byIndex ? rowIndex : _.get(rowData, keyColumn);
			const key = getRowKey(rowData, rowIndex);

			const isDirty = !isRowDataEquals(prevRowData, rowData);

			if (isDirty) {
				if (!dirtyIds.has(key)) {
					dirtyIds.add(key);
					if (debug) {
						console.log(`dirtyId ${key} added`);
					}
				}
			} else {
				if (dirtyIds.has(key)) {
					dirtyIds.delete(key);
					if (debug) {
						console.log(`dirtyId ${key} removed`);
					}
				}
			}
			return isDirty;
		},
		[dirtyIds, getRowKey, isRowDataEquals]
	);

	const fillRows = useCallback(
		({ createRow, data, length = 10 }) => {
			const createRowMethod = createRow || _createRow;
			if (!createRowMethod) {
				console.error("useDSG 及 fillRow 均未提供 createRow");
				throw new Error("fillRows failed");
			}

			if (!data) {
				return Array.from({ length }, createRowMethod);
			} else {
				if (!Types.isArray(data)) {
					throw new Error("data 並非 array");
				}

				if (data.length >= length) {
					return data;
				}
				return [
					...data,
					...Array.from(
						{ length: length - data.length },
						createRowMethod
					),
				];
			}
		},
		[_createRow]
	);

	const _setGridData = useCallback(
		(newValue, opts) => {
			const {
				reset = false,
				prev: prevData = null,
				commit = false,
				init,
				debug,
				createRow,
				length = 10,
				supressEvents,
				fillRows: _fillRows,
				doDirtyCheck: _doDirtyCheck,
				doDirtyCheckByIndex: _doDirtyCheckByIndex,
			} = opts || DEFAULT_SET_DATA_OPTS;

			if (supressEvents) {
				asyncRef.current.supressEvents = true;
			}

			const doFillRows = !!_fillRows;
			const _length = Types.isNumber(_fillRows) ? _fillRows : length;

			setGridData((prev) => {
				let updatedGridData;
				if (Types.isFunction(newValue)) {
					updatedGridData = newValue(prev);
				} else {
					updatedGridData = newValue;
				}

				let filledGridData;
				if (doFillRows) {
					filledGridData = fillRows({
						createRow,
						data: updatedGridData,
						length: _length,
					});
					updatedGridData = filledGridData; // 確保後續邏輯使用填充後的數據
				}

				// 在這裡處理依賴 updatedGridData 的邏輯
				if (reset || init) {
					dirtyIds.clear();
					persistedIds.clear();
					deletedIds.clear();
					updatedGridData?.map((rowData) => {
						const key = _.get(rowData, keyColumn);
						// const key = getRowKey(rowData, rowIndex, { byIndex: _doDirtyCheckByIndex });
						if (key) {
							persistedIds.add(key);
						}
					});
				} else if (_doDirtyCheck || _doDirtyCheckByIndex) {
					updatedGridData.forEach((rowData, rowIndex) => {
						// 以 index 取出 prev
						let prevRowData = prevGridDataRef.current[rowIndex];
						// 以 key 取出 prev
						if (_doDirtyCheck) {
							const key = _.get(rowData, keyColumn);
							prevRowData = prevGridDataRef.current.find(
								(item) => {
									const itemKey = _.get(item, keyColumn);
									return itemKey === key;
								}
							);
						}
						handleDirtyCheck(rowData, prevRowData, rowIndex, {
							debug,
						});
					});
				}

				if (commit || init) {
					setPrevGridData(updatedGridData);
					console.log(
						"prevGridData after commit/init",
						updatedGridData
					);
				} else if (prevData) {
					setPrevGridData(prevData);
					console.log("prevGridData of prev", prevData);
				}

				setGridLoading(false);

				if (debug) {
					console.log("_setGridData", updatedGridData);
				}

				return updatedGridData; // 返回最終的數據
			});
		},
		[
			fillRows,
			dirtyIds,
			persistedIds,
			deletedIds,
			keyColumn,
			handleDirtyCheck,
			setPrevGridData,
		]
	);

	const handleGridDataLoaded = useCallback(
		(payload) => {
			console.log(`${gridId}.onDataLoaded`, payload);
			_setGridData(payload, { reset: true, commit: true });
		},
		[gridId, _setGridData]
	);

	const initGridData = useCallback(
		(payload, opts) => {
			console.log(`${gridId}.onDataLoaded`, payload);
			_setGridData(payload, {
				...opts,
				reset: true,
				commit: true,
				supressEvents: true,
			});
		},
		[gridId, _setGridData]
	);

	const getRowDataByIndex = useCallback(
		(rowIndex) => {
			return gridData[rowIndex];
		},
		[gridData]
	);

	const removeRowByKey = useCallback(
		(key) => {
			const newValue = prevGridDataRef.current.filter((rowData) => {
				const value = _.get(rowData, keyColumn);
				return value !== key;
			});
			_setGridData(newValue);
		},
		[keyColumn, prevGridDataRef, _setGridData]
	);

	const removeRowByIndex = useCallback(
		(fromRowIndex, toRowIndex) => {
			console.log(`removeRowByIndex`, fromRowIndex, toRowIndex);
			const newValue = prevGridDataRef.filter((_, index) => {
				return index < fromRowIndex || index >= toRowIndex;
			});
			_setGridData(newValue);
		},
		[_setGridData]
	);

	const commitChanges = useCallback(
		(newValue) => {
			const _newValue = newValue ?? gridData;
			console.log(`${gridId}.commitChanges`, _newValue);
			persistedIds.clear();
			_newValue.map((rowData) => {
				const key = _.get(rowData, keyColumn);
				persistedIds.add(key);
			});
			setPrevGridData(_newValue);
			// handleLock();
		},
		[gridData, gridId, keyColumn, persistedIds, setPrevGridData]
	);

	const rollbackChanges = useCallback(() => {
		console.log(`${gridId}.rollbackChanges→`, prevGridDataRef.current);

		setGridData(prevGridDataRef.current);
		setGridLoading(false);
		dirtyIds.clear();
	}, [dirtyIds, gridId, prevGridDataRef]);

	const isKeyDuplicated = useCallback(
		(newValue, key, _keyColumn) => {
			return (
				newValue.filter((rowData) => {
					const prevKey = _.get(rowData, _keyColumn || keyColumn);
					return prevKey === key;
				}).length > 1
			);
		},
		[keyColumn]
	);

	const isDuplicated = useCallback(
		(rowData, opts) => {
			const { key: _keyColumn } = opts;
			const activeKeyColumn = _keyColumn || keyColumn;
			const keyValue = _.get(rowData, activeKeyColumn);
			if (!keyValue) {
				throw new Error(`key ${keyColumn} 為空`, rowData);
			}
			return (
				gridData.filter((i) => {
					const prevKey = _.get(i, activeKeyColumn);
					return prevKey === keyValue;
				}).length > 1
			);
		},
		[gridData, keyColumn]
	);

	const isDuplicating = useCallback(
		(rowData, newValues, opts = {}) => {
			const { key: _keyColumn } = opts;
			const activeKeyColumn = _keyColumn || keyColumn;
			const keyValue = _.get(rowData, activeKeyColumn);
			if (!keyValue) {
				throw new Error(`key ${keyColumn} 為空`, rowData);
			}
			return (
				newValues.filter((i) => {
					const prevKey = _.get(i, activeKeyColumn);
					return prevKey === keyValue;
				}).length > 1
			);
		},
		[keyColumn]
	);

	const propagateGridChange = useCallback(
		(newValue) => {
			console.log(`${gridId}.propagateGridChange`);
			setGridData(newValue);
		},
		[gridId, setGridData]
	);

	// 簡單的 Grid.onChange 實作，目前應該只有 ZA03 與 A011~A015 在使用
	// 會使用 dirty check
	const handleGridChange = useCallback(
		(newValue, operations) => {
			console.log(`${gridId}.handleGridChange`, newValue);
			// 只處理第一個 operation 的第一行
			const operation = operations[0];
			console.log("operation", operation);
			if (operation.type === "CREATE") {
				setGridData(newValue);
			} else if (operation.type === "UPDATE") {
				const rowIndex = operation.fromRowIndex;
				const rowData = newValue[rowIndex];
				const prevRowData = prevGridDataRef.current[rowIndex];
				console.log(`[DSG UPDATE]`, rowData);

				const dirty = handleDirtyCheck(prevRowData, rowData, rowIndex);
				console.log("dirty", dirty);
				setGridData(newValue);
			} else {
				setGridData(newValue);
			}
		},
		[gridId, prevGridDataRef, handleDirtyCheck]
	);

	/**
	 *
	 */
	const buildGridChangeHandler = useCallback(
		({
				setValue,
				getValues,
				gridMeta,
				onUpdateRow,
				onDeleteRow = DEFAULT_ON_DELETE_ROW,
				isRowDeletable,
				onDeleteRowFailed,
				onGridChanged,
				isRowCreatable = true,
				...opts
			}) =>
			async (newValue, operations) => {
				const {
					focusFirstColumnOnCreate = true,
					dirtyCheckOpts = {
						// debug: true
					},
				} = opts;

				const __onUpdateRow = onUpdateRow || _onUpdateRow;

				console.log("onGridChange.operations", operations);
				console.log("newValue", newValue);
				const formData = getValues ? getValues() : null;
				const newGridData = [...newValue];
				let checkFailed = false;
				let updateResult = {
					rows: 0,
					rowIndex: -1,
					cols: [],
				};
				for (const operation of operations) {
					updateResult.type = operation.type;
					if (operation.type === "UPDATE") {
						if (!asyncRef.current.supressEvents) {
							// 處理同行同時更新
							const updatingRows = newValue.slice(
								operation.fromRowIndex,
								operation.toRowIndex
							);
							const updatedRows = __onUpdateRow
								? await Promise.all(
										updatingRows.map(
											async (item, index) => {
												const updatedRow =
													await __onUpdateRow({
														formData,
														setValue,
														fromRowIndex:
															operation.fromRowIndex,
														newValue,
														oldValue: gridData,
														gridMeta,
														updateResult,
													})(item, index);
												return updatedRow;
											}
										)
								  )
								: updatingRows;

							if (doDirtyCheck || doDirtyCheckByIndex) {
								updatedRows.forEach((updatedRowData, index) => {
									const rowIndex =
										operation.fromRowIndex + index;
									// 以 index 取出 prev
									let prevRowData =
										prevGridDataRef.current[rowIndex];
									// 以 key 取出 prev
									if (doDirtyCheck) {
										const key = _.get(
											updatedRows,
											keyColumn
										);
										prevRowData =
											prevGridDataRef.current.find(
												(item) => {
													const itemKey = _.get(
														item,
														keyColumn
													);
													return itemKey === key;
												}
											);
									}
									// 以 index 作為比對依據
									const dirty = handleDirtyCheck(
										updatedRowData,
										prevRowData,
										rowIndex,
										{
											...dirtyCheckOpts,
										}
									);
									console.log("dirty", dirty);
								});
							}

							// 替換成處理過的 rows
							newGridData.splice(
								operation.fromRowIndex,
								updatedRows.length,
								...updatedRows
							);
						} else {
							console.log(
								"grid.asyncRef.supressEvents is TRUE, grid changes not triggered"
							);
						}
					} else if (operation.type === "DELETE") {
						// 列舉原資料
						const deletingRows = gridData.slice(
							operation.fromRowIndex,
							operation.toRowIndex
						);
						// 檢查是否可刪除
						checkFailed = deletingRows.some((rowData, i) => {
							const key = _.get(rowData, keyColumn);
							if (
								isRowDeletable &&
								!isRowDeletable({ key, rowData })
							) {
								const rowIndex = operation.fromRowIndex + i;
								toastEx.error(
									`不可刪除第 ${rowIndex + 1} 筆商品`
								);
								return true;
							}
							return false;
						});
						if (!checkFailed) {
							const promises = deletingRows.map(
								async (rowData, index) => {
									// const key = _.get(rowData, keyColumn);
									const rowIndex =
										operation.fromRowIndex + index;
									const key = getRowKey(rowData, rowIndex);

									if (!key) {
										console.error(
											`key(${keyColumn}) 的內容是空的`
										);
									} else {
										if (onDeleteRow) {
											try {
												//await 在這裡沒有用?
												await onDeleteRow({
													fromRowIndex:
														operation.fromRowIndex,
													toRowIndex:
														operation.toRowIndex,
													updateResult,
												})(rowData, index);
											} catch (err) {
												if (onDeleteRowFailed) {
													await onDeleteRowFailed({
														fromRowIndex:
															operation.fromRowIndex,
														toRowIndex:
															operation.toRowIndex,
														updateResult,
													})(rowData, index);
												}
											}
										}
										if (!deletedIds.has(key)) {
											deletedIds.add(key);
											console.log(
												`deletedIds added: ${key}`
											);
										}
									}
								}
							);
							await Promise.all(promises);
						}
					} else if (operation.type === "CREATE") {
						if (isRowCreatable) {
							console.log("dsg.CREATE");
							// process CREATE here
							if (focusFirstColumnOnCreate) {
								if (!gridMeta) {
									console.warn(
										"focusFirstColumnOnCreate is TRUE, but gridMeta is not provided in buildGridChangeHandler method"
									);
								}
								gridMeta?.toFirstColumn({ nextRow: true });
							}
						} else {
							checkFailed = true;
							if (!gridMeta) {
								console.warn(
									"isRowCreatable is FALSE, but gridMeta is not provided, setActiveCell failed"
								);
							}
							const activeCell = gridMeta.getActiveCell();
							console.log("getActiveCell", activeCell);
							// setActiveCell back to prev in next render cycle
							toastEx.error("新增功能目前已停用", {
								position: "top-right",
							});
							setTimeout(() => {
								gridMeta.setActiveCell(activeCell);
							});
						}
					}
				}
				console.log("Promise.all after changed", newGridData);
				let updated = null;
				if (
					onGridChanged &&
					!asyncRef.current.supressEvents &&
					(updateResult.rows > 0 ||
						updateResult.cols.length > 0 ||
						updateResult.type === "DELETE")
				) {
					console.log("onGridChanged", newGridData);
					if (!setValue) {
						console.warn(
							"%csetValue 為空, onGridChanged 可能不會正確觸發"
						);
					}
					updated = await onGridChanged({
						prevGridData: prevGridDataRef.current,
						gridData: newGridData,
						formData,
						setValue,
						updateResult,
					});
				}

				if (!checkFailed) {
					if (updated) {
						console.log(
							`%conGridChanged:`,
							CommonStyles.CONSOLE_INFO,
							updated
						);
						setGridData(updated);
					} else {
						setGridData(newGridData);
					}
				}
			},
		[
			_onUpdateRow,
			doDirtyCheck,
			doDirtyCheckByIndex,
			gridData,
			handleDirtyCheck,
			keyColumn,
			deletedIds,
		]
	);

	const spreadOnRow = useCallback(
		(rowIndex, newValueObj, opts = {}) => {
			const newValue = opts.data || gridData;
			const rewritten = newValue.map((rowData, i) =>
				i === rowIndex
					? {
							...rowData,
							...newValueObj,
					  }
					: rowData
			);
			console.log(`spreadOnRow(${rowIndex})`, rewritten);
			setGridData(rewritten);
		},
		[gridData]
	);

	const isPersisted = useCallback(
		({ rowData, rowIndex }) => {
			if (!keyColumn) {
				throw new Error("未定義 keyColumn, 無法使用 isPersisted");
			}
			if (!rowData) {
				return false;
			}
			const key = _.get(rowData, keyColumn);
			if (!key) {
				return false;
			}
			return [...persistedIds].indexOf(key) === rowIndex;
		},
		[keyColumn, persistedIds]
	);

	// const isAllFieldsNotNull = useCallback(
	// 	(row) => {
	// 		return Objects.isAllPropsNotNull(row, [
	// 			keyColumn,
	// 			...otherColumnNames,
	// 		]);
	// 	},
	// 	[keyColumn, otherColumnNames]
	// );

	const clearGridData = useCallback(() => {
		setGridData([]);
	}, [setGridData]);

	// const onRowSelectionChange = useCallback(
	// 	({ rowIndex, rowData } = {}) => {
	// 		console.log(`${gridId}[${rowIndex}] selected, data:`, rowData);
	// 	},
	// 	[gridId]
	// );

	// const toggleReadOnly = useCallback((enabled) => {
	// 	setLockRows(!enabled);
	// }, []);

	const getDirtyRows = useCallback(() => {
		if (!doDirtyCheck && !doDirtyCheckByIndex) {
			throw new Error(
				"cannot getDirtyRows without doDirtyCheck OR doDirtyCheckByIndex"
			);
		}

		if (!dirtyIds || dirtyIds.size === 0) {
			return [];
		}

		if (doDirtyCheckByIndex) {
			return Array.from(dirtyIds)
				.map((index) => gridData[index])
				.filter((row) => row !== undefined);
		}

		return gridData.filter((rowData) => {
			if (dirtyIds && dirtyIds.size > 0) {
				const key = _.get(rowData, keyColumn);
				return dirtyIds.has(key);
			}
			return false;
		});
	}, [dirtyIds, doDirtyCheck, doDirtyCheckByIndex, gridData, keyColumn]);

	const getDeletedRows = useCallback(() => {
		return prevGridDataRef.current.filter((row) => {
			if (deletedIds && deletedIds.size > 0) {
				const key = _.get(row, keyColumn);
				return deletedIds.has(key);
			}
			return false;
		});
	}, [deletedIds, keyColumn, prevGridDataRef]);

	const handleToggleReadOnly = useCallback(() => {
		rollbackChanges();
		toggleReadOnly();
	}, [rollbackChanges, toggleReadOnly]);

	const supressEvents = useCallback(() => {
		asyncRef.current.supressEvents = true;
		console.log(
			`%c****** ${DSGContext.displayName}.supressEvent ON ******`,
			CommonCSS.CONSOLE_WARN
		);
	}, []);

	const enableEvents = useCallback(() => {
		asyncRef.current.supressEvents = false;
		console.log(
			`%c****** ${DSGContext.displayName}.supressEvent OFF ******`,
			CommonCSS.CONSOLE_SUCCESS
		);
	}, []);

	const checkDirty = useCallback(() => {
		return dirtyIds?.length > 0;
	}, [dirtyIds?.length]);

	useEffect(() => {
		// gridData changed, supressEvents reset to false
		if (asyncRef.current.supressEvents) {
			asyncRef.current.supressEvents = false;
			console.log("supressEvents reset to false");
		}
	}, [gridData]);

	return {
		// STATES
		// ...state,
		gridData,
		prevGridData: prevGridDataRef.current,
		gridLoading,
		setGridData: _setGridData,
		initGridData,

		gridId,
		keyColumn,
		setGridLoading,
		handleGridDataLoaded,
		propagateGridChange, // 單純 passthrough data
		commitChanges,
		rollbackChanges,
		// setGridData,
		clearGridData,
		handleGridChange,
		buildGridChangeHandler,
		isPersisted,
		// handleActiveCellChange,
		// buildSelectionChangeHandler,
		// isAllFieldsNotNull,
		// DELETING
		// deletingRow,
		// setDeletingRow,
		removeRowByKey,
		removeRowByIndex,
		getRowDataByIndex,
		spreadOnRow,

		// 鎖定列
		readOnly,
		// toggleReadOnly,
		toggleReadOnly: handleToggleReadOnly,
		// dirty check
		dirtyIds,
		deletedIds,
		getDirtyRows,
		getDeletedRows,
		isKeyDuplicated,
		isDuplicated,
		isDuplicating,

		isDirty:
			(dirtyIds && dirtyIds.size > 0) ||
			(deletedIds && deletedIds.size > 0),
		handleDirtyCheck,
		otherColumns,
		otherColumnNames,
		checkColumnNames,
		fillRows,
		// Ref Methods
		// setActiveCell,
		// getActiveCell,
		// getSelection,
		// setSelection,
		// isCellDisabled,
		// columns,
		// getNextCell,
		// nextCell,
		// skipDisabled,
		// toFirstColumn,
		// lastCell,
		asyncRef,
		handleUnlock,
		handleLock,
		supressEvents,
		enableEvents,
		onUpdateRow: _onUpdateRow,
		onGridChanged,
		checkDirty,
	};
};
