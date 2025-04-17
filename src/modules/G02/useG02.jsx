import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toastEx";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Objects from "@/shared-modules/Objects";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";

import { useAppModule } from "@/hooks/jobs/useAppModule";
import useJotaReports from "@/hooks/useJotaReports";
import { useSideDrawer } from "@/hooks/useSideDrawer";
import G02 from "./G02.mjs";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";

export const useG02 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const appModule = useAppModule({
		token,
		moduleId: "G02",
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const [selectedInq, setSelectedInq] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
	} = useWebApi();
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
		return `${config.REPORT_URL}/WebG02Rep.aspx`
	}, [config.REPORT_URL])
	const reports = useJotaReports();

	const writeOffAction = useAction();

	const handleWriteOff = useCallback(async () => {
		const collected = listLoader.getItemDataByIndex(listLoaderContext.checked);
		console.log("handleWriteOff", collected);
		try {
			writeOffAction.start();
			const { status, error } = await httpPostAsync({
				url: "v1/sales/recv-accounts",
				data: collected,
				bearer: token
			})
			if (status.success) {
				listLoaderContext.uncheckAll();
				writeOffAction.clear();
				listLoader.loadList({
					refresh: true,
					supressLoading: true
				});
				toastEx.success(`沖銷已完成`);
			} else {
				throw error || `發生未預期例外`
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
		(payload) => {
			console.log("onPrintSubmit", payload);

			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "G02",
				IDs: crud.itemData?.InqID,
			};
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.InqID, operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback((outputType) => {
		console.log("handlePrint", outputType);
		const data = {
			...(outputType && {
				Action: outputType.id,
			}),
			DeptID: operator?.CurDeptID,
			JobName: "G02",
			IDs: crud.itemData?.InqID,
		};
		console.log("data", data);
		reports.open(reportUrl, data);
	}, [crud.itemData?.InqID, operator?.CurDeptID, reportUrl, reports]);

	// const uncheckAll = useCallback(() => {
	// 	listLoaderContext.uncheckAll();
	// }, [listLoaderContext]);

	// const getChecked = useCallback(() => {
	// 	return listLoader.getItemDataByIndex(listLoaderContext.checked);
	// }, [listLoader, listLoaderContext.checked]);

	const checked = useMemo(() => {
		return listLoader.getItemDataByIndex(listLoaderContext.checked)
	}, [listLoader, listLoaderContext.checked])

	return {
		...crud,
		...listLoader,
		...appModule,
		onSearchSubmit,
		onSearchSubmitError,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		handlePrint,
		handleWriteOff,
		confirmWriteOff,
		// uncheckAll,
		...listLoaderContext,
		// override InfiniteLoaderContext.Provider
		checked,
	};
};

