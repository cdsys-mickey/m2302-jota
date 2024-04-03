import { useContext } from "react";
import { useCallback, useState } from "react";
import CrudContext from "../../contexts/crud/CrudContext";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useAppModule } from "./useAppModule";
import { useWebApi } from "../../shared-hooks/useWebApi";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { useInfiniteLoader } from "../../shared-hooks/useInfiniteLoader";
import { useDSG } from "../../shared-hooks/useDSG";
import { useAction } from "../../shared-hooks/useAction";
import { useRef } from "react";

export const useB05 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();

	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "B05",
	});

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/purchase/inquiries",
		bearer: token,
		initialFetchSize: 50,
	});

	const quoteGrid = useDSG({
		gridId: "quotes",
		keyColumn: "pkey",
	});

	// CREATE
	// const promptCreating = useCallback(() => {
	// 	crud.promptCreating();
	// }, [crud]);

	// READ
	const loadItem = useCallback(
		async ({ id, refresh = false }) => {
			try {
				const itemId = refresh ? itemIdRef.current : id;
				if (!refresh) {
					itemIdRef.current = id;
					crud.readStart();
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/inquiries",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					crud.doneReading({
						data: payload,
					});
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.readFail(err);
			}
		},
		[crud, httpGetAsync, token]
	);

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	return {
		...crud,
		...listLoader,
		...appModule,
		...quoteGrid,
		// 報價 Grid
		loadItem,
		onSearchSubmit,
		onSearchSubmitError,
	};
};
