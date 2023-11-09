import { useCallback, useState } from "react";
import { DSGContext } from "./DSGContext";
import PropTypes from "prop-types";
import { createRef } from "react";
import Objects from "../../shared-modules/md-objects";
import { useMemo } from "react";
import Arrays from "../../shared-modules/md-arrays";
import _ from "lodash";

export const DSGProvider = ({
	children,
	confirmText,
	keyColumn,
	otherColumns,
}) => {
	const gridRef = createRef();

	const [state, setState] = useState({
		loading: null,
		prevData: [],
		data: [],
		deletingTaregt: null,
	});

	const [deletingTarget, setDeletingTarget] = useState();

	const keyColumnName = useMemo(() => keyColumn, [keyColumn]);

	const otherColumnNames = useMemo(() => {
		return Arrays.getArray(otherColumns);
	}, [otherColumns]);

	const setLoading = useCallback((loading) => {
		setState((prev) => ({
			...prev,
			loading,
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
		console.debug("rollbackChanges", state.prevData);
		setState((prev) => ({
			...prev,
			data: state.prevData,
		}));
	}, [state.prevData]);

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
			return state.data.filter((i) => i?.CodeID === key).length > 1;
		},
		[state.data]
	);

	const handleChange = useCallback(
		({ onCreate, onUpdate, onDelete, onDuplicatedError }) =>
			(newValue, operations) => {
				let doDelete = false;
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
							const row = newValue[rowIndex];
							console.debug(`[DSG UPDATE]`, row);
							if (
								Objects.isAllPropsNotNull(row, [
									keyColumnName,
									...otherColumnNames,
								])
							) {
								// 新增或修改
								const key = row[keyColumnName];
								if (isDuplicated(key)) {
									if (onDuplicatedError) {
										onDuplicatedError(row);
									}
								} else {
									if (isInPrevData(key)) {
										// console.debug(`UPDATE`, row);
										if (onUpdate) {
											onUpdate(row);
										}
									} else {
										// console.debug(`CREATE`, row);
										if (onCreate) {
											onCreate(row);
										}
									}
								}
							} else if (
								Objects.isAllPropsNull(row, [
									// keyColumnName,
									...otherColumnNames,
								])
							) {
								// 刪除
								const row = state.prevData[rowIndex];
								if (row) {
									// console.debug(`DELETE`, row);
									if (onDelete) {
										onDelete(row);
										doDelete = true;
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
				rowData?.CodeID &&
				state.prevData.some((i) => i.CodeID === rowData.CodeID)
			);
		},
		[state.prevData]
	);

	const handleActiveCellChange = useCallback(({ cell }) => {
		console.debug(`onActiveCellChange:`, cell);
	}, []);

	return (
		<DSGContext.Provider
			value={{
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
				// DELETING
				deletingTarget,
				setDeletingTarget,
				removeByKey,
			}}>
			{children}
		</DSGContext.Provider>
	);
};

DSGProvider.propTypes = {
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
