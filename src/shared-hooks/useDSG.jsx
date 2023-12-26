/* eslint-disable no-mixed-spaces-and-tabs */
import Arrays from "@/shared-modules/sd-arrays";
import Objects from "@/shared-modules/sd-objects";
import { useCallback, useMemo, useRef, useState, useTransition } from "react";
import { useToggle } from "@/shared-hooks/useToggle";

export const useDSG = ({
	gridId = "NO_NAME",
	keyColumn,
	otherColumns,
	initialLockRows = true,
}) => {
	const gridRef = useRef();
	const setGridRef = useCallback((node) => {
		if (node) {
			gridRef.current = node;
		}
	}, []);
	const [lockRows, toggleLockRows] = useToggle(initialLockRows);
	const [isPending, startTransition] = useTransition();
	const selectedRowIndexRef = useRef();

	const persistedIds = useMemo(() => new Set(), []);
	const [state, setState] = useState({
		gridLoading: null,
		prevGridData: [],
		gridData: null,
	});

	const [deletingRow, setDeletingRow] = useState();

	const otherColumnNames = useMemo(() => {
		return Arrays.parse(otherColumns);
	}, [otherColumns]);

	const setGridLoading = useCallback((value) => {
		setState((prev) => ({
			...prev,
			gridLoading: value,
		}));
	}, []);

	const handleGridDataLoaded = useCallback(
		(payload) => {
			// console.debug(`data loaded`, payload);
			console.debug(`${gridId}.onDataLoaded, payload:`, payload);
			persistedIds.clear();
			payload?.map((i) => {
				persistedIds.add(i[keyColumn]);
			});
			setState((prev) => ({
				...prev,
				prevGridData: payload,
				gridData: payload,
				gridLoading: false,
			}));
		},
		[gridId, keyColumn, persistedIds]
	);

	const getRowDataByIndex = useCallback(
		(rowIndex) => {
			return state.gridData[rowIndex];
		},
		[state.gridData]
	);

	const removeByKey = useCallback(
		(key) => {
			const newValue = state.prevGridData.filter(
				(i) => i[keyColumn] !== key
			);
			setState((prev) => ({
				...prev,
				prevGridData: newValue,
				gridData: newValue,
				gridLoading: false,
			}));
		},
		[keyColumn, state.prevGridData]
	);

	const commitChanges = useCallback(
		(newValue) => {
			console.debug(`${gridId}.commitChanges`, newValue);
			persistedIds.clear();
			newValue.map((i) => {
				persistedIds.add(i[keyColumn]);
			});
			setState((prev) => ({
				...prev,
				prevGridData: newValue,
			}));
		},
		[gridId, keyColumn, persistedIds]
	);

	const rollbackChanges = useCallback(() => {
		console.debug(`${gridId}.rollbackChanges`, state.prevGridData);
		setState((prev) => ({
			...prev,
			gridData: state.prevGridData,
			gridLoading: false,
		}));
	}, [gridId, state.prevGridData]);

	const setGridData = useCallback(
		(newValue) => {
			console.debug(`${gridId}.setGridData()`, newValue);
			setState((prev) => ({
				...prev,
				gridData: newValue,
				gridLoading: false,
			}));
		},
		[gridId]
	);

	const isInPrevGridData = useCallback(
		(rowData) => {
			return state.prevGridData.some(
				(i) => i[keyColumn] === rowData[keyColumn]
			);
		},
		[keyColumn, state.prevGridData]
	);

	const isUnchanged = useCallback(
		(row) => {
			const prevData = state.prevGridData[row.rowIndex];
			const prevKey = prevData[keyColumn];
			const rowKey = row.rowData[keyColumn];

			if (prevKey !== rowKey) {
				throw `keys mismatched ${prevKey} → ${rowKey}`;
			}

			return Objects.isAllPropsEqual(
				prevData,
				row.rowData,
				otherColumnNames
			);
		},
		[keyColumn, otherColumnNames, state.prevGridData]
	);

	const isDuplicated = useCallback(
		(key) => {
			return (
				state.gridData.filter((i) => i[keyColumn] === key).length > 1
			);
		},
		[keyColumn, state.gridData]
	);

	const propagateGridChange = useCallback(
		(newValue, _) => {
			console.debug(`${gridId}.propagateGridChange`);
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
				console.debug(`${gridId}.handleGridChange`, newValue);
				// 只處理第一行
				const operation = operations[0];
				console.debug("operation", operation);
				if (operation.type === "DELETE") {
					const rowIndex = operation.fromRowIndex;
					const prevRowData = state.prevGridData[rowIndex];

					if (prevRowData) {
						const row = {
							rowIndex,
							rowData: prevRowData,
						};
						console.debug(`[DSG DELETE]`, row);
						if (onDelete) {
							onDelete(row, newValue);
						}
					} else {
						setGridData(newValue);
					}
				} else if (operation.type === "CREATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((row) => {
							console.debug(`[DSG CREATE]`, row);
						});
					setGridData(newValue);
				} else if (operation.type === "UPDATE") {
					const rowIndex = operation.fromRowIndex;
					const rowData = newValue[rowIndex];
					const row = {
						rowIndex,
						rowData,
					};
					console.debug(`[DSG UPDATE]`, rowData);
					// 所有欄位都有值(包含 Key)
					if (
						Objects.isAllPropsNotNullOrEmpty(rowData, [
							keyColumn,
							...otherColumnNames,
						])
					) {
						setGridData(newValue);
						// 新增 或 修改
						const key = rowData[keyColumn];
						if (isDuplicated(key)) {
							if (onDuplicatedError) {
								onDuplicatedError(row, newValue);
							}
						} else {
							if (isInPrevGridData(rowData)) {
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
					} else if (
						Objects.isAllPropsNull(rowData, [...otherColumnNames])
					) {
						// 刪除: Key 以外都是 null
						const prevRowData = state.prevGridData[rowIndex];
						if (prevRowData) {
							console.debug(`DELETE`, row);
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
			isDuplicated,
			isInPrevGridData,
			isUnchanged,
			keyColumn,
			otherColumnNames,
			setGridData,
			state.prevGridData,
		]
	);

	const rewriteRowValue = useCallback((row, newValue, newValues) => {
		console.debug(`rewriteRowValue ${JSON.stringify(row)}`, newValues);
		setState((prev) => ({
			...prev,
			gridData: newValue.map((v, i) =>
				i === row.rowIndex
					? {
							...v,
							...newValues,
					  }
					: v
			),
		}));
	}, []);

	const isPersisted = useCallback(
		({ rowData, rowIndex }) => {
			if (!rowData) {
				return false;
			}
			const key = rowData[keyColumn];

			return [...persistedIds].indexOf(key) === rowIndex;
		},
		[keyColumn, persistedIds]
	);

	const handleActiveCellChange = useCallback(({ cell }) => {
		console.debug(`DSG.onActiveCellChange →`, cell);
	}, []);

	const isAllFieldsNotNull = useCallback(
		(row) => {
			return Objects.isAllPropsNotNull(row, [
				keyColumn,
				...otherColumnNames,
			]);
		},
		[keyColumn, otherColumnNames]
	);

	/**
	 * onRowSelectionChange 的預設實作
	 */
	const defaultOnRowSelectionChange = useCallback(
		({ rowIndex, rowData }) => {
			console.debug(
				`${gridId}.rows[${rowIndex}] selected, rowData:`,
				rowData
			);
		},
		[gridId]
	);

	const handleSelectionChange = useCallback(
		({ onRowSelectionChange = defaultOnRowSelectionChange }) =>
			({ selection }) => {
				if (
					selection &&
					selectedRowIndexRef.current !== selection?.min?.row
				) {
					selectedRowIndexRef.current = selection?.min?.row;
					const selectedRow = selection
						? getRowDataByIndex(selection?.min?.row)
						: null;
					console.debug(`${gridId}.selectedRow:`, selectedRow);

					startTransition(() => {
						onRowSelectionChange({
							rowIndex: selection?.min?.row,
							rowData:
								selectedRow && isAllFieldsNotNull(selectedRow)
									? selectedRow
									: null,
						});
					});
				}
			},
		[
			getRowDataByIndex,
			defaultOnRowSelectionChange,
			gridId,
			isAllFieldsNotNull,
		]
	);

	const setActiveCell = useCallback(
		(newCell) => {
			console.debug(`${gridId}.setActiveCell`, newCell);
			if (gridRef.current) {
				gridRef.current?.setActiveCell(newCell);
			} else {
				console.debug(
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

	// const toggleLockRows = useCallback((enabled) => {
	// 	setLockRows(!enabled);
	// }, []);
	return {
		...state,
		gridRef,
		setGridRef,
		gridId,
		keyColumn,
		setGridLoading,
		handleGridDataLoaded,
		propagateGridChange, // 單純 passthrough data
		commitChanges,
		rollbackChanges,
		setGridData,
		clearGridData,
		handleGridChange,
		isPersisted,
		handleActiveCellChange,
		handleSelectionChange,
		isAllFieldsNotNull,
		// DELETING
		deletingRow,
		setDeletingRow,
		removeByKey,
		getRowDataByIndex,
		rewriteRowValue,
		setActiveCell,
		// 鎖定列
		lockRows,
		toggleLockRows,
	};
};
