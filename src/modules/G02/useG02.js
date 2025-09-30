import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/helpers/toastEx";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import useAction from "@/shared-modules/ActionState/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useMemo, useRef, useState } from "react";

import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import useJotaReports from "@/hooks/useJotaReports";
import { useSideDrawer } from "@/hooks/useSideDrawer";
import useDebugDialog from "@/hooks/useDebugDialog";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";

export const useG02 = () => {
	const crud = useContext(CrudContext);
	const { token, operator } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const listLoaderCtx = useContext(InfiniteLoaderContext);
	const appModule = useAppModule({
		token,
		moduleId: "G02",
	});
	const appFrame = useContext(AppFrameContext);
	const debugDialog = useDebugDialog();

	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/sales/recv-accounts",
		bearer: token,
		initialFetchSize: 50,
	});

	const listLoaderContext = useContext(InfiniteLoaderContext);

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebG02Rep.aspx`;
	}, [config.REPORT_URL]);
	const reports = useJotaReports();

	const writeOffAction = useAction();

	const handleWriteOff = useCallback(async () => {
		const collected = listLoader.getItemDataByIndex(
			listLoaderContext.checked
		);
		console.log("handleWriteOff", collected);
		try {
			writeOffAction.start();
			const { status, error } = await httpPostAsync({
				url: "v1/sales/recv-accounts",
				data: collected,
				bearer: token,
			});
			if (status.success) {
				listLoaderContext.uncheckAll();
				writeOffAction.clear();
				listLoader.loadList({
					refresh: true,
					supressLoading: true,
				});
				toastEx.success(`沖銷已完成`);
			} else {
				throw error || `發生未預期例外`;
			}
		} catch (err) {
			writeOffAction.fail({ error: err });
			toastEx.error("沖銷失敗", err);
		}
	}, [httpPostAsync, listLoader, listLoaderContext, token, writeOffAction]);

	const confirmWriteOff = useCallback(() => {
		if (!listLoaderContext.checked.length) {
			toastEx.error("尚未勾選任何單據");
			return;
		}
		dialogs.confirm({
			message: `確認要沖銷 ${listLoaderContext.checked.length} 張單據?`,
			onConfirm: handleWriteOff,
		});
	}, [dialogs, handleWriteOff, listLoaderContext.checked.length]);

	const onPrintSubmit = useCallback(
		async (payload) => {
			console.log("onPrintSubmit", payload);

			// fetch ListView data
			const {
				status,
				payload: fetchPayload,
				error,
			} = await httpGetAsync({
				bearer: token,
				url: "v1/sales/recv-accounts",
				params: {
					...listLoaderCtx.paramsRef.current,
					np: 1,
				},
			});
			if (status.success) {
				console.log("payload", fetchPayload.data);
				if (!fetchPayload.data?.length) {
					toastEx.error("目前查詢沒有資料", {
						position: "top-right",
					});
					return;
				}
			} else {
				toastEx.error("讀取資料發生錯誤", error);
				return;
			}

			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "G01",
				G02_S: fetchPayload.data ?? [],
			};
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[
			httpGetAsync,
			listLoaderCtx.paramsRef,
			operator?.CurDeptID,
			reportUrl,
			reports,
			token,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const onDebugPrintSubmit = useCallback(
		async (payload) => {
			console.log("onPrintSubmit", payload);

			// fetch ListView data
			const {
				status,
				payload: fetchPayload,
				error,
			} = await httpGetAsync({
				bearer: token,
				url: "v1/sales/recv-accounts",
				params: {
					...listLoaderCtx.paramsRef.current,
					np: 1,
				},
			});
			if (status.success) {
				console.log("payload", fetchPayload.data);
				if (!fetchPayload.data?.length) {
					toastEx.error("目前查詢沒有資料", {
						position: "top-right",
					});
					return;
				}
			} else {
				toastEx.error("讀取資料發生錯誤", error);
				return;
			}

			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "G01",
				G02_S: fetchPayload.data ?? [],
			};
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
			httpGetAsync,
			listLoaderCtx.paramsRef,
			operator?.CurDeptID,
			reportUrl,
			token,
		]
	);

	const checked = useMemo(() => {
		return listLoader.getItemDataByIndex(listLoaderContext.checked);
	}, [listLoader, listLoaderContext.checked]);

	return {
		...crud,
		...listLoader,
		...appModule,
		onSearchSubmit,
		onSearchSubmitError,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		onDebugPrintSubmit,
		handleWriteOff,
		confirmWriteOff,
		// uncheckAll,
		...listLoaderContext,
		// override InfiniteLoaderContext.Provider
		checked,
	};
};
