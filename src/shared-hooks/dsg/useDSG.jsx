/* eslint-disable no-mixed-spaces-and-tabs */
import { useToggle } from "@/shared-hooks/useToggle";
import Arrays from "@/shared-modules/sd-arrays";
import Objects from "@/shared-modules/sd-objects";
import Types from "@/shared-modules/sd-types";
import _ from "lodash";
import { useEffect } from "react";
import { useRef } from "react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

const DEFAULT_SET_OPTS = {
	reset: false,
	commit: false,
	prev: null,
};

export const useDSG = ({
	gridId = "NO_NAME",
	keyColumn,
	otherColumns,

	initialLockRows = true,

	createRow: _createRow,
}) => {
	const asyncRef = useRef({
		supressEvents: false
	});
	const [readOnly, toggleReadOnly] = useToggle(initialLockRows);

	const persistedIds = useMemo(() => new Set(), []);
	const dirtyIds = useMemo(() => new Set(), []);
	const deletedIds = useMemo(() => new Set(), []);
	// const [state, setState] = useState({
	// 	gridLoading: null,
	// 	prevGridData: [],
	// 	gridData: null,
	// });

	const [gridLoading, setGridLoading] = useState(null);
	const [prevGridData, setPrevGridData] = useState([]);
	const [gridData, setGridData] = useState([]);

	// const [deletingRow, setDeletingRow] = useState();

	const otherColumnNames = useMemo(() => {
		return Arrays.parse(otherColumns);
	}, [otherColumns]);

	// const setGridLoading = useCallback((value) => {
	// 	setState((prev) => ({
	// 		...prev,
	// 		gridLoading: value,
	// 	}));
	// }, []);

	const isRowDataEquals = useCallback((prevRowData, rowData) => {
		// console.log("isRowDataEquals", prevRowData, rowData);
		return !Objects.arePropsEqual(prevRowData, rowData, {
			ignoresEmpty: true,
		});
	}, []);

	const handleDirtyCheck = useCallback(
		(prevRowData, rowData, opts = {}) => {
			const { debug } = opts;
			const key = _.get(rowData, keyColumn);
			if (!key) {
				return;
			}

			const isDirty = isRowDataEquals(prevRowData, rowData);
			console.log("isDirty", isDirty);

			if (isDirty) {
				dirtyIds.add(key);
				if (debug) {
					console.log(`dirtyId ${key} added`);
				}
			} else {
				dirtyIds.delete(key);
				if (debug) {
					console.log(`dirtyId ${key} removed`);
				}
			}
		},
		[dirtyIds, isRowDataEquals, keyColumn]
	);

	const fillRows = useCallback(
		({ createRow, data, length = 10 }) => {
			const createRowStub = createRow || _createRow;
			if (!createRowStub) {
				throw new Error("未提供 createRow");
			}

			if (!data) {
				return Array.from({ length }, createRowStub);
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
						createRowStub
					),
				];
			}
		},
		[_createRow]
	);

	const resetGridData = useCallback(
		(newValue, opts = DEFAULT_SET_OPTS) => {
			const {
				reset,
				prev,
				commit,
				init,
				debug,
				dirtyCheckByIndex,
				dirtyCheckBy,
				createRow,
				length = 10,
				supressEvents
			} = opts;
			if (supressEvents) {
				asyncRef.current.supressEvents = true;
			}

			dirtyIds.clear();
			persistedIds.clear();
			deletedIds.clear();

			if (reset || init) {
				newValue?.map((item) => {
					const key = _.get(item, keyColumn);
					persistedIds.add(key);
				});
			} else {
				if (dirtyCheckByIndex || dirtyCheckBy) {
					const newGridData = Types.isFunction(newValue)
						? newValue(gridData)
						: newValue;
					// dirtyIds.clear();
					newGridData.forEach((rowData, rowIndex) => {
						let prevRowData = prevGridData[rowIndex];
						if (dirtyCheckBy) {
							const key = _.get(rowData, keyColumn);
							prevRowData = prevGridData.find((item) => {
								const itemKey = _.get(item, keyColumn);
								return itemKey === key;
							});
						}
						handleDirtyCheck(rowData, prevRowData, {
							debug,
						});
					});
				}
			}

			if (commit || init) {
				setPrevGridData(newValue);
			} else if (prev) {
				setPrevGridData(prev);
			}

			setGridData(
				createRow
					? fillRows({ createRow, data: newValue, length })
					: newValue
			);

			setGridLoading(false);

			if (debug) {
				console.log("resetGridData", newValue);
			}
		},
		[deletedIds, dirtyIds, fillRows, gridData, handleDirtyCheck, keyColumn, persistedIds, prevGridData]
	);

	const handleGridDataLoaded = useCallback(
		(payload) => {
			console.log(`${gridId}.onDataLoaded`, payload);
			resetGridData(payload, { reset: true, commit: true });
		},
		[gridId, resetGridData]
	);

	const initGridData = useCallback(
		(payload, opts) => {
			console.log(`${gridId}.onDataLoaded`, payload);
			resetGridData(payload, { ...opts, reset: true, commit: true });
		},
		[gridId, resetGridData]
	);

	const getRowDataByIndex = useCallback(
		(rowIndex) => {
			return gridData[rowIndex];
		},
		[gridData]
	);

	const removeRowByKey = useCallback(
		(key) => {
			const newValue = prevGridData.filter((rowData) => {
				const value = _.get(rowData, keyColumn);
				return value !== key;
			});
			resetGridData(newValue);
		},
		[keyColumn, prevGridData, resetGridData]
	);

	const removeRowByIndex = useCallback(
		(fromRowIndex, toRowIndex) => {
			console.log(`removeRowByIndex`, fromRowIndex, toRowIndex);
			const newValue = prevGridData.filter((_, index) => {
				return index < fromRowIndex || index >= toRowIndex;
			});
			resetGridData(newValue);
		},
		[prevGridData, resetGridData]
	);

	const commitChanges = useCallback(
		(newValue) => {
			console.log(`${gridId}.commitChanges`, newValue);
			persistedIds.clear();
			newValue.map((i) => {
				const key = _.get(i, keyColumn);
				persistedIds.add(key);
			});
			setPrevGridData(newValue || gridData);
		},
		[gridData, gridId, keyColumn, persistedIds]
	);

	const rollbackChanges = useCallback(() => {
		console.log(`${gridId}.rollbackChanges→`, prevGridData);

		setGridData(prevGridData);
		setGridLoading(false);
		dirtyIds.clear();
	}, [dirtyIds, gridId, prevGridData]);

	const isKeyDuplicated = useCallback(
		(newValue, key, _keyColumn) => {
			return (
				newValue.filter((i) => {
					const prevKey = _.get(i, _keyColumn || keyColumn);
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
		(rowData, newValues, opts) => {
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

	const handleGridChange = useCallback(
		(newValue, operations) => {
			console.log(`${gridId}.handleGridChange`, newValue);
			// 只處理第一行
			const operation = operations[0];
			console.log("operation", operation);
			if (operation.type === "CREATE") {
				setGridData(newValue);
			} else if (operation.type === "UPDATE") {
				const rowIndex = operation.fromRowIndex;
				const rowData = newValue[rowIndex];
				const prevRowData = prevGridData[rowIndex];
				console.log(`[DSG UPDATE]`, rowData);

				handleDirtyCheck(rowData, prevRowData);
				setGridData(newValue);
			} else {
				setGridData(newValue);
			}
		},
		[gridId, prevGridData, handleDirtyCheck]
	);

	const buildGridChangeHandler = useCallback(
		({ setValue, getValues, gridMeta, onUpdateRow, onDeleteRowFailed, onGridChanged, ...opts }) =>
			async (newValue, operations) => {
				// console.log("prevGridData", prevGridData);
				// console.log("gridData", gridData);
				const { focusFirstColumnOnCreate = true, dirtyCheckOpts = {
					debug: true
				} } = opts;

				console.log("handleGridChange", operations);
				console.log("newValue", newValue);
				const formData = getValues();
				const newGridData = [...newValue];
				let checkFailed = false;
				for (const operation of operations) {
					if (operation.type === "UPDATE") {

						const updatingRows = newValue
							.slice(
								operation.fromRowIndex,
								operation.toRowIndex
							);
						const updatedRows = onUpdateRow ? await Promise.all(
							updatingRows
								.map(async (item, index) => {
									const updatedRow = await onUpdateRow({
										formData,
										fromIndex: operation.fromRowIndex,
										newValue
									})(item, index);
									return updatedRow;
								})
						) : updatingRows;

						updatedRows.forEach((updatedRowData, index) => {
							const prevRowData = gridData[operation.fromRowIndex + index];
							handleDirtyCheck(updatedRowData, prevRowData, dirtyCheckOpts);

						});

						// 替換成處理過的 rows
						newGridData.splice(
							operation.fromRowIndex,
							updatedRows.length,
							...updatedRows
						);
					} else if (operation.type === "DELETE") {
						// 列舉原資料
						const deletingRows = gridData
							.slice(operation.fromRowIndex, operation.toRowIndex);
						checkFailed = deletingRows
							.some((rowData, i) => {
								if (onDeleteRowFailed && onDeleteRowFailed({ rowData })) {
									const rowIndex = operation.fromRowIndex + i;
									toast.error(
										`不可刪除第 ${rowIndex + 1} 筆商品`
									);
									return true;
								}
								return false;
							});
						if (!checkFailed) {
							deletingRows.forEach((rowData, index) => {
								const key = _.get(rowData, keyColumn);
								if (!key) {
									console.error(`key(${keyColumn}) 的內容是空的`);
								} else {
									if (!deletedIds.has(key)) {
										deletedIds.add(key);
										console.log(`deletedIds added: ${key}`);
									}
								}
							});
						}
					} else if (operation.type === "CREATE") {
						console.log("dsg.CREATE");
						// process CREATE here
						if (focusFirstColumnOnCreate) {
							if (!gridMeta) {
								console.warn("focusFirstColumnOnCreate is TRUE, but gridMeta is not provided");
							}
							gridMeta?.toFirstColumn({ nextRow: true });
						}
					}
				}
				console.log("after changed", newGridData);
				if (!checkFailed) {
					setGridData(newGridData);
					if (onGridChanged) {
						onGridChanged({ gridData: newGridData, setValue });
					}
				}
			},
		[deletedIds, gridData, handleDirtyCheck, keyColumn]
	);

	const setValueByRowIndex = useCallback(
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
			console.log(`setValueByRowIndex(${rowIndex})`, rewritten);
			setGridData(rewritten, opts.callback);
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
		return gridData.filter((rowData) => {
			if (dirtyIds && dirtyIds.size > 0) {
				const key = _.get(rowData, keyColumn);
				return dirtyIds.has(key);
			}
			return false;
		});
	}, [dirtyIds, gridData, keyColumn]);

	const getDeletedRows = useCallback(() => {
		return prevGridData.filter((row) => {
			if (deletedIds && deletedIds.size > 0) {
				const key = _.get(row, keyColumn);
				return deletedIds.has(key);
			}
			return false;
		});
	}, [deletedIds, keyColumn, prevGridData]);

	const handleToggleReadOnly = useCallback(() => {
		rollbackChanges();
		toggleReadOnly();
	}, [rollbackChanges, toggleReadOnly]);

	useEffect(() => {
		// gridData changed, supressEvents reset to false
		if (asyncRef.current.supressEvents) {
			asyncRef.current.supressEvents = false;
			console.log("supressEvents reset to false"); e
		}
	}, [gridData]);

	return {
		// STATES
		// ...state,
		gridData,
		prevGridData,
		gridLoading,
		setGridData: resetGridData,
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
		setValueByRowIndex,

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

		isDirty: dirtyIds && dirtyIds.size > 0,
		handleDirtyCheck,
		otherColumnNames,
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
		asyncRef
	};
};
