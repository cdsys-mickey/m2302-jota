/* eslint-disable no-mixed-spaces-and-tabs */
import { useToggle } from "@/shared-hooks/useToggle";
import Arrays from "@/shared-modules/sd-arrays";
import Objects from "@/shared-modules/sd-objects";
import _ from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";
import DSG from "@/shared-modules/sd-dsg";
import Types from "@/shared-modules/sd-types";

const DEFAULT_SET_OPTS = {
	reset: false,
	commit: false,
	prev: null,
};

export const useDSG = ({
	gridId = "NO_NAME",
	keyColumn,
	otherColumns,
	columns,
	initialReadOnly = true,
	skipDisabled,
	lastCell,
	createRow: _createRow,
}) => {
	const gridRef = useRef();
	const setGridRef = useCallback((node) => {
		if (node) {
			gridRef.current = node;
		}
	}, []);
	const [readOnly, toggleReadOnly] = useToggle(initialReadOnly);
	const asyncRef = useRef({
		prevCell: null,
		cell: null,
		forward: true,
	});
	const selectedRowRef = useRef();
	const selectionRef = useRef();

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

	const isRowDataEquals = useCallback((prevRowData, rowData) => {
		// console.log("isRowDataEquals", prevRowData, rowData);
		return !Objects.arePropsEqual(prevRowData, rowData, {
			// ignoresEmpty: true,
		});
	}, []);

	const handleDirtyCheck = useCallback(
		({ prevRowData, rowData, debug }) => {
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
		({ createRow, data, length = 8 }) => {
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
			} = opts;
			if (reset || init) {
				dirtyIds.clear();
				persistedIds.clear();
				newValue?.map((item) => {
					const key = _.get(item, keyColumn);
					persistedIds.add(key);
				});
			} else {
				if (dirtyCheckByIndex || dirtyCheckBy) {
					const newGridData = Types.isFunction(newValue)
						? newValue(gridData)
						: newValue;
					dirtyIds.clear();
					newGridData.forEach((rowData, rowIndex) => {
						let prevRowData = prevGridData[rowIndex];
						if (dirtyCheckBy) {
							const key = _.get(rowData, keyColumn);
							prevRowData = prevGridData.find((item) => {
								const itemKey = _.get(item, keyColumn);
								return itemKey === key;
							});
						}
						handleDirtyCheck({ rowData, prevRowData, debug });
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
		[
			dirtyIds,
			fillRows,
			gridData,
			handleDirtyCheck,
			keyColumn,
			persistedIds,
			prevGridData,
		]
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
				handleDirtyCheck({ rowData, prevRowData });
				setGridData(newValue);
			} else {
				setGridData(newValue);
			}
		},
		[gridId, prevGridData, handleDirtyCheck]
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
			if (!rowData) {
				return false;
			}
			const key = _.get(rowData, keyColumn);

			return [...persistedIds].indexOf(key) === rowIndex;
		},
		[keyColumn, persistedIds]
	);

	const isForward = useCallback((prev, next) => {
		if (!next) {
			return null;
		}
		if (!prev) {
			return true;
		}

		if (next?.row === prev.row) {
			return next.col >= prev.col;
		}
		return next.row > prev.row;
	}, []);

	const handleActiveCellChange = useCallback(
		({ cell }) => {
			console.log("handleActiveCellChange", cell);
			asyncRef.current = {
				prevCell: {
					...asyncRef.current?.cell,
				},
				cell: cell,
				forward: isForward(asyncRef.current?.cell, cell),
			};
			// console.log(
			// 	`DSG.onActiveCellChange: (${
			// 		asyncRef.current.prevCell
			// 			? `${asyncRef.current.prevCell.row},${asyncRef.current.prevCell.col}`
			// 			: null
			// 	}) → (${
			// 		asyncRef.current.cell
			// 			? `${asyncRef.current.cell.row},${asyncRef.current.cell.col}`
			// 			: null
			// 	}), forward: ${asyncRef.current.forward}`
			// );
		},
		[isForward]
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

	const isRowSelected = useCallback((row = {}) => {
		const { rowIndex } = row;
		if (rowIndex === undefined || rowIndex == null) {
			return false;
		}
		return rowIndex === selectedRowRef.current?.rowIndex;
	}, []);

	const getRowClassName = useCallback(
		(row) => {
			return isRowSelected(row) ? DSG.CssClasses.ROW_SELECTED : undefined;
		},
		[isRowSelected]
	);

	const handleSelectionChange = useCallback(({ selection }) => {
		if (selection) {
			selectionRef.current = selection;
		}
		// console.log("selection", selection);
	}, []);

	const buildSelectionChangeHandler = useCallback(
		({ onRowSelectionChange = defaultOnRowSelectionChange } = {}) =>
			({ selection }) => {
				console.log(
					`${gridId}.buildSelectionChangeHandler, selection:`,
					selection
				);
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
		[defaultOnRowSelectionChange, getRowDataByIndex, gridId]
	);

	const getActiveCell = useCallback(
		(opts = {}) => {
			if (gridRef.current) {
				return gridRef.current.activeCell;
			}
			if (opts.debug) {
				console.log(
					`${gridId}.getActiveCell failed, gridRef.current is null`
				);
			}
		},
		[gridId]
	);

	const setActiveCell = useCallback(
		(newCell, opts = {}) => {
			console.log(`${gridId}.setActiveCell`, newCell);
			if (gridRef.current) {
				gridRef.current?.setActiveCell(newCell);
				return;
			} else {
				console.error(
					`${gridId}.setActiveCell failed, gridRef is null`
				);
			}

			if (opts.debug) {
				console.log(
					`${gridId}.setActiveCell failed: gridRef.current is null`,
					newCell
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

	const handleToggleReadOnly = useCallback(() => {
		rollbackChanges();
		toggleReadOnly();
	}, [rollbackChanges, toggleReadOnly]);

	const getSelection = useCallback((opts = {}) => {
		return selectionRef.current;
		// if (gridRef.current) {
		// 	return gridRef.current?.selection;
		// }
		// if (opts.debug) {
		// 	console.log(
		// 		`${gridId}.getSelection failed: gridRef.current is null`
		// 	);
		// }
	}, []);

	const setSelection = useCallback(
		(selection, opts = {}) => {
			if (gridRef.current) {
				return gridRef.current.setSelection(selection);
			}
			if (opts.debug) {
				console.log(
					`${gridId}.setSelection failed: gridRef.current is null`,
					selection
				);
			}
		},
		[gridId]
	);

	const isCellDisabled = useCallback(
		(cell) => {
			const disabled = columns[cell.col].disabled;

			return Boolean(
				typeof disabled === "function"
					? disabled({
							rowData: gridData[cell.row],
							rowIndex: cell.row,
					  })
					: disabled
			);
		},
		[columns, gridData]
	);

	/**
	 * private method used by nextCell
	 */
	const getNextCell = useCallback(
		(cell, opts = { forward: undefined }) => {
			// const { forward } = asyncRef.current;
			let col = cell.col;
			let row = cell.row;
			let forward =
				opts.forward !== undefined
					? opts.forward
					: isForward(asyncRef.current.cell, cell);
			let searching = forward !== null && forward !== undefined;
			while (searching) {
				if (forward) {
					col++;
					if (col >= columns.length) {
						col = 0;
						row++;
						if (row >= gridData.length) {
							return null; // Return null if reached the end
						}
					}
				} else {
					col--;
					if (col < 0) {
						col = columns.length - 1;
						row--;
						if (row < 0) {
							return null; // Return null if reached the start
						}
					}
				}

				const newCell = { row, col };
				if (!isCellDisabled(newCell)) {
					return newCell;
				}
			}
			return null;
		},
		[columns?.length, gridData?.length, isCellDisabled, isForward]
	);

	const nextCell = useCallback(
		(cell, opts = { forward: undefined }) => {
			if (!cell) {
				throw new Error("必須提供 cell 參數");
			}
			const newCell = getNextCell(cell, opts);
			console.log(
				`nextCell for ${JSON.stringify(cell)}`,
				newCell ? JSON.stringify(newCell) : null
			);
			setActiveCell(newCell);
		},
		[getNextCell, setActiveCell]
	);

	const toColumn = useCallback(
		(colIndex, opts = {}) => {
			const { nextRow = true } = opts;
			const newRow = nextRow
				? gridData.length - 1
				: asyncRef.current?.cell?.row;
			setActiveCell({
				row: newRow,
				col: colIndex,
			});
		},
		[gridData?.length, setActiveCell]
	);

	const toFirstColumn = useCallback(
		(opts = {}) => {
			toColumn(0, opts);
		},
		[toColumn]
	);

	return {
		// STATES
		// ...state,
		gridData,
		prevGridData,
		gridLoading,
		setGridData: resetGridData,
		initGridData,
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
		buildSelectionChangeHandler,
		// isAllFieldsNotNull,
		// DELETING
		deletingRow,
		setDeletingRow,
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
		getDirtyRows,
		isKeyDuplicated,
		isDuplicated,
		isDuplicating,
		// 繪製選取列
		isRowSelected,
		getRowClassName,
		setSelectedRow,
		getSelectedRow,
		selectedRowRef,
		isDirty: dirtyIds && dirtyIds.size > 0,
		handleDirtyCheck,
		otherColumnNames,
		fillRows,
		handleSelectionChange,
		// Ref Methods
		setActiveCell,
		getActiveCell,
		getSelection,
		setSelection,
		isCellDisabled,
		columns,
		getNextCell,
		nextCell,
		skipDisabled,
		toFirstColumn,
		lastCell,
	};
};