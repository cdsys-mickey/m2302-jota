import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { useSideDrawer } from "@/hooks/useSideDrawer";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { useCallback, useState } from "react";
import P37X from "./P37X.mjs";
import toastEx from "@/shared-components/ToastEx/toastEx";

export default function useP37X() {
	const itemIdRef = useRef();
	const crud = useContext(CrudContext);
	const auth = useContext(AuthContext);
	const appModule = useAppModule({
		// token: auth.token,
		moduleId: "P37X",
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();

	// GRID
	const createRow = useCallback(
		() => ({
			id: nanoid(),
		}),
		[]
	);

	const grid = useDSG({
		gridId: "commissions",
		keyColumn: "id",
		skipDisabled: true,
		createRow: createRow,
		doDirtyCheckByIndex: true,
	});

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
				const { status, payload, error } = await httpGetAsync({
					url: `v1/cms/nc-tour-groups`,
					bearer: auth.token,
					params: {
						id: _id,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data = P37X.transformForReading(payload.data[0]);
					grid.initGridData(data.commissions, {
						fillRows: 5,
					});
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
		[auth.token, crud, grid, httpGetAsync]
	);

	const handleEdit = useCallback(() => {
		grid.handleUnlock();
	}, [grid]);

	const cancelEdit = useCallback(() => {
		grid.handleLock();
		// if (grid.checkDirty()) {
		if (grid.isDirty) {
			loadItem({ refresh: true });
		}
	}, [grid, loadItem]);

	const onSubmit = useCallback(
		async (payload) => {
			console.log("onSubmit", payload);
			console.log("grid.gridData", grid.gridData);
			const data = P37X.transformForEditorSubmit(payload, grid.gridData);
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
					grid.handleLock();

					const newData = P37X.transformForReading(payload.data[0]);
					grid.initGridData(newData.commissions, {
						fillRows: 5,
					});
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
		[auth.token, crud, grid, httpPutAsync]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	return {
		...appModule,
		...crud,
		loadItem,
		grid,
		handleEdit,
		cancelEdit,
		onSubmit,
		onSubmitError,
	};
}
