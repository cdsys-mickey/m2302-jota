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
	handleCreate,
	handleUpdate,
	handleDelete,
	confirmText,
	keyColumn,
	otherColumns,
}) => {
	const gridRef = createRef();

	const [state, setState] = useState({
		prevData: [],
		data: [],
		loading: null,
	});

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

	const handleChange = useCallback(
		(newValue, operations) => {
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
							const key = row[keyColumnName];
							if (isInPrevData(key)) {
								console.debug(`UPDATE`, row);
							} else {
								console.debug(`CREATE`, row);
							}
						} else if (
							Objects.isAllPropsNull(row, [
								keyColumnName,
								...otherColumnNames,
							])
						) {
							const row = state.prevData[rowIndex];
							if (row) {
								console.debug(`DELETE`, row);
							}
						}
					});
				}
			}

			setData(newValue);
		},
		[
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
			return state.prevData.some((i) => i.CodeID === rowData.CodeID);
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
				setData,
				handleChange,
				isPersisted,
				handleActiveCellChange,
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
