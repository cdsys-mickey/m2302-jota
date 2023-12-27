/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useState } from "react";
import { DSGContext } from "./DSGContext";
import PropTypes from "prop-types";
import Objects from "@/shared-modules/sd-objects";
import { useMemo } from "react";
import Arrays from "@/shared-modules/sd-arrays";
import _ from "lodash";
import { useTransition } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export const ZZDSGProvider = ({
	gridId = "ZZDSGProvider",
	children,
	keyColumn,
	otherColumns,
}) => {
	const gridRef = useRef();
	const setGridRef = useCallback((node) => {
		if (node) {
			gridRef.current = node;
		}
	}, []);

	const [lockRows, setLockRows] = useState(true);
	const [isPending, startTransition] = useTransition();
	const selectedRowIndexRef = useRef();

	const persistedIds = useMemo(() => new Set(), []);
	const [state, setState] = useState({
		gridLoading: null,
		prevGridData: [],
		gridData: null,
	});

	const [deletingRow, setDeletingRow] = useState();

	// const keyColumnName = useMemo(() => keyColumn, [keyColumn]);

	const otherColumnNames = useMemo(() => {
		return Arrays.parse(otherColumns);
	}, [otherColumns]);

	const setLoading = useCallback((value) => {
		setState((prev) => ({
			...prev,
			gridLoading: value,
		}));
	}, []);

	const handleGridDataLoaded = useCallback(
		(payload) => {
			// console.log(`data loaded`, payload);
			console.log(`${gridId}.onDataLoaded`);
			persistedIds.clear();
			payload.map((i) => {
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
			// console.log("commitChanges", newValue);
			console.log(`${gridId}.commitChanges`);
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
		// console.log(`${id}.rollbackChanges, prevData:`, state.prevData);
		console.log(`${gridId}.rollbackChanges`);
		setState((prev) => ({
			...prev,
			gridData: state.prevGridData,
			gridLoading: false,
		}));
	}, [gridId, state.prevGridData]);

	const setData = useCallback(
		(newValue) => {
			console.log(`${gridId}.setData()`, newValue);
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

	const handleGridChange = useCallback(
		({
				onCreate,
				onUpdate,
				onPatch,
				onDelete,
				onDuplicatedError,
				onBeforeUpdate,
				onBeforeCreate,
			}) =>
			(newValue, operations) => {
				// 只處理第一行
				const operation = operations[0];
				console.log("operation", operation);
				if (operation.type === "DELETE") {
					const rowIndex = operation.fromRowIndex;
					const prevRowData = state.prevGridData[rowIndex];

					if (prevRowData) {
						const row = {
							rowIndex,
							rowData: prevRowData,
						};
						console.log(`[DSG DELETE]`, row);
						if (onDelete) {
							onDelete(row, newValue);
						}
					} else {
						setData(newValue);
					}
				} else if (operation.type === "CREATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((row) => {
							console.log(`[DSG CREATE]`, row);
						});
					setData(newValue);
				} else if (operation.type === "UPDATE") {
					const rowIndex = operation.fromRowIndex;
					const rowData = newValue[rowIndex];
					const row = {
						rowIndex,
						rowData,
					};
					console.log(`[DSG UPDATE]`, rowData);
					// 所有欄位都有值(包含 Key)
					if (
						Objects.isAllPropsNotNullOrEmpty(rowData, [
							keyColumn,
							...otherColumnNames,
						])
					) {
						setData(newValue);
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
						setData(newValue);
					}
				} else {
					setData(newValue);
				}
			},
		[
			isDuplicated,
			isInPrevGridData,
			isUnchanged,
			keyColumn,
			otherColumnNames,
			setData,
			state.prevGridData,
		]
	);

	const rewriteRowValue = useCallback((row, newValue, newValues) => {
		console.log(`rewriteRowValue ${JSON.stringify(row)}`, newValues);
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
		console.log(`DSG.onActiveCellChange →`, cell);
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
	const onRowSelectionChange = useCallback(
		({ rowIndex, rowData }) => {
			console.log(`${gridId}[${rowIndex}] selected, data:`, rowData);
		},
		[gridId]
	);

	const handleSelectionChange = useCallback(
		({ onRowSelectionChange = onRowSelectionChange }) =>
			({ selection }) => {
				if (
					selection &&
					selectedRowIndexRef.current !== selection?.min?.row
				) {
					selectedRowIndexRef.current = selection?.min?.row;
					const selectedRow = selection
						? getRowDataByIndex(selection?.min?.row)
						: null;
					console.log(`${gridId}.selectedRow:`, selectedRow);

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
		[getRowDataByIndex, onRowSelectionChange, gridId, isAllFieldsNotNull]
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

	const toggleLockRows = useCallback((enabled) => {
		setLockRows(!enabled);
	}, []);

	useEffect(() => {
		return () => {
			gridRef.current = null;
			console.log(`${gridId}.gridRef released`);
		};
	}, [gridId]);

	return (
		<DSGContext.Provider
			value={{
				...state,
				gridRef,
				setGridRef,
				gridId,
				keyColumn,
				setLoading,
				handleGridDataLoaded,
				commitChanges,
				rollbackChanges,
				setData,
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
			}}>
			{children}
		</DSGContext.Provider>
	);
};

ZZDSGProvider.propTypes = {
	gridId: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
		.isRequired,
	handleGridChange: PropTypes.func,
	keyColumn: PropTypes.string.isRequired,
	otherColumns: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
		.isRequired,
	rewriteRowValue: PropTypes.func,
};
