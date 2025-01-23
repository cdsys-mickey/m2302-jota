import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import { useCallback, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import StdPrint from "../modules/md-std-print";
import { useAction } from "../shared-hooks/useAction";
import useHttpPost from "../shared-hooks/useHttpPost";
import { useWebApi } from "../shared-hooks/useWebApi";
import { toastEx } from "@/helpers/toast-ex";
import { AuthContext } from "@/contexts/auth/AuthContext";

export const useStdPrint = ({
	token,
	tableName,
	deptId,
	logKey,
	paramsToJsonData,
}) => {
	const { httpGetAsync } = useWebApi();
	const { postToBlank } = useHttpPost();
	const auth = useContext(AuthContext);
	const { operator } = auth;
	const listLoaderCtx = useContext(InfiniteLoaderContext);
	const [state, setState] = useState({
		displayName: null,
		fields: null,
		fieldsLoading: null,
		fieldsError: null,
		selectedFields: null,
	});

	const printAction = useAction();
	const printing = useMemo(() => {
		return !!printAction.state;
	}, [printAction.state]);

	const promptPrint = useCallback(() => {
		printAction.prompt();
	}, [printAction]);

	const cancelPrint = useCallback(() => {
		printAction.clear();
	}, [printAction]);

	const loadDef = useCallback(async () => {
		setState((prev) => ({
			...prev,
			fieldsLoading: true,
		}));
		try {
			const { status, payload, error } = await httpGetAsync({
				url: `v1/app/entities`,
				bearer: token,
				params: {
					id: tableName,
				},
			});
			if (status.success) {
				setState((prev) => ({
					...prev,
					displayName: payload.info.RealName || tableName,
					fields: payload.data.map((x) => x.ShowName) || [],
					selectedFields: [],
				}));
			} else {
				throw error || new Error("讀取欄位發生例外");
			}
		} catch (err) {
			setState((prev) => ({
				...prev,
				fieldsError: err,
			}));
		} finally {
			setState((prev) => ({
				...prev,
				fieldsLoading: false,
			}));
		}
	}, [httpGetAsync, tableName, token]);

	const handleDragEnd = useCallback(
		(dragResult) => {
			if (!dragResult.destination) {
				return;
			}

			// console.log(`handleDragEnd`, dragResult);

			if (
				dragResult.source.droppableId !==
				dragResult.destination.droppableId
			) {
				const fromIndex = dragResult.source.index;
				const toIndex = dragResult.destination.index;

				// remove from source
				const source =
					dragResult.source.droppableId === StdPrint.SELECTED
						? state.selectedFields
						: state.fields;
				const target =
					dragResult.destination.droppableId === StdPrint.SELECTED
						? state.selectedFields
						: state.fields;
				const [removed] = source.splice(fromIndex, 1);
				target.splice(toIndex, 0, removed);

				setState((prev) => ({
					...prev,
					selectedFields:
						dragResult.source.droppableId === StdPrint.SELECTED
							? source
							: target,
					fields:
						dragResult.source.droppableId === StdPrint.SELECTED
							? target
							: source,
				}));
			} else {
				const fromIndex = dragResult.source.index;
				const toIndex = dragResult.destination.index;
				if (fromIndex === toIndex) {
					return;
				}
				const values =
					dragResult.source.droppableId === StdPrint.SELECTED
						? state.selectedFields
						: state.fields;
				const [removed] = values.splice(fromIndex, 1);
				values.splice(toIndex, 0, removed);
				if (dragResult.source.droppableId === StdPrint.SELECTED) {
					setState((prev) => ({
						...prev,
						selectedFields: values,
					}));
				} else {
					setState((prev) => ({
						...prev,
						fields: values,
					}));
				}
			}
		},
		[state.fields, state.selectedFields]
	);

	const handleDelete = useCallback((f) => {
		console.log("handleDelete", f);
		setState((prev) => ({
			...prev,
			selectedFields: [...prev.selectedFields.filter((x) => x !== f)],
			fields: [...prev.fields, f],
		}));
	}, []);

	const handleAdd = useCallback((f) => {
		console.log("handleAdd", f);
		setState((prev) => ({
			...prev,
			selectedFields: [...prev.selectedFields, f],
			fields: [...prev.fields.filter((x) => x !== f)],
		}));
	}, []);

	const handlePrint = useCallback(
		(mode) => {
			if (!state.selectedFields || state.selectedFields.length === 0) {
				toastEx.error("請至少選擇一個欄位");
				return;
			}

			const where = paramsToJsonData
				? paramsToJsonData(listLoaderCtx?.paramsRef?.current, operator)
				: null;
			console.log(`where`, where);

			const jsonData = {
				...(mode && {
					Action: mode,
				}),
				RealFile: tableName,
				DeptID: deptId,
				StdOut: state.selectedFields.join(","),
				...where,
				// Top: 20,
			};
			console.log(`jsonData`, jsonData);
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT
				}/WebStdReport.aspx?LogKey=${logKey}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[deptId, listLoaderCtx?.paramsRef, logKey, paramsToJsonData, postToBlank, state.selectedFields, tableName]
	);

	const handleAddAllFields = useCallback(() => {
		setState((prev) => ({
			...prev,
			selectedFields: [...prev.selectedFields, ...prev.fields],
			fields: [],
		}));
	}, []);

	const handleRemoveAllFields = useCallback(() => {
		setState((prev) => ({
			...prev,
			fields: [...prev.selectedFields, ...prev.fields],
			selectedFields: [],
		}));
	}, []);

	const handleReset = useCallback(() => {
		loadDef();
	}, [loadDef]);

	const onSubmit = useCallback(
		(data) => {
			console.log(`onSubmit`, data);
			console.log(`params`, listLoaderCtx.paramsRef.current);

			handlePrint(data.mode?.id);
		},
		[handlePrint, listLoaderCtx.paramsRef]
	);

	const onSubmitError = useCallback((err) => {
		console.error(`onSubmitError`, err);
	}, []);

	// useInit(() => {
	// 	load();
	// }, []);

	return {
		...state,
		loadDef,
		tableName,
		handleDragEnd,
		handleDelete,
		handleAdd,
		handlePrint,
		printing,
		promptPrint,
		cancelPrint,
		handleAddAllFields,
		handleRemoveAllFields,
		handleReset,
		onSubmit,
		onSubmitError,
	};
};
