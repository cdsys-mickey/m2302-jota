import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useWebApiAsync } from "@/shared-hooks";
import { nanoid } from "nanoid";
import { useCallback, useContext, useRef } from "react";
import UserSettingEditors from "./UserSettingEditors.mjs";
import Settings from "@/modules/settings/Settings.mjs";
import { useMemo } from "react";

export default function useUserSettingEditor({
	id,
	moduleId,
	scope = Settings.SCOPES.USER,
	defaultValues = {},
}) {
	const itemIdRef = useRef();
	const crud = useContext(CrudContext);
	const auth = useContext(AuthContext);
	const appModule = useAppModule({
		moduleId,
	});
	// 側邊欄
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApiAsync();

	// GRID
	// const createRow = useCallback(
	// 	() => ({
	// 		id: nanoid(),
	// 	}),
	// 	[]
	// );

	const grid = useDSG({
		gridId: "settings",
		keyColumn: "id",
		skipDisabled: true,
		// createRow: createRow,
		doDirtyCheckByIndex: true,
	});

	const apiUrl = useMemo(() => {
		return `v1/${scope}/settings`;
	}, [scope]);

	const loadItem = useCallback(
		async ({ refresh }) => {
			if (!id) {
				throw new Error("未指定 id");
			}
			if (!refresh) {
				itemIdRef.current = id;
				crud.startLoading("讀取中...", { id });
			}
			try {
				const { status, payload, error } = await httpGetAsync({
					url: apiUrl,
					bearer: auth.token,
					params: {
						id: id,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data =
						UserSettingEditors.transformForReading(payload);
					grid.initGridData(data, {
						// fillRows: 5
					});
					crud.finishedLoading({
						data,
					});
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				const defaultData =
					UserSettingEditors.transformForReading(defaultValues);
				switch (err?.status) {
					case 404:
						grid.initGridData(defaultData, {
							// fillRows: 5
						});
						crud.finishedLoading({
							data: defaultData,
						});
						break;
					default:
						console.error(err);
						crud.failedLoading(err);
						break;
				}
			}
		},
		[id, crud, httpGetAsync, apiUrl, auth.token, grid, defaultValues]
	);

	// const handleEdit = useCallback(() => {
	// 	grid.handleUnlock();
	// 	crud.promptUpdating();
	// }, [crud, grid]);

	const cancelEdit = useCallback(() => {
		grid.handleLock();
		// if (grid.checkDirty()) {
		if (grid.isDirty) {
			loadItem({ refresh: true });
		}
		crud.cancelEditing();
	}, [crud, grid, loadItem]);

	const onSubmit = useCallback(
		async (payload) => {
			console.log("onSubmit", payload);
			console.log("grid.gridData", grid.gridData);
			const data = UserSettingEditors.transformForGridSubmit(
				grid.gridData
			);
			console.log("data", data);
			try {
				crud.startUpdating();
				const { status, error, payload } = await httpPutAsync({
					url: apiUrl,
					data,
					params: {
						id: id,
					},
					bearer: auth.token,
				});
				if (status.success) {
					toastEx.success(`儲存成功`);
					crud.finishedUpdating();
					grid.handleLock();

					// const newData = UserSettingEditors.transformForReading(payload);
					// grid.initGridData(newData, {
					// 	// fillRows: 5
					// })
					// crud.finishedLoading({
					// 	data: newData,
					// });
				} else {
					throw error || new Error(`儲存發生未預期例外`);
				}
			} catch (err) {
				crud.failedUpdating(err);
				toastEx.error(`儲存失敗`, err);
			}
		},
		[apiUrl, auth.token, crud, grid, httpPutAsync, id]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	return {
		...appModule,
		...crud,
		loadItem,
		grid,
		// handleEdit,
		cancelEdit,
		onSubmit,
		onSubmitError,
	};
}
