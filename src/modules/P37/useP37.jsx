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
import P37 from "./P37.mjs";

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

	// GRID
	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
		}),
		[]
	);

	const grid = useDSG({
		gridId: "commissions",
		keyColumn: "id",
		skipDisabled: true,
		createRow: createRow,
	});

	const gridDisabled = useMemo(() => {
		return !crud.editing;
	}, [crud.editing]);

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
					url: `v1/cms/nc-tour-groups`,
					bearer: auth.token,
					params: {
						id: _id
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data = P37.transformForReading(payload.data[0]);
					grid.initGridData(data.commissions, {
						fillRows: 5
					})
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
	}, [grid]);

	const onSubmit = useCallback(async (payload) => {
		console.log("onSubmit", payload);
		console.log("grid.gridData", grid.gridData);
		const data = P37.transformForEditorSubmit(payload, grid.gridData);
		console.log("data", data);
	}, [grid.gridData])

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, [])

	return {
		...appModule,
		...crud,
		loadItem,
		grid,
		handleEdit,
		cancelEdit,
		onSubmit,
		onSubmitError
	}

}