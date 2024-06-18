/* eslint-disable no-mixed-spaces-and-tabs */
import Arrays from "@/shared-modules/sd-arrays";
import Objects from "@/shared-modules/sd-objects";
import { useCallback, useMemo, useRef, useState } from "react";
import { useToggle } from "@/shared-hooks/useToggle";
import _ from "lodash";
import DSG from "../shared-modules/sd-dsg";

const DEFAULT_SET_OPTS = {
	reset: false,
	commit: false,
	prev: null,
};

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

	const resetGridData = useCallback(
		(newValue, opts = DEFAULT_SET_OPTS) => {
			const { reset, prev, commit, init, debug } = opts;
			if (reset || init) {
				dirtyIds.clear();
				persistedIds.clear();
				newValue?.map((item) => {
					const key = _.get(item, keyColumn);
					persistedIds.add(key);
				});
			}
			if (commit || init) {
				setPrevGridData(newValue);
			} else if (prev) {
				setPrevGridData(prev);
			}
			setGridData(newValue);
			setGridLoading(false);

			if (debug) {
				console.log("resetGridData", newValue);
			}
		},
		[dirtyIds, keyColumn, persistedIds]
	);

	const handleGridDataLoaded = useCallback(
		(payload) => {
			console.log(`${gridId}.onDataLoaded`, payload);
			resetGridData(payload, { reset: true, commit: true });
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

	const handleDirtyRows = useCallback(
		({ prevRowData, rowData }) => {
			const isDirty = isRowDataEquals(prevRowData, rowData);
			console.log("isDirty", isDirty);

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
		},
		[dirtyIds, isRowDataEquals, keyColumn]
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

				// *** MOVED TO handleDirtyRows ***
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
				handleDirtyRows({ rowData, prevRowData });
				setGridData(newValue);
			} else {
				setGridData(newValue);
			}
		},
		[gridId, prevGridData, handleDirtyRows]
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
			// setState((prev) => ({
			// 	...prev,
			// 	gridData: rewritten,
			// }));
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

	const handleSelectionChange = useCallback(
		({ onRowSelectionChange = defaultOnRowSelectionChange } = {}) =>
			({ selection }) => {
				console.log(
					`${gridId}.handleSelectionChange, selection:`,
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
		isRowSelected,
		getRowClassName,
		setSelectedRow,
		getSelectedRow,
		selectedRowRef,
		isDirty: dirtyIds && dirtyIds.size > 0,
		handleDirtyRows,
		otherColumnNames,
	};
};
