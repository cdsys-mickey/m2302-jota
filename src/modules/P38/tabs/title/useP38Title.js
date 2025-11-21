import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import { useAppModule } from "@/hooks/jobs/useAppModule";
// import { useSideDrawer } from "@/hooks/useSideDrawer";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext, useRef } from "react";
import P38Titles from "./P38Titles.mjs";

export default function useP38Title() {
	const itemIdRef = useRef();
	const crud = useContext(CrudContext);
	const auth = useContext(AuthContext);
	const appModule = useAppModule({
		// token: auth.token,
		moduleId: "P38",
	});
	// 側邊欄
	// const sideDrawer = useSideDrawer();
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApiAsync();

	const tsRef = useRef();
	const loadItem = useCallback(
		async ({ id, refresh }) => {
			const _id = refresh ? itemIdRef.current : id;
			if (!_id) {
				throw new Error("未指定 id");
			}
			if (!refresh) {
				itemIdRef.current = id;
				crud.startLoading("讀取中...", { id });
			}
			try {
				// const encodedId = encodeURIComponent(id);
				const { status, payload, error } = await httpGetAsync({
					url: `v1/cms/settings`,
					bearer: auth.token,
					// params: {
					// 	id: _id
					// },
				});
				console.log("payload", payload);
				if (status.success) {
					tsRef.current = payload.CheckData.TimeVal;
					const data = P38Titles.transformForReading(payload.data[0]);
					crud.finishedLoading({
						data,
					});
				} else if (status.code === 404) {
					crud.finishedLoading({
						Head: "",
						Tail: [],
						CmsCalc: null,
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

	// const handleEdit = useCallback(() => {
	// 	crud.promptUpdating();
	// }, [crud]);

	const cancelEdit = useCallback(() => {
		crud.cancelUpdating();
		loadItem({ refresh: true });
	}, [crud, loadItem]);

	const onSubmit = useCallback(
		async (payload) => {
			console.log("onSubmit", payload);
			const data = P38Titles.transformForEditorSubmit(payload);
			console.log("data", data);
			try {
				crud.startUpdating();
				const { status, error, payload } = await httpPutAsync({
					url: "v1/cms/settings",
					data: data,
					params: {
						ts: tsRef.current,
					},
					bearer: auth.token,
				});
				if (status.success) {
					toastEx.success(`儲存成功`);
					crud.finishedUpdating();

					tsRef.current = payload.CheckData.TimeVal;
				} else {
					throw error || new Error(`儲存發生未預期例外`);
				}
			} catch (err) {
				crud.failedUpdating(err);
				toastEx.error(`儲存失敗`, err);
			}
		},
		[auth.token, crud, httpPutAsync]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	return {
		...appModule,
		...crud,
		loadItem,
		// handleEdit,
		cancelEdit,
		onSubmit,
		onSubmitError,
	};
}
