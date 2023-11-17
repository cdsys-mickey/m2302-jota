import { useCallback, useState } from "react";
import { DSGContext } from "./DSGContext";
import PropTypes from "prop-types";
import Objects from "../../shared-modules/md-objects";
import { useMemo } from "react";
import Arrays from "../../shared-modules/md-arrays";
import _ from "lodash";
import { useTransition } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export const DSGProvider = ({
	id = "DSGProvider",
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
		loading: null,
		prevData: [],
		data: null,
	});

	const [deletingTarget, setDeletingTarget] = useState();

	// const keyColumnName = useMemo(() => keyColumn, [keyColumn]);

	const otherColumnNames = useMemo(() => {
		return Arrays.parse(otherColumns);
	}, [otherColumns]);

	const setLoading = useCallback((value) => {
		setState((prev) => ({
			...prev,
			loading: value,
		}));
	}, []);

	const handleDataLoaded = useCallback(
		(payload) => {
			// console.debug(`data loaded`, payload);
			console.debug(`${id}.onDataLoaded`);
			persistedIds.clear();
			payload.map((i) => {
				persistedIds.add(i[keyColumn]);
			});
			setState((prev) => ({
				...prev,
				prevData: payload,
				data: payload,
				loading: false,
			}));
		},
		[id, keyColumn, persistedIds]
	);

	const getRowDataByIndex = useCallback(
		(rowIndex) => {
			return state.data[rowIndex];
		},
		[state.data]
	);

	const removeByKey = useCallback(
		(key) => {
			const newValue = state.prevData.filter((i) => i[keyColumn] !== key);
			setState((prev) => ({
				...prev,
				prevData: newValue,
				data: newValue,
				loading: false,
			}));
		},
		[keyColumn, state.prevData]
	);

	const commitChanges = useCallback(
		(newValue) => {
			// console.debug("commitChanges", newValue);
			console.debug(`${id}.commitChanges`);
			persistedIds.clear();
			newValue.map((i) => {
				persistedIds.add(i[keyColumn]);
			});
			setState((prev) => ({
				...prev,
				prevData: newValue,
			}));
		},
		[id, keyColumn, persistedIds]
	);

	const rollbackChanges = useCallback(() => {
		// console.debug(`${id}.rollbackChanges, prevData:`, state.prevData);
		console.debug(`${id}.rollbackChanges`);
		setState((prev) => ({
			...prev,
			data: state.prevData,
			loading: false,
		}));
	}, [id, state.prevData]);

	const setData = useCallback(
		(newValue) => {
			// console.debug(`${id}.setData, newValue:`, newValue);
			console.debug(`${id}.setData`);
			setState((prev) => ({
				...prev,
				data: newValue,
				loading: false,
			}));
		},
		[id]
	);

	const isInPrevData = useCallback(
		(rowData) => {
			return state.prevData.some(
				(i) => i[keyColumn] === rowData[keyColumn]
			);
		},
		[keyColumn, state.prevData]
	);

	const isUnchanged = useCallback(
		(row) => {
			const prevData = state.prevData[row.rowIndex];
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
		[keyColumn, otherColumnNames, state.prevData]
	);

	const isDuplicated = useCallback(
		(key) => {
			return state.data.filter((i) => i[keyColumn] === key).length > 1;
		},
		[keyColumn, state.data]
	);

	const handleChange = useCallback(
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
				console.debug("operation", operation);
				if (operation.type === "DELETE") {
					const rowIndex = operation.fromRowIndex;
					const prevRowData = state.prevData[rowIndex];

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
						setData(newValue);
					}
				} else if (operation.type === "CREATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((row) => {
							console.debug(`[DSG CREATE]`, row);
						});
					setData(newValue);
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
						setData(newValue);
						// 新增 或 修改
						const key = rowData[keyColumn];
						if (isDuplicated(key)) {
							if (onDuplicatedError) {
								onDuplicatedError(row, newValue);
							}
						} else {
							if (isInPrevData(rowData)) {
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
						const prevRowData = state.prevData[rowIndex];
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
						setData(newValue);
					}
				} else {
					setData(newValue);
				}
			},
		[
			isDuplicated,
			isInPrevData,
			isUnchanged,
			keyColumn,
			otherColumnNames,
			setData,
			state.prevData,
		]
	);

	const rewriteValue = useCallback((row, newValue, newValues) => {
		console.debug(`rewriteValue ${JSON.stringify(row)}`, newValues);
		setState((prev) => ({
			...prev,
			data: newValue.map((v, i) =>
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
	const handleRowSelectionChange = useCallback(
		({ rowIndex, rowData }) => {
			console.debug(`${id}[${rowIndex}] selected, data:`, rowData);
		},
		[id]
	);

	const handleSelectionChangeBy = useCallback(
		({ onRowSelectionChange = handleRowSelectionChange }) =>
			({ selection }) => {
				if (
					selection &&
					selectedRowIndexRef.current !== selection?.min?.row
				) {
					selectedRowIndexRef.current = selection?.min?.row;
					const selectedRow = selection
						? getRowDataByIndex(selection?.min?.row)
						: null;
					console.debug(`${id}.selectedRow:`, selectedRow);

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
		[getRowDataByIndex, handleRowSelectionChange, id, isAllFieldsNotNull]
	);

	const setActiveCell = useCallback(
		(newCell) => {
			console.debug(`${id}.setActiveCell`, newCell);
			if (gridRef.current) {
				gridRef.current?.setActiveCell(newCell);
			} else {
				console.debug(
					`${id}.setActiveCell(${JSON.stringify(
						newCell
					)}) failed: gridRef.current is null`
				);
			}
		},
		[id]
	);

	const toggleLockRows = useCallback((enabled) => {
		setLockRows(!enabled);
	}, []);

	useEffect(() => {
		return () => {
			gridRef.current = null;
			console.debug(`${id}.gridRef released`);
		};
	}, [id]);

	return (
		<DSGContext.Provider
			value={{
				...state,
				gridRef,
				setGridRef,
				id,
				keyColumn,
				setLoading,
				handleDataLoaded,
				commitChanges,
				rollbackChanges,
				setData,
				handleChange,
				isPersisted,
				handleActiveCellChange,
				handleSelectionChangeBy,
				isAllFieldsNotNull,
				// DELETING
				deletingTarget,
				setDeletingTarget,
				removeByKey,
				getRowDataByIndex,
				rewriteValue,
				setActiveCell,
				// 鎖定列
				lockRows,
				toggleLockRows,
			}}>
			{children}
		</DSGContext.Provider>
	);
};

DSGProvider.propTypes = {
	id: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
		.isRequired,
	handleChange: PropTypes.func,
	keyColumn: PropTypes.string.isRequired,
	otherColumns: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
		.isRequired,
	rewriteValue: PropTypes.func,
};
