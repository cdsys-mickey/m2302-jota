/* eslint-disable no-mixed-spaces-and-tabs */
import Arrays from "@/shared-modules/sd-arrays";
import Objects from "@/shared-modules/sd-objects";
import { useCallback, useMemo, useRef, useState } from "react";
import { useToggle } from "@/shared-hooks/useToggle";
import _ from "lodash";
import DSG from "../shared-modules/sd-dsg";

export const useDSG = ({
	gridId = "NO_NAME",
	keyColumn,
	otherColumns,
	initialReadOnly = true,
}) => {
	const gridRef = useRef();
	const setGridRef = useCallback((node) => {
		if (node) {
			gridRef.current = node;
		}
	}, []);
	const [readOnly, toggleReadOnly] = useToggle(initialReadOnly);
	// const [isPending, startTransition] = useTransition();
	// const selectedRowIndexRef = useRef();
	// const [selectedRowIndex, setSelectedRowIndex] = useState();
	// const [selectedRow, setSelectedRow] = useState();
	const selectedRowRef = useRef();

	const persistedIds = useMemo(() => new Set(), []);
	const dirtyIds = useMemo(() => new Set(), []);
	// const [state, setState] = useState({
	// 	gridLoading: null,
	// 	prevGridData: [],
	// 	gridData: null,
	// });

	const [gridLoading, setGridLoading] = useState(null);
	const [prevGridData, setPrevGridData] = useState([]);
	const [gridData, setGridData] = useState([]);

	const [deletingRow, setDeletingRow] = useState();

	const otherColumnNames = useMemo(() => {
		return Arrays.parse(otherColumns);
	}, [otherColumns]);

	// const setGridLoading = useCallback((value) => {
	// 	setState((prev) => ({
	// 		...prev,
	// 		gridLoading: value,
	// 	}));
	// }, []);

	const resetGridData = useCallback((newValue) => {
		setPrevGridData(newValue);
		setGridData(newValue);
		setGridLoading(false);
	}, []);

	const handleGridDataLoaded = useCallback(
		(payload) => {
			console.log(`${gridId}.onDataLoaded`, payload);
			dirtyIds.clear();
			persistedIds.clear();
			payload?.map((i) => {
				const key = _.get(i, keyColumn);
				persistedIds.add(key);
			});
			// setState((prev) => ({
			// 	...prev,
			// 	prevGridData: payload,
			// 	gridData: payload,
			// 	gridLoading: false,
			// }));
			resetGridData(payload);
		},
		[dirtyIds, gridId, keyColumn, persistedIds, resetGridData]
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
			// setState((prev) => ({
			// 	...prev,
			// 	prevGridData: newValue,
			// 	gridData: newValue,
			// 	gridLoading: false,
			// }));
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
			// setState((prev) => ({
			// 	...prev,
			// 	prevGridData: newValue,
			// 	gridData: newValue,
			// 	gridLoading: false,
			// }));
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
			// setState((prev) => ({
			// 	...prev,
			// 	prevGridData: newValue,
			// }));
			setPrevGridData(newValue || gridData);
		},
		[gridData, gridId, keyColumn, persistedIds]
	);

	const rollbackChanges = useCallback(() => {
		console.log(`${gridId}.rollbackChanges→`, prevGridData);

		// setState((prev) => ({
		// 	...prev,
		// 	gridData: state.prevGridData,
		// 	gridLoading: false,
		// }));
		setGridData(prevGridData);
		setGridLoading(false);
		dirtyIds.clear();
	}, [dirtyIds, gridId, prevGridData]);

	// const setGridData = useCallback((newValue) => {
	// 	// console.log(`${gridId}.setGridData()`, newValue);
	// 	setState((prev) => ({
	// 		...prev,
	// 		gridData: newValue,
	// 		gridLoading: false,
	// 	}));
	// }, []);

	const isExistingRow = useCallback(
		({ rowData }) => {
			return prevGridData.some((prevRowData) => {
				const prevKey = _.get(prevRowData, keyColumn);
				const key = _.get(rowData, keyColumn);
				return prevKey === key;
			});
		},
		[keyColumn, prevGridData]
	);

	const isUnchanged = useCallback(
		(row) => {
			const prevRowData = prevGridData[row.rowIndex];
			const prevKey = _.get(prevRowData, keyColumn);
			const rowKey = _.get(row.rowData, keyColumn);

			if (prevKey !== rowKey) {
				throw `keys mismatched ${prevKey} → ${rowKey}`;
			}

			return Objects.arePropsEqual(prevRowData, row.rowData, {
				fields: otherColumnNames,
			});
		},
		[keyColumn, otherColumnNames, prevGridData]
	);

	const isRowDataEquals = useCallback((prevRowData, rowData) => {
		console.log("isRowDataEquals", prevRowData, rowData);
		return !Objects.arePropsEqual(prevRowData, rowData, {
			// ignoresEmpty: true,
		});
	}, []);

	const isKeyDuplicated = useCallback(
		(gridData, key) => {
			return (
				gridData.filter((i) => {
					const prevKey = _.get(i, keyColumn);
					return prevKey === key;
				}).length > 1
			);
		},
		[keyColumn]
	);

	const isDuplicated = useCallback(
		(rowData) => {
			const key = _.get(rowData, keyColumn);
			if (!key) {
				throw new Error(`key ${keyColumn} 為空`, rowData);
			}
			return (
				gridData.filter((i) => {
					const prevKey = _.get(i, keyColumn);
					return prevKey === key;
				}).length > 1
			);
		},
		[gridData, keyColumn]
	);

	const isDuplicating = useCallback(
		(rowData, newValues) => {
			const key = _.get(rowData, keyColumn);
			if (!key) {
				throw new Error(`key ${keyColumn} 為空`, rowData);
			}
			return (
				newValues.filter((i) => {
					const prevKey = _.get(i, keyColumn);
					return prevKey === key;
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
					const fromRowIndex = operation.fromRowIndex;
					const prevFromRowData = prevGridData[fromRowIndex];

					const toRowIndex = operation.toRowIndex;
					const prevToRowData = prevGridData[toRowIndex];

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
						setGridData(newValue);
					}
				} else if (operation.type === "CREATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((row) => {
							console.log(`[DSG CREATE]`, row);
						});
					setGridData(newValue);
				} else if (operation.type === "UPDATE") {
					const rowIndex = operation.fromRowIndex;
					const rowData = newValue[rowIndex];
					const prevRowData = prevGridData[rowIndex];

					const isDirty = isRowDataEquals(prevRowData, rowData);
					console.log("isDirty", isDirty);

					const row = {
						rowIndex,
						rowData,
					};
					console.log(`[DSG UPDATE]`, rowData);
					const key = _.get(rowData, keyColumn);
					if (key) {
						if (isDirty) {
							dirtyIds.add(key);
							console.log(`dirtyId ${key} added`);
						} else {
							dirtyIds.delete(key);
							console.log(`dirtyId ${key} removed`);
						}
					}
					// 所有欄位都有值(包含 Key)
					if (
						Objects.isAllPropsNotNullOrEmpty(rowData, [
							keyColumn,
							...otherColumnNames,
						])
					) {
						console.log("CREATE or UPDATE", rowData);

						// 新增 或 修改

						if (isKeyDuplicated(newValue, key)) {
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
						setGridData(newValue);
					} else if (
						Objects.isAllPropsNull(rowData, [...otherColumnNames])
					) {
						// 刪除: Key 以外都是 null
						const prevRowData = prevGridData[rowIndex];
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
						setGridData(newValue);
					}
				} else {
					setGridData(newValue);
				}
			},
		[
			gridId,
			prevGridData,
			isRowDataEquals,
			keyColumn,
			otherColumnNames,
			dirtyIds,
			isKeyDuplicated,
			isExistingRow,
			isUnchanged,
		]
	);

	const setValueByRowIndex = useCallback(
		(rowIndex, newValueObj, newGridData) => {
			const newValue = newGridData || gridData;
			const rewritten = newValue.map((rowData, i) =>
				i === rowIndex
					? {
							...rowData,
							...newValueObj,
					  }
					: rowData
			);
			console.log(`rewrite(${rowIndex})`, rewritten);
			// setState((prev) => ({
			// 	...prev,
			// 	gridData: rewritten,
			// }));
			setGridData(rewritten);
		},
		[gridData]
	);

	const isPersisted = useCallback(
		({ rowData, rowIndex }) => {
			if (!rowData) {
				return false;
			}
			const key = _.get(rowData, keyColumn);

			return [...persistedIds].indexOf(key) === rowIndex;
		},
		[keyColumn, persistedIds]
	);

	const handleActiveCellChange = useCallback(({ cell }) => {
		console.log(`DSG.onActiveCellChange →`, cell);
	}, []);

	// const isAllFieldsNotNull = useCallback(
	// 	(row) => {
	// 		return Objects.isAllPropsNotNull(row, [
	// 			keyColumn,
	// 			...otherColumnNames,
	// 		]);
	// 	},
	// 	[keyColumn, otherColumnNames]
	// );

	const setSelectedRow = useCallback((row) => {
		console.log(`setSelectedRow(row)`, row);
		selectedRowRef.current = row;
	}, []);

	const getSelectedRow = useCallback(() => {
		return selectedRowRef.current;
	}, []);

	/**
	 * onRowSelectionChange 的預設實作
	 */
	const defaultOnRowSelectionChange = useCallback(
		(row) => {
			setSelectedRow(row);
			// selectedRowRef.current = row;

			const { rowIndex, rowData } = row || {};
			if (rowIndex === undefined || rowIndex == null) {
				console.log("defaultOnRowSelectionChange: de-selected");
			} else {
				console.log(
					`defaultOnRowSelectionChange ${gridId}.rows[${rowIndex}] selected, rowData:`,
					rowData
				);
			}
		},
		[gridId, setSelectedRow]
	);

	const getRowClassName = useCallback(({ rowIndex } = {}) => {
		if (rowIndex === undefined || rowIndex == null) {
			return undefined;
		}
		return rowIndex === selectedRowRef.current?.rowIndex
			? DSG.SELECTED_ROW_CLASSNAME
			: undefined;
	}, []);

	const handleSelectionChange = useCallback(
		({ onRowSelectionChange = defaultOnRowSelectionChange } = {}) =>
			({ selection }) => {
				// console.log(
				// 	`${gridId}.handleSelectionChange, selection:`,
				// 	selection
				// );
				if (selection) {
					if (selection?.min?.row === selection?.max?.row) {
						const rowIndex = selection?.min?.row;
						const rowData = getRowDataByIndex(rowIndex);
						// setSelectedRowIndex(rowIndex);
						onRowSelectionChange({
							rowIndex,
							rowData,
						});
					} else {
						// setSelectedRowIndex(undefined);
						onRowSelectionChange(undefined);
					}
				}
			},
		[defaultOnRowSelectionChange, getRowDataByIndex]
	);

	const setActiveCell = useCallback(
		(newCell) => {
			console.log(`${gridId}.setActiveCell`, newCell);
			if (gridRef.current) {
				gridRef.current?.setActiveCell(newCell);
			} else {
				console.log(
					`${gridId}.setActiveCell(${JSON.stringify(
						newCell
					)}) failed: gridRef.current is null`
				);
			}
		},
		[gridId]
	);

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
		return gridData.filter((row) => {
			if (dirtyIds && dirtyIds.size > 0) {
				const key = _.get(row, keyColumn);
				return dirtyIds.has(key);
			}
			return false;
		});
	}, [dirtyIds, gridData, keyColumn]);

	// const isDirty = useMemo(() => {
	// 	return dirtyIds && dirtyIds.size > 0;
	// }, [dirtyIds]);

	const handleToggleReadOnly = useCallback(() => {
		rollbackChanges();
		toggleReadOnly();
	}, [rollbackChanges, toggleReadOnly]);

	return {
		// STATES
		// ...state,
		gridData,
		prevGridData,
		gridLoading,
		setGridData: resetGridData,
		//
		gridRef,
		setGridRef,
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
		isPersisted,
		handleActiveCellChange,
		handleSelectionChange,
		// isAllFieldsNotNull,
		// DELETING
		deletingRow,
		setDeletingRow,
		removeRowByKey,
		removeRowByIndex,
		getRowDataByIndex,
		setValueByRowIndex,
		setActiveCell,
		// 鎖定列
		readOnly,
		// toggleReadOnly,
		toggleReadOnly: handleToggleReadOnly,
		// dirty check
		dirtyIds,
		getDirtyRows,
		isKeyDuplicated,
		isDuplicated,
		isDuplicating,
		// 繪製選取列
		getRowClassName,
		setSelectedRow,
		getSelectedRow,
		selectedRowRef,
		isDirty: dirtyIds && dirtyIds.size > 0,
	};
};
