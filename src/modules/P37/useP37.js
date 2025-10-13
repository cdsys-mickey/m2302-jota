import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useSideDrawer } from "@/hooks/useSideDrawer";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useRef, useState } from "react";
import P37 from "./P37.mjs";
import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";
import UserSettingEditors from "@/shared-modules/UserSettingEditor/UserSettingEditors.mjs";
import P38 from "../P38/P38.mjs";
import UserSettings from "../UserSettings.mjs";
import { useInit } from "@/shared-hooks/useInit";
import useCmsGroupTypeAlias from "@/hooks/useCmsGroupTypeAlias";

export default function useP37() {
	const itemIdRef = useRef();
	const crud = useContext(CrudContext);
	const auth = useContext(AuthContext);
	const appModule = useAppModule({
		// token: auth.token,
		moduleId: "P37",
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();

	const [selectedTab, setSelectedTab] = useState(
		CmsGroupTypes.Types.DOMESTIC
	);
	const [busCmsType, setBusCmsType] = useState(null);
	const [groupAliasMap, loadGroupAliasMap] = useCmsGroupTypeAlias();

	const loadItem = useCallback(
		async ({ id, refresh }) => {
			const _id = refresh ? itemIdRef.current : id;
			if (!_id) {
				throw new Error("未指定 id");
			}
			if (!refresh) {
				itemIdRef.current = id;
			}
			crud.startLoading("讀取中...", { id }); // 一定要有狀態改變, 否則不會觸發 onItemDataReady
			try {
				const { status, payload, error } = await httpGetAsync({
					url: `v1/cms/nc-tour-groups`,
					bearer: auth.token,
					params: {
						id: _id,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					let data;
					if (_id == CmsGroupTypes.Types.CHINA) {
						data = P37.transformForChinaReading(payload.data[0]);
						setBusCmsType(
							payload.data[0].ComNCont_S?.[0].SDrvCms?.includes(
								"%"
							)
								? 1
								: 0
						);
					} else {
						data = P37.transformForReading(payload.data[0]);
						setBusCmsType(null);
					}
					crud.finishedLoading({
						data,
					});
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				crud.failedLoading(err);
			}
		},
		[auth.token, crud, httpGetAsync]
	);

	const onSubmit = useCallback(
		async (payload) => {
			console.log("onSubmit", payload);
			const data = P37.transformForEditorSubmit(payload, selectedTab);
			console.log("data", data);
			try {
				crud.startUpdating();
				const { status, error, payload } = await httpPutAsync({
					url: "v1/cms/nc-tour-groups",
					data,
					bearer: auth.token,
				});
				if (status.success) {
					toastEx.success(`儲存成功`);
					crud.finishedUpdating();

					let newData;
					if (selectedTab == CmsGroupTypes.Types.CHINA) {
						newData = P37.transformForChinaReading(payload.data[0]);
						setBusCmsType(
							payload.data[0].ComNCont_S?.[0].SDrvCms?.includes(
								"%"
							)
								? 1
								: 0
						);
					} else {
						newData = P37.transformForReading(payload.data[0]);
						setBusCmsType(null);
					}
					crud.finishedLoading({
						data: newData,
					});
				} else {
					throw error || new Error(`儲存發生未預期例外`);
				}
			} catch (err) {
				crud.failedUpdating(err);
				toastEx.error(`儲存失敗`, err);
			}
		},
		[auth.token, crud, httpPutAsync, selectedTab]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	const handleTabChange = useCallback(
		(e, newValue) => {
			setSelectedTab(newValue);
			loadItem({ id: newValue });
		},
		[loadItem]
	);

	const handleBusCmsTypeChange = useCallback((newValue) => {
		console.log("newValue", newValue);
	}, []);

	const cancelEditing = useCallback(() => {
		crud.cancelEditing();
		loadItem({ refresh: true });
	}, [crud, loadItem]);

	useInit(() => {
		loadGroupAliasMap();
	}, []);

	return {
		...appModule,
		...crud,
		cancelEditing,
		loadItem,
		onSubmit,
		onSubmitError,
		selectedTab,
		handleTabChange,
		busCmsType,
		handleBusCmsTypeChange,
		groupAliasMap,
		loadGroupAliasMap,
	};
}
