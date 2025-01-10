import { toastEx } from "@/helpers/toast-ex";
import { useAction } from "@/shared-hooks/useAction";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import Objects from "@/shared-modules/sd-objects";
import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/auth/AuthContext";
import { AppFrameContext } from "../shared-contexts/app-frame/AppFrameContext";
import { DialogsContext } from "../shared-contexts/dialog/DialogsContext";
import { LastFieldBehavior } from "../shared-contexts/form-meta/LastFieldBehavior";
import { useFormMeta } from "../shared-contexts/form-meta/useFormMeta";

export const useProdGrid = ({
	grid,
	baseUri,
	transformAsQueryParams,
	transformForSubmitting,
	transformForReading,
	safeQty
}) => {
	const { token } = useContext(AuthContext);
	const dialogs = useContext(DialogsContext);
	const { httpGetAsync, httpPutAsync } = useWebApi();
	const [expanded, toggleExpanded] = useToggle(true);
	const saveAction = useAction();
	const appFrame = useContext(AppFrameContext);
	const beforeToggleRef = useRef({
		drawerOpen: null,
		expanded: null
	});

	const [loading, setLoading] = useState();
	const [state, setState] = useState({
		criteria: null,
		saveKey: null,
		totalElements: null,
	});

	const { gridData, dirtyIds } = grid;

	const formMeta = useFormMeta(
		safeQty ?
			`
		prodId,
		prodName,
		catL,
		catM,
		catS,
		typeA,
		typeB,
		taxType,
		safeQty
		` : `
		prodId,
		prodName,
		catL,
		catM,
		catS,
		typeA,
		typeB,
		taxType
		`
	);

	const toggleEditorLock = useCallback(() => {
		if (grid.readOnly) {
			beforeToggleRef.current = {
				drawerOpen: appFrame.drawerOpen,
				expanded: expanded
			}
			console.log(`og drawer opened memoised`);
			appFrame.handleDrawerClose();
			if (expanded) {
				toggleExpanded();
			}
		} else {
			if (beforeToggleRef.current.drawerOpen) {
				appFrame.handleDrawerOpen();
			}
			if (beforeToggleRef.current.expanded) {
				toggleExpanded()
			}
		}
		grid.toggleReadOnly();
	}, [appFrame, expanded, grid, toggleExpanded]);

	const peek = useCallback(
		async (criteria) => {
			if (!token) {
				throw new Error("token not specified");
			}
			if (Objects.isAllPropsEmpty(criteria)) {
				console.log("criteria is empty");
				// if (state.saveKey) {
				// 	setState((prev) => ({
				// 		...prev,
				// 		saveKey: null,
				// 		totalElements: null,
				// 	}));
				// }
				setState((prev) => ({
					...prev,
					saveKey: null,
					totalElements: null,
				}));
				return;
			}
			setLoading(true);
			try {
				const { status, payload, error } = await httpGetAsync({
					url: baseUri,
					bearer: token,
					params: {
						...transformAsQueryParams(criteria),
						pk: 1,
					},
				});
				if (status.success) {
					setState((prev) => ({
						...prev,
						saveKey: payload.Select?.SaveKey,
						totalElements: payload.Select?.TotalRecord,
					}));
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				console.error("peek failed", err);
				toastEx.error("篩選失敗", err);
			} finally {
				setLoading(false);
			}
		},
		[baseUri, httpGetAsync, token, transformAsQueryParams]
	);

	const unload = useCallback(() => {
		grid.handleGridDataLoaded(null);
	}, [grid]);

	const load = useCallback(
		async (opts = {}) => {
			const { criteria, reload = false } = opts;
			console.log(`saveKey`, state.saveKey);
			if (!token) {
				throw new Error("token not specified");
			}

			if (!reload) {
				grid.setGridLoading(true);
				setState((prev) => ({
					...prev,
					criteria,
				}));
			}

			try {
				const { status, payload } = await httpGetAsync({
					url: baseUri,
					bearer: token,
					params: {
						...transformAsQueryParams(criteria),
						...(state.saveKey && {
							sk: state.saveKey,
						}),
					},
				});
				if (status.success) {
					grid.handleGridDataLoaded(transformForReading(payload));
				} else {
					switch (status.code) {
						default:
							toastEx.error(`發生未預期例外 ${status.code}`);
							break;
					}
				}
			} catch (err) {
				console.error("load", err);
			} finally {
				grid.setGridLoading(false);
				setState((prev) => ({
					...prev,
					saveKey: null,
				}));
			}
		},
		[
			baseUri,
			grid,
			httpGetAsync,
			state.saveKey,
			token,
			transformAsQueryParams,
			transformForReading,
		]
	);

	const reload = useCallback(() => {
		load({
			criteria: state.criteria,
			reload: true,
		});
	}, [load, state.criteria]);

	const confirmCancelChanges = useCallback(() => {
		dialogs.confirm({
			message: "確定要回復變更?",
			onConfirm: grid.rollbackChanges,
		});
	}, [dialogs, grid.rollbackChanges]);

	const onSubmit = useCallback(
		(data) => {
			console.log(`onSubmit`, data);
			load({ criteria: data });
		},
		[load]
	);

	const onSubmitError = useCallback((err) => {
		console.error(`onSubmitError`, err);
	}, []);

	const handleSave = useCallback(async () => {
		console.log(`handleSave`, gridData);
		const collected = transformForSubmitting(gridData, dirtyIds);
		console.log("collected", collected);
		try {
			saveAction.start();
			const { status, error } = await httpPutAsync({
				url: baseUri,
				data: collected,
				bearer: token,
			});
			if (status.success) {
				toastEx.success(`${collected.length}筆商品資料已更新`);
				reload();
				saveAction.finish();
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			saveAction.fail({
				error: err
			});
			toastEx.error("儲存失敗", err);
		}
	}, [
		baseUri,
		dirtyIds,
		gridData,
		httpPutAsync,
		reload,
		saveAction,
		token,
		transformForSubmitting,
	]);

	return {
		load,
		reload,
		unload,
		// ...grid,
		// form
		onSubmit,
		onSubmitError,
		...state,
		peek,
		expanded,
		toggleExpanded,
		saveWorking: saveAction.working,
		handleSave,
		toggleEditorLock,
		loading,
		confirmCancelChanges,
		formMeta
	};
};
