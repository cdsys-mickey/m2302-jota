/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useRef } from "react";
import DSG from "../../shared-modules/sd-dsg";

export const useDSGMeta = ({
	columns,
	skipDisabled = false,
	lastCell,
	data,
}) => {
	const gridRef = useRef();
	const setGridRef = useCallback((node) => {
		if (node) {
			gridRef.current = node;
		}
	}, []);

	const asyncRef = useRef({
		prevCell: null,
		cell: null,
		forward: true,
		activeCell: null,
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
			selectionRef.current = selection;
		}
		// console.log("selection", selection);
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
						const rowData = data[rowIndex];

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
		[data, defaultOnRowSelectionChange]
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
						rowData: data[cell.row],
						rowIndex: cell.row,
					})
					: disabled
			);
		},
		[columns, data]
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
						if (row >= data.length) {
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
		[columns?.length, data?.length, isCellDisabled, isForward]
	);

	const toColumn = useCallback(
		(colIndex, opts = {}) => {
			const { nextRow = true } = opts;
			const newRow = nextRow
				? data.length - 1
				: asyncRef.current?.cell?.row;
			setActiveCell({
				row: newRow,
				col: colIndex,
			});
		},
		[data?.length, setActiveCell]
	);

	const toFirstColumn = useCallback(
		(opts = {}) => {
			toColumn(0, opts);
		},
		[toColumn]
	);

	const getSelection = useCallback((opts = {}) => {
		if (gridRef.current) {
			return gridRef.current.selection;
		}

		if (opts.debug) {
			console.log(`getSelection failed: gridRef.current is null`);
		}
	}, []);

	const setSelection = useCallback((selection, opts = {}) => {
		if (gridRef.current) {
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
		const maxRow = data.length - 1;
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
	}, [data.length, setActiveCell, setSelection]);

	return {
		// Meta
		gridRef,
		setGridRef,
		columns,
		// Focus Controls
		skipDisabled,
		lastCell,
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
	};
};