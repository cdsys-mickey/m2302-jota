import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useAction } from "@/shared-hooks/useAction";
import { useDSG } from "@/shared-hooks/useDSG";
import { useToggle } from "@/shared-hooks/useToggle";
import Errors from "@/shared-modules/sd-errors";
import Objects from "@/shared-modules/sd-objects";

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
	// const [formExpanded, toggleFormExpanded] = useToggle(false);
	const [expanded, toggleExpanded] = useToggle(false);
	const saveAction = useAction();

	const [state, setState] = useState({
		saveKey: null,
		totalElements: null,
		loading: null,
	});
	const dsg = useDSG({
		gridId,
		keyColumn,
		otherColumns,
	});

	const peek = useCallback(
		async (criteria) => {
			if (!token) {
				throw new Error("token not specified");
			}
			if (Objects.isAllPropsEmpty(criteria)) {
				setState((prev) => ({
					...prev,
					saveKey: null,
					totalElements: null,
				}));
				return;
			}
			setState((prev) => ({
				...prev,
				loading: true,
			}));
			try {
				const { status, payload, error } = await httpGetAsync({
					url: baseUri,
					bearer: token,
					data: {
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
					throw error;
				}
			} catch (err) {
				console.error("peek failed", err);
				toast.error(Errors.getMessage("篩選失敗", err));
			} finally {
				setState((prev) => ({
					...prev,
					loading: false,
				}));
			}
		},
		[baseUri, httpGetAsync, token, transformAsQueryParams]
	);

	const unload = useCallback(() => {
		dsg.handleGridDataLoaded(null);
	}, [dsg]);

	const load = useCallback(
		async (criteria) => {
			console.log(`saveKey`, state.saveKey);
			if (!token) {
				throw new Error("token not specified");
			}

			dsg.setGridLoading(true);

			try {
				const { status, payload } = await httpGetAsync({
					url: baseUri,
					bearer: token,
					data: {
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

	const onSubmit = useCallback(
		(data) => {
			console.log(`onSubmit`, data);
			load(data);
		},
		[load]
	);

	const onSubmitError = useCallback((err) => {
		console.error(`onSubmitError`, err);
	}, []);

	const handleSave = useCallback(async () => {
		console.log(`handleSave`, dsg.gridData);
		const collected = transformForSubmit(dsg.gridData);
		console.log("collected", collected);
		try {
			saveAction.start();
			const { status, error } = await httpPutAsync({
				url: baseUri,
				data: collected,
				bearer: token,
			});
			if (status.success) {
				toast.success("商品資料已更新");
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
		dsg.gridData,
		httpPutAsync,
		saveAction,
		token,
		transformForSubmit,
	]);

	return {
		load,
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
	};
};