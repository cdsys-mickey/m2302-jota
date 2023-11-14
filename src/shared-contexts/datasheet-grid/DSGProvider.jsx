import { useCallback, useState } from "react";
import { DSGContext } from "./DSGContext";
import PropTypes from "prop-types";
import { createRef } from "react";
import Objects from "../../shared-modules/md-objects";
import { useMemo } from "react";
import Arrays from "../../shared-modules/md-arrays";
import _ from "lodash";

export const DSGProvider = ({
	id,
	children,
	confirmText,
	keyColumn,
	otherColumns,
}) => {
	const gridRef = createRef();

	const [state, setState] = useState({
		loading: null,
		prevData: [],
		data: null,
		deletingTaregt: null,
	});

	const [deletingTarget, setDeletingTarget] = useState();

	const keyColumnName = useMemo(() => keyColumn, [keyColumn]);

	const otherColumnNames = useMemo(() => {
		return Arrays.getArray(otherColumns);
	}, [otherColumns]);

	const setLoading = useCallback((value) => {
		setState((prev) => ({
			...prev,
			loading: value,
		}));
	}, []);

	const handleDataLoaded = useCallback((payload) => {
		setState((prev) => ({
			...prev,
			prevData: payload,
			data: payload,
			loading: false,
		}));
	}, []);

	const getRowDataByIndex = useCallback(
		(rowIndex) => {
			return state.data[rowIndex];
		},
		[state.data]
	);

	const removeByKey = useCallback(
		(key) => {
			const newValue = state.prevData.filter(
				(i) => i[keyColumnName] !== key
			);
			setState((prev) => ({
				...prev,
				prevData: newValue,
				data: newValue,
				loading: false,
			}));
		},
		[keyColumnName, state.prevData]
	);

	const commitChanges = useCallback(() => {
		console.debug("commitChanges", state.data);
		setState((prev) => ({
			...prev,
			prevData: state.data,
		}));
	}, [state.data]);

	const rollbackChanges = useCallback(() => {
		// console.debug("rollbackChanges", state.prevData);
		setState((prev) => ({
			...prev,
			loading: true,
		}));
		console.debug(`rollbackChanges ${id}, prevData:`, state.prevData);
		setState((prev) => ({
			...prev,
			data: state.prevData,
			loading: false,
		}));
	}, [id, state.prevData]);

	const setData = useCallback((newValue) => {
		setState((prev) => ({
			...prev,
			data: newValue,
		}));
	}, []);

	const isInPrevData = useCallback(
		(key) => {
			return state.prevData.some((i) => i[keyColumnName] === key);
		},
		[keyColumnName, state.prevData]
	);

	const isDuplicated = useCallback(
		(key) => {
			return (
				state.data.filter((i) => i[keyColumnName] === key).length > 1
			);
		},
		[keyColumnName, state.data]
	);

	const handleChange = useCallback(
		({ onCreate, onUpdate, onDelete, onDuplicatedError }) =>
			(newValue, operations) => {
				// let doDelete = false;
				for (const operation of operations) {
					console.debug("operation", operation);
					if (operation.type === "DELETE") {
						state.data
							.slice(operation.fromRowIndex, operation.toRowIndex)
							.forEach((row) => {
								console.debug(`[DSG DELETE]`, row);
							});
					} else if (operation.type === "CREATE") {
						newValue
							.slice(operation.fromRowIndex, operation.toRowIndex)
							.forEach((row) => {
								console.debug(`[DSG CREATE]`, row);
							});
					} else if (operation.type === "UPDATE") {
						_.range(
							operation.fromRowIndex,
							operation.toRowIndex
						).forEach((rowIndex) => {
							const rowData = newValue[rowIndex];
							console.debug(`[DSG UPDATE]`, rowData);
							if (
								Objects.isAllPropsNotNull(rowData, [
									keyColumnName,
									...otherColumnNames,
								])
							) {
								// 新增或修改
								const key = rowData[keyColumnName];
								if (isDuplicated(key)) {
									if (onDuplicatedError) {
										onDuplicatedError({
											rowIndex,
											rowData,
										});
									}
								} else {
									if (isInPrevData(key)) {
										// console.debug(`UPDATE`, row);
										if (onUpdate) {
											onUpdate({
												rowIndex,
												rowData,
											});
										}
									} else {
										// console.debug(`CREATE`, row);
										if (onCreate) {
											onCreate({
												rowIndex,
												rowData,
											});
										}
									}
								}
							} else if (
								Objects.isAllPropsNull(rowData, [
									// keyColumnName,
									...otherColumnNames,
								])
							) {
								// 刪除
								const row = state.prevData[rowIndex];
								if (row) {
									// console.debug(`DELETE`, row);
									if (onDelete) {
										onDelete({
											rowIndex,
											rowData,
										});
										// doDelete = true;
									}
								}
							}
						});
					}
				}
				setData(newValue);
			},
		[
			isDuplicated,
			isInPrevData,
			keyColumnName,
			otherColumnNames,
			setData,
			state.data,
			state.prevData,
		]
	);

	const isPersisted = useCallback(
		({ rowData }) => {
			return (
				rowData[keyColumnName] &&
				state.prevData.some(
					(i) => i[keyColumnName] === rowData[keyColumnName]
				)
			);
		},
		[keyColumnName, state.prevData]
	);

	const handleActiveCellChange = useCallback(({ cell }) => {
		console.debug(`DSG.onActiveCellChange →`, cell);
	}, []);

	const isAllFieldsNotNull = useCallback(
		(row) => {
			return Objects.isAllPropsNotNull(row, [
				keyColumnName,
				...otherColumnNames,
			]);
		},
		[keyColumnName, otherColumnNames]
	);

	const handleSelectionChangeBy = useCallback(
		({ onRowSelectionChange }) =>
			({ selection }) => {
				if (selection) {
					const selectedRow = selection
						? getRowDataByIndex(selection?.min?.row)
						: null;
					console.debug(`${id} selectedRow:`, selectedRow);
					if (onRowSelectionChange) {
						onRowSelectionChange({
							rowIndex: selection?.min?.row,
							rowData:
								selectedRow && isAllFieldsNotNull(selectedRow)
									? selectedRow
									: null,
						});
					}
				}
			},
		[getRowDataByIndex, id, isAllFieldsNotNull]
	);

	const onRowSelectionChange = useCallback(
		({ rowIndex, rowData }) => {
			console.debug(`${id}[${rowIndex}] selected, data:`, rowData);
		},
		[id]
	);

	return (
		<DSGContext.Provider
			value={{
				id,
				keyColumnName,
				gridRef,
				...state,
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
			}}>
			{children}
		</DSGContext.Provider>
	);
};

DSGProvider.propTypes = {
	id: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
		.isRequired,
	handleCreate: PropTypes.func,
	handleUpdate: PropTypes.func,
	handleDelete: PropTypes.func,
	confirmText: PropTypes.string,
	keyColumn: PropTypes.string.isRequired,
	otherColumns: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
		.isRequired,
};
