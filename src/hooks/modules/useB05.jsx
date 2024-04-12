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
import B05 from "../../modules/md-b05";
import Errors from "../../shared-modules/sd-errors";
import { toast } from "react-toastify";

export const useB05 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();

	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "B05",
	});

	const [selectedInq, setSelectedInq] = useState();

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
	const promptCreating = useCallback(() => {
		const data = {
			InqDate: new Date(),
			quotes: [],
		};
		crud.promptCreating({ data });
		quoteGrid.handleGridDataLoaded(data.quotes);
	}, [crud, quoteGrid]);

	// READ
	const loadItem = useCallback(
		async ({ id, refresh = false }) => {
			try {
				const itemId = refresh ? itemIdRef.current : id;
				if (!refresh) {
					itemIdRef.current = id;
					crud.startReading("讀取中...", { id });
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/inquiries",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = B05.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					setSelectedInq(data);

					quoteGrid.handleGridDataLoaded(data.quotes);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, quoteGrid, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			// setSelectedItem(rowData);

			loadItem({ id: rowData.詢價單號 });
		},
		[crud, loadItem]
	);

	const confirmQuitCreating = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄新增?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmQuitUpdating = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄修改?",
			onConfirm: () => {
				crud.cancelAction();
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

	const confirmReturnReading = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const handleQuoteGridChange = useCallback(
		(newValue, operations) => {
			// const operation = operations[0];
			// console.log("operation", operation);
			// console.log("newValue", newValue);

			quoteGrid.propagateGridChange(newValue, operations);
		},
		[quoteGrid]
	);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/purchase/inquiries",
					data: data,
					bearer: token,
				});
				if (status.success) {
					toast.success(`新增成功`);
					crud.doneCreating();
					crud.cancelReading();
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failCreating();
				console.error("handleCreate.failed", err);
				toast.error(Errors.getMessage("新增失敗", err));
			}
		},
		[crud, httpPostAsync, listLoader, token]
	);

	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				const { status, error } = await httpPutAsync({
					url: "v1/purchase/inquiries",
					data: data,
					bearer: token,
				});
				if (status.success) {
					toast.success(`修改成功`);
					crud.doneUpdating();
					//crud.cancelReading();
					loadItem({ refresh: true });
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failUpdating();
				console.error("handleCreate.failed", err);
				toast.error(Errors.getMessage("修改失敗", err));
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = B05.transformForSubmitting(
				data,
				quoteGrid.gridData
			);
			console.log("collected", collected);
			if (crud.creating) {
				handleCreate({ data: collected });
			} else if (crud.updating) {
				handleUpdate({ data: collected });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[
			crud.creating,
			crud.updating,
			handleCreate,
			handleUpdate,
			quoteGrid.gridData,
		]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
	}, []);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		// console.log(`getRowKey, rowIndex: ${rowIndex}, rowData:`, rowData);
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	// 載入商品
	const importProdsAction = useAction();

	const onLoadProdsSubmit = useCallback((data) => {
		console.log("onLoadProdsSubmit", data);
	}, []);

	const onLoadProdsSubmitError = useCallback((err) => {
		console.error("onLoadProdsSubmitError", err);
	}, []);

	return {
		...crud,
		...listLoader,
		...appModule,
		selectedInq,
		loadItem,
		handleSelect,
		onSearchSubmit,
		onSearchSubmitError,
		confirmQuitCreating,
		confirmQuitUpdating,
		confirmReturnReading,
		promptCreating,
		onEditorSubmit,
		onEditorSubmitError,
		// 報價 Grid
		...quoteGrid,
		handleQuoteGridChange,
		getRowKey,
		// 載入商品
		promptImportProds: importProdsAction.prompt,
		cancelImportProds: importProdsAction.clear,
		importProdsDialogOpen: importProdsAction.active,
		onLoadProdsSubmit,
		onLoadProdsSubmitError,
	};
};
