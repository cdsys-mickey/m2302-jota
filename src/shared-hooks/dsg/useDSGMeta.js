/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useRef } from "react";
import DSG from "@/shared-modules/DSG.mjs";
import { useEffect } from "react";
import { toastEx } from "shared-components/toast-ex";
import { DSGLastCellBehavior } from "./DSGLastCellBehavior";
import { useMemo } from "react";

export const useDSGMeta = ({
	columns,
	skipDisabled = false,
	lastCell,
	data,
	setGridData,
	createRow,
	defaultCell,
	grid,
	setValue,
}) => {
	const _data = useMemo(() => {
		return data ?? grid?.gridData;
	}, [data, grid?.gridData]);
	const gridRef = useRef();
	const asyncRef = useRef({
		refAssigned: false,
	});
	const setGridRef = useCallback(
		(node) => {
			if (node) {
				gridRef.current = node;
				if (!asyncRef.current.refAssigned && defaultCell) {
					gridRef.current.setActiveCell(defaultCell);
					console.log("defaultCell assigned", defaultCell);
				}
				asyncRef.current.refAssigned = true;
			}
		},
		[defaultCell]
	);

	const asyncMetaRef = useRef({
		prevCell: null,
		cell: null,
		forward: true,
		activeCell: null,
		refocus: false,
	});

	const prevActiveCellRef = useRef();
	const prevSelectionRef = useRef();

	const selectedRowRef = useRef();
	const selectionRef = useRef();

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

			// const { rowIndex, rowData } = row || {};
			// if (rowIndex === undefined || rowIndex == null) {
			// 	console.log("defaultOnRowSelectionChange: de-selected");
			// } else {
			// 	console.log(
			// 		`defaultOnRowSelectionChange.rows[${rowIndex}] selected, rowData:`,
			// 		rowData
			// 	);
			// }
		},
		[setSelectedRow]
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
			console.log("handleSelectionChange", selection);
			selectionRef.current = selection;
		}
	}, []);

	const buildSelectionChangeHandler = useCallback(
		({ onRowSelectionChange = defaultOnRowSelectionChange } = {}) =>
			({ selection }) => {
				console.log(
					`buildSelectionChangeHandler, selection:`,
					selection
				);
				if (selection) {
					// 當只有選取一列時
					if (selection?.min?.row === selection?.max?.row) {
						const rowIndex = selection?.min?.row;
						const rowData = _data[rowIndex];

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
		[_data, defaultOnRowSelectionChange]
	);

	// ref Methods
	const getActiveCell = useCallback((opts = {}) => {
		if (gridRef.current) {
			return gridRef.current.activeCell;
		}
		if (opts.debug) {
			console.log(`getActiveCell failed, gridRef.current is null`);
		}
	}, []);

	const setActiveCell = useCallback((newCell, opts = {}) => {
		console.log(`setActiveCell`, newCell);
		if (gridRef.current) {
			gridRef.current?.setActiveCell(newCell);
			return;
		} else {
			console.error(`setActiveCell failed, gridRef is null`);
		}

		if (opts.debug) {
			console.log(
				`setActiveCell failed: gridRef.current is null`,
				newCell
			);
		}
	}, []);

	const isCellDisabled = useCallback(
		(cell) => {
			const disabled = columns[cell.col].disabled;

			return Boolean(
				typeof disabled === "function"
					? disabled({
							rowData: _data[cell.row],
							rowIndex: cell.row,
					  })
					: disabled
			);
		},
		[columns, _data]
	);

	const isForward = useCallback((prev, next) => {
		if (!next) {
			return null;
		}
		if (!prev) {
			// console.warn("prev cell is null, probably onActiveCellChange is not assigned");
			return true;
		}

		if (next?.row === prev.row) {
			return next.col >= prev.col;
		}
		return next.row > prev.row;
	}, []);

	const handleFocusPrevCell = useCallback(
		(newCell) => {
			console.log(
				"handleFocusPrevCell, prevCell:",
				newCell || asyncMetaRef.current.prevCell
			);
			if (asyncMetaRef.current.prevCell) {
				asyncMetaRef.current.refocus = true;
				setActiveCell(newCell || asyncMetaRef.current.prevCell);
			}
		},
		[setActiveCell]
	);

	/**
	 * refocus 時不要記錄 cell 移動
	 */
	const handleActiveCellChange = useCallback(
		({ cell }) => {
			if (
				asyncMetaRef.current?.cell?.col != cell?.col ||
				asyncMetaRef.current?.cell?.row != cell?.row
			) {
				console.log(
					`ActiveCellChange(prev->new), refocus: ${asyncMetaRef.current?.refocus}`,
					asyncMetaRef.current?.cell,
					cell
				);
				if (!asyncMetaRef.current.refocus) {
					asyncMetaRef.current = {
						prevCell: asyncMetaRef.current?.cell,
						cell: cell,
						forward: isForward(asyncMetaRef.current?.cell, cell),
						refocus: false,
					};
					console.log("forward", asyncMetaRef.current.forward);
				} else {
					asyncMetaRef.current.refocus = false;
				}
			}
		},
		[isForward]
	);

	const getNextCell = useCallback(
		(cell, opts = { forward: undefined }) => {
			if (!cell) {
				throw new Error("沒有傳入 cell");
			}
			let col = cell.col;
			let row = cell.row;
			let forward =
				opts.forward != null
					? opts.forward
					: isForward(asyncMetaRef.current.cell, cell);
			let searching = forward !== null && forward != null;
			while (searching) {
				if (forward) {
					col++;
					if (col >= columns.length) {
						col = 0;
						row++;
						if (row >= _data.length) {
							// 若當初 forward 是自動判斷的, 且判斷結果為正向搜尋, 當找不到時, 就改成往回找
							if (opts.forward == null && forward) {
								console.log(
									"cannot find next cell while using direction auto detection and result is reversing, try force forwarding..."
								);
								return getNextCell(cell, { forward: false });
							}
							return {
								field: null,
								isForward: forward,
							}; // Return null if reached the end
						}
					}
				} else {
					col--;
					if (col < 0) {
						col = columns.length - 1;
						row--;
						if (row < 0) {
							// 若當初 forward 是自動判斷的, 且判斷結果為反向搜尋, 當找不到時, 就改成往下找
							if (opts.forward == null && !forward) {
								console.log(
									"cannot find next cell while using direction auto detection and result is reversing, try force forwarding..."
								);
								return getNextCell(cell, { forward: true });
							}
							return {
								field: null,
								isForward: forward,
							}; // Return null if reached the start
						}
					}
				}

				const newCell = { row, col };
				if (!isCellDisabled(newCell)) {
					return {
						field: newCell,
						isForward: forward,
					};
				}
			}
			return {
				field: null,
				isForward: forward,
			};
		},
		[columns?.length, _data?.length, isCellDisabled, isForward]
	);

	const toColumn = useCallback(
		(colIndex, opts = {}) => {
			const { nextRow = true } = opts;
			const newRow = nextRow
				? _data.length - 1
				: asyncMetaRef.current?.cell?.row;
			setActiveCell({
				row: newRow,
				col: colIndex,
			});
		},
		[_data?.length, setActiveCell]
	);

	const toFirstColumn = useCallback(
		(opts = {}) => {
			toColumn(0, opts);
		},
		[toColumn]
	);

	const getSelection = useCallback((opts = {}) => {
		// if (gridRef.current) {
		// 	return gridRef.current.selection;
		// }
		return selectionRef.current;

		// if (opts.debug) {
		// 	console.log(`getSelection failed: gridRef.current is null`);
		// }
	}, []);

	const setSelection = useCallback((selection, opts = {}) => {
		if (gridRef.current && selection) {
			return gridRef.current.setSelection(selection);
		}
		if (opts.debug) {
			console.log(
				`setSelection failed: gridRef.current is null`,
				selection
			);
		}
	}, []);

	const resetSelection = useCallback(() => {
		prevActiveCellRef.current = null;
		prevSelectionRef.current = null;
	}, []);

	const saveSelection = useCallback(() => {
		prevActiveCellRef.current = getActiveCell();
		prevSelectionRef.current = getSelection();
		console.log("prevActiveCellRef", prevActiveCellRef.current);
		console.log("prevSelectionRef", prevSelectionRef.current);

		setActiveCell(null);
	}, [getActiveCell, getSelection, setActiveCell]);

	const restoreSelection = useCallback(() => {
		const maxRow = _data.length - 1;
		if (prevActiveCellRef.current) {
			let activeCell = prevActiveCellRef.current;
			if (activeCell.row > maxRow) {
				activeCell.row = maxRow;
				setActiveCell(activeCell);
			}
			prevActiveCellRef.current = null;
		}
		if (prevSelectionRef.current) {
			let selection = prevSelectionRef.current;
			// 限制 row 的值不能超過 gridData.length - 1
			if (selection.min.row > maxRow) {
				selection.min.row = maxRow;
			}
			if (selection.max.row > maxRow) {
				selection.max.row = maxRow;
			}
			setSelection(selection);
			prevSelectionRef.current = null;
		}
	}, [_data?.length, setActiveCell, setSelection]);

	const isLastCell = useCallback(
		(cell) => {
			if (!cell) {
				throw new Error("current cell cannot be null");
			}
			return (
				cell.row === _data.length - 1 && cell.col === columns.length - 1
			);
		},
		[columns?.length, _data?.length]
	);

	const isLastRow = useCallback(
		(cell) => {
			return cell.row == _data.length - 1;
		},
		[_data?.length]
	);

	const toggleCheckbox = useCallback(
		(cell) => {
			if (!grid) {
				console.warn(
					"沒有將 grid 傳入 DSGMeta, toggleCheckbox 將會被忽略"
				);
				return;
			}
			// setGridData(prev =>
			// 	prev.map((rowData, i) =>
			// 		i === cell.row ? { ...rowData, [cell.colId]: !rowData[cell.colId] } : rowData
			// 	)
			// );
			const oldValue = grid.gridData;
			const newValue = oldValue.map((rowData, i) =>
				i === cell.row
					? { ...rowData, [cell.colId]: !rowData[cell.colId] }
					: rowData
			);

			// 模擬本來要在 buildGridChangeHandler 內觸發的 onUpdateRow 及 onGridChanged
			if (grid.onUpdateRow) {
				const newValue = grid.gridData.map((rowData, i) =>
					i === cell.row
						? { ...rowData, [cell.colId]: !rowData[cell.colId] }
						: rowData
				);
				let updateResult = {
					rows: 0,
					rowIndex: cell.row,
					cols: [],
					type: "UPDATE",
				};

				const rowData = newValue[cell.row];
				grid.onUpdateRow({
					updateResult,
					fromRowIndex: 0,
					oldValue,
					newValue,
					setValue,
				})(rowData, cell.row);

				if (
					grid.onGridChanged &&
					(updateResult.rows > 0 ||
						updateResult.cols.length > 0 ||
						updateResult.type === "DELETE")
				) {
					console.log("onGridChanged", newValue);
					// updated = grid.onGridChanged({ prevGridData: prevGridDataRef.current, gridData: newGridData, formData, setValue, updateResult });
					grid.onGridChanged({
						gridData: newValue,
						setValue,
						updateResult,
					});
				}
			}

			grid?.setGridData(newValue);
		},
		[grid, setValue]
	);

	const insertRowBelow = useCallback(
		(cell) => {
			if (!createRow) {
				throw new Error("沒有將 createRow 傳入 DSGMeta");
			}
			console.log("insertRowBelow below", cell);
			setGridData((prev) => {
				const newGridData = [...prev];
				newGridData.splice(cell.row + 1, 0, createRow());
				return newGridData;
			});
			// 於下個一個 cycle
			setTimeout(() => {
				const newCell = {
					row: cell.row + 1,
					col: 0,
				};
				setActiveCell(newCell);
			});
		},
		[createRow, setActiveCell, setGridData]
	);

	const handleFocusNextCell = useCallback(
		(cell, opts = {}) => {
			console.log("handleFocusNextCell from: ", cell);
			// if (!getNextCell) {
			// 	throw new Error("useCellComponent 未傳遞進 getNextCell 方法");
			// }

			const nextCell = getNextCell(cell, opts);
			if (nextCell.field) {
				setActiveCell(nextCell.field);
			} else {
				// 要先確認是最後一行
				if (!isLastRow(cell)) {
					return;
				}
				if (typeof lastCell === "string") {
					toastEx.warn(lastCell);
				} else if (typeof lastCell === "function") {
					lastCell(opts);
				} else {
					switch (lastCell) {
						case DSGLastCellBehavior.BLUR:
							setActiveCell(null);
							break;
						case DSGLastCellBehavior.CREATE_ROW:
							if (nextCell.isForward) {
								insertRowBelow(cell);
							}
							break;
					}
				}
			}
		},
		[getNextCell, insertRowBelow, isLastRow, lastCell, setActiveCell]
	);

	// 處理全域鍵盤事件
	const handleKeyDown = useCallback(
		(event) => {
			// console.log(`useDSGMeta.handleKeyDown`, event.key);
			if (event.key === " ") {
				const activeCell = getActiveCell();
				console.log("activeCell: ", activeCell);
				if (activeCell != null) {
					const column = columns[activeCell.col];
					console.log("column", column);
					if (column.toggleBySpace) {
						event.preventDefault(); // 防止預設行為（如頁面滾動）
						toggleCheckbox(activeCell);
						if (column.focusNextCellOnSpace) {
							handleFocusNextCell(activeCell, { forward: true });
						}
					}
				}
			}
		},
		[columns, getActiveCell, handleFocusNextCell, toggleCheckbox]
	);

	// 在組件掛載時添加 document 事件監聽器
	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);

		// 清理函數：在組件卸載時移除監聽器
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]); // 空依賴陣列表示只在組件掛載和卸載時執行

	return {
		// Meta
		gridRef,
		setGridRef,
		columns,
		isLastCell,
		// Focus Controls
		skipDisabled,
		lastCell,
		isLastRow,
		getNextCell,
		// nextCell,
		// Ref Methods
		handleActiveCellChange,
		setActiveCell,
		getActiveCell,
		getSelection,
		setSelection,
		isCellDisabled,
		toFirstColumn,
		// 繪製選取列
		isRowSelected,
		getRowClassName,
		setSelectedRow,
		getSelectedRow,
		selectedRowRef,
		handleSelectionChange,
		buildSelectionChangeHandler,
		// 選取位置記憶
		saveSelection,
		restoreSelection,
		resetSelection,
		handleFocusPrevCell,
		handleFocusNextCell,
	};
};
