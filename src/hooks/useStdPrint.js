import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import useAction from "@/shared-modules/ActionState/useAction";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext, useMemo, useState } from "react";
import StdPrint from "../modules/StdPrint.mjs";
import useJotaReports from "./useJotaReports";
import useDebugDialog from "./useDebugDialog";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";

export const useStdPrint = ({ token, tableName, deptId, paramsToJsonData }) => {
	const { httpGetAsync } = useWebApiAsync();
	// const { postTo } = useHttpPost();
	const auth = useContext(AuthContext);
	const config = useContext(ConfigContext);
	// const dialogs = useContext(DialogsContext);
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

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebStdReport.aspx`;
	}, [config.REPORT_URL]);
	const reports = useJotaReports();

	const handlePrint = useCallback(
		(outputType) => {
			if (!state.selectedFields || state.selectedFields.length === 0) {
				toastEx.error("請至少選擇一個欄位");
				return;
			}

			const where = paramsToJsonData
				? paramsToJsonData(listLoaderCtx?.paramsRef?.current, operator)
				: null;
			console.log(`where`, where);

			const data = {
				...(outputType && {
					Action: outputType,
				}),
				RealFile: tableName,
				DeptID: deptId,
				StdOut: state.selectedFields.join(","),
				...where,
				// Top: 20,
			};
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[
			deptId,
			listLoaderCtx?.paramsRef,
			operator,
			paramsToJsonData,
			reportUrl,
			reports,
			state.selectedFields,
			tableName,
		]
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

	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const onDebugSubmit = useCallback(
		(payload) => {
			console.log("onDebugSubmit", payload);
			const where = paramsToJsonData
				? paramsToJsonData(listLoaderCtx?.paramsRef?.current, operator)
				: null;
			console.log(`where`, where);

			const data = {
				RealFile: tableName,
				DeptID: deptId,
				StdOut: state.selectedFields.join(","),
				...where,
				// Top: 20,
			};
			console.log("data", data);
			debugDialog.show({
				data,
				url: reportUrl,
				title: `${appFrame.menuItemSelected?.JobID} ${appFrame.menuItemSelected?.JobName}`,
			});
		},
		[
			appFrame.menuItemSelected?.JobID,
			appFrame.menuItemSelected?.JobName,
			debugDialog,
			deptId,
			listLoaderCtx?.paramsRef,
			operator,
			paramsToJsonData,
			reportUrl,
			state.selectedFields,
			tableName,
		]
	);

	const onSubmit = useCallback(
		(payload) => {
			console.log(`onSubmit`, payload);
			console.log(`params`, listLoaderCtx.paramsRef.current);

			handlePrint(payload.outputType?.id);
		},
		[handlePrint, listLoaderCtx.paramsRef]
	);

	const onSubmitError = useCallback((err) => {
		console.error(`onSubmitError`, err);
	}, []);

	const handleExport = useCallback(
		({ setValue }) =>
			(outputType) => {
				console.log("handleExport", outputType);
				setValue("outputType", outputType);
			},
		[]
	);

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
		onDebugSubmit,
		onSubmit,
		onSubmitError,
		handleExport,
	};
};
