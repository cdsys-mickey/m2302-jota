import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useAction } from "@/shared-hooks/useAction";
import { useDSG } from "@/shared-hooks/useDSG";
import { useToggle } from "@/shared-hooks/useToggle";
import Errors from "@/shared-modules/sd-errors";
import Objects from "@/shared-modules/sd-objects";
import { useContext } from "react";
import { AppFrameContext } from "../shared-contexts/app-frame/AppFrameContext";
import { useRef } from "react";

export const useProdGrid = ({
	token,
	gridId,
	keyColumn,
	otherColumns,
	baseUri,
	transformAsQueryParams,
	transformForSubmit,
	transformForGridEdior,
}) => {
	const { httpGetAsync, httpPutAsync } = useWebApi();
	const [expanded, toggleExpanded] = useToggle(false);
	const saveAction = useAction();
	const appFrame = useContext(AppFrameContext);
	const recoverDrawerOpen = useRef();

	const [loading, setLoading] = useState();
	const [state, setState] = useState({
		criteria: null,
		saveKey: null,
		totalElements: null,
	});
	const dsg = useDSG({
		gridId,
		keyColumn,
		otherColumns,
	});
	const { gridData, dirtyIds } = dsg;

	const toggleEditorLock = useCallback(() => {
		if (dsg.readOnly) {
			recoverDrawerOpen.current = appFrame.drawerOpen;
			console.log(`og drawer opened memoised`);
			appFrame.handleDrawerClose();
		} else {
			if (recoverDrawerOpen.current === true) {
				appFrame.handleDrawerOpen();
			}
		}
		dsg.toggleReadOnly();
	}, [appFrame, dsg]);

	const peek = useCallback(
		async (criteria) => {
			if (!token) {
				throw new Error("token not specified");
			}
			if (Objects.isAllPropsEmpty(criteria)) {
				console.log("criteria is empty");
				if (state.saveKey) {
					setState((prev) => ({
						...prev,
						saveKey: null,
						totalElements: null,
					}));
				}
				return;
			}
			// setState((prev) => ({
			// 	...prev,
			// 	loading: true,
			// }));
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
				toast.error(Errors.getMessage("篩選失敗", err));
			} finally {
				// setState((prev) => ({
				// 	...prev,
				// 	loading: false,
				// }));
				setLoading(false);
			}
		},
		[baseUri, httpGetAsync, state.saveKey, token, transformAsQueryParams]
	);

	const unload = useCallback(() => {
		dsg.handleGridDataLoaded(null);
	}, [dsg]);

	const load = useCallback(
		async ({ criteria, reload = false }) => {
			console.log(`saveKey`, state.saveKey);
			if (!token) {
				throw new Error("token not specified");
			}

			if (!reload) {
				dsg.setGridLoading(true);
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
					dsg.handleGridDataLoaded(transformForGridEdior(payload));
				} else {
					switch (status.code) {
						default:
							toast.error(`發生未預期例外 ${status.code}`);
							break;
					}
				}
			} catch (err) {
				console.error("load", err);
			} finally {
				dsg.setGridLoading(false);
				setState((prev) => ({
					...prev,
					saveKey: null,
				}));
			}
		},
		[
			baseUri,
			dsg,
			httpGetAsync,
			state.saveKey,
			token,
			transformAsQueryParams,
			transformForGridEdior,
		]
	);

	const reload = useCallback(() => {
		load({
			criteria: state.criteria,
			reload: true,
		});
	}, [load, state.criteria]);

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
		const collected = transformForSubmit(gridData, dirtyIds);
		console.log("collected", collected);
		try {
			saveAction.start();
			const { status, error } = await httpPutAsync({
				url: baseUri,
				data: collected,
				bearer: token,
			});
			if (status.success) {
				toast.success(`${collected.length}筆商品資料已更新`);
				reload();
				saveAction.finish();
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			saveAction.fail(err);
			toast.error(Errors.getMessage("儲存失敗", err));
		}
	}, [
		baseUri,
		dirtyIds,
		gridData,
		httpPutAsync,
		reload,
		saveAction,
		token,
		transformForSubmit,
	]);

	return {
		load,
		reload,
		unload,
		...dsg,
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
	};
};
