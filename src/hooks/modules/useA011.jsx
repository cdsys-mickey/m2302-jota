import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInit } from "@/shared-hooks/useInit";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useDSG } from "../../shared-hooks/useDSG";
import { useState } from "react";
import A011 from "../../modules/md-a011";
import Errors from "../../shared-modules/sd-errors";
import Objects from "../../shared-modules/sd-objects";
import { useToggle } from "../../shared-hooks/useToggle";
import { useAction } from "../../shared-hooks/useAction";

export const useA011 = ({ token } = {}) => {
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	// const [formExpanded, toggleFormExpanded] = useToggle(false);
	const [expanded, toggleExpanded] = useToggle(false);
	const saveAction = useAction();

	const [state, setState] = useState({
		saveKey: null,
		totalElements: null,
		loading: null,
	});
	const dsg = useDSG({
		gridId: "A011",
		keyColumn: "ProdID",
		otherColumns: "ProdData_N,Price,PriceA,PriceB,PriceC,PriceD,PriceE",
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
					url: "v1/prod-grid/A011",
					bearer: token,
					data: {
						...A011.transformAsQueryParams(criteria),
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
		[httpGetAsync, token]
	);

	const unload = useCallback(() => {
		dsg.handleGridDataLoaded([]);
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
					url: "v1/prod-grid/A011",
					bearer: token,
					data: {
						...A011.transformAsQueryParams(criteria),
						...(state.saveKey && {
							sk: state.saveKey,
						}),
					},
				});
				if (status.success) {
					dsg.handleGridDataLoaded(payload.data[0]["A011_W1"]);
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
		[dsg, httpGetAsync, state.saveKey, token]
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
		const collected = A011.transformForSubmit(dsg.gridData);
		console.log("collected", collected);
		try {
			saveAction.start();
			const { status, error } = await httpPutAsync({
				url: `v1/prod-grid/A011`,
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
	}, [dsg.gridData, httpPutAsync, saveAction, token]);

	return {
		load,
		unload,
		// handleGridChange,
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
