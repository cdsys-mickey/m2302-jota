/* eslint-disable no-mixed-spaces-and-tabs */
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import CrudContext from "@/contexts/crud/CrudContext";
import A01 from "@/modules/md-a01";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useAction } from "@/shared-hooks/useAction";
import { useDSG } from "@/shared-hooks/useDSG";
import { useInit } from "@/shared-hooks/useInit";
import { useToggle } from "@/shared-hooks/useToggle";
import Errors from "@/shared-modules/sd-errors";
import WebApi from "@/shared-modules/sd-web-api";
import { useAppModule } from "./useAppModule";

/**
 * 適用三種情境
 * 1. 商品維護 A01
 * 2. 新商品維護(覆核) - A010
 * 3. 門市櫃位維護 - A011
 */
export const useA01 = ({ token, mode }) => {
	const [selectedTab, setSelectedTab] = useState(A01.Tabs.INFO);
	const crud = useContext(CrudContext);
	const moduleId = useMemo(() => {
		switch (mode) {
			case A01.Mode.NEW_PROD:
				return "A010";
			case A01.Mode.STORE:
				return "AA01";
			default:
				return "A01";
		}
	}, [mode]);

	const appModule = useAppModule({
		token,
		moduleId: moduleId,
	});
	const { clearParams } = useContext(AppFrameContext);

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpPatchAsync,
		httpDeleteAsync,
	} = useWebApi();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const url = useMemo(() => {
		switch (mode) {
			case A01.Mode.NEW_PROD:
				return "v1/new-prods";
			default:
				return "v1/prods";
		}
	}, [mode]);

	const listLoader = useInfiniteLoader({
		url: url,
		bearer: token,
		initialFetchSize: 50,
	});

	if (!mode) {
		throw `mode 未指定`;
	}

	//ProdTransGrid
	const transGrid = useDSG({
		gridId: "trans",
		keyColumn: "dept.DeptID",
	});

	//ProdComboGrid
	const comboGrid = useDSG({
		gridId: "combo",
		keyColumn: "prod.ProdID",
	});

	const confirmReturn = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
			},
		});
	}, [crud, dialogs]);

	const loadItem = useCallback(
		async ({ id }) => {
			crud.startReading("讀取中...", { id });
			try {
				// const encodedProdId = encodeURIComponent(prodId);
				const { status, payload, error } = await httpGetAsync({
					url: url,
					data: {
						id,
					},
					bearer: token,
				});
				console.log("payload", payload);
				if (status.success) {
					const data = A01.transformForReading(payload);

					transGrid.initGridData(data.trans);
					comboGrid.initGridData(data.combo);

					crud.doneReading({
						data: data,
					});
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				crud.failReading(
					WebApi.mapStatusText(err, {
						404: `找不到${
							mode === A01.Mode.NEW_PROD ? "新" : ""
						}商品 ${id}`,
					})
				);
			}
		},
		[comboGrid, crud, httpGetAsync, mode, token, transGrid, url]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			setSelectedTab(A01.Tabs.INFO);
			crud.cancelAction();
			setSelectedItem(rowData);

			loadItem({ id: rowData.ProdID });
		},
		[crud, loadItem]
	);

	const selectById = useCallback(
		async (id) => {
			setSelectedTab(A01.Tabs.INFO);
			crud.cancelAction();
			const item = {
				ProdID: id,
			};
			setSelectedItem(item);
			loadItem({ id });
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

	const confirmDialogClose = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄編輯?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const handleDialogClose = useCallback(() => {
		crud.cancelAction();
	}, [crud]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: url,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`${mode === A01.Mode.NEW_PROD ? "新" : ""}商品「${
							data?.ProdData
						}」新增成功`
					);
					crud.doneCreating();
					crud.cancelReading();
					// 重新整理
					listLoader.loadList({ refresh: true });
				} else {
					if (error.code) {
						switch (error.code) {
							case 410:
								setSelectedTab(A01.Tabs.TRANS);
								break;
							case 420:
								setSelectedTab(A01.Tabs.COMBO);
								break;
							case 409:
								setSelectedTab(A01.Tabs.INFO);
								break;
							default:
							case 422:
								setSelectedTab(A01.Tabs.INFO);
								break;
						}
					}
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				crud.failCreating(err);
				console.error("handleCreate.failed", err);
				toast.error(Errors.getMessage("新增失敗", err));
			}
		},
		[crud, httpPostAsync, listLoader, mode, token, url]
	);

	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				// const oldId = crud.itemData?.ProdID;
				const { status, error } = await httpPutAsync({
					url: url,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`${mode === A01.Mode.NEW_PROD ? "新" : ""}商品「${
							data?.ProdData
						}」修改成功`
					);
					crud.doneUpdating();
					// crud.cancelReading();
					loadItem({ id: data?.ProdID });
					// 重新整理
					listLoader.loadList({
						refresh: true,
					});
				} else {
					throw error || new Error("修改發生未預期例外");
				}
			} catch (err) {
				crud.failUpdating(err);
				console.error("handleUpdate.failed", err);
				toast.error(Errors.getMessage("修改失敗", err));
			}
		},
		[crud, httpPutAsync, url, token, mode, loadItem, listLoader]
	);

	const onCounterSubmit = useCallback(
		async (data) => {
			console.log(`A01.onCounterSubmit()`, data);
			const processed = A01.transformForCounterSubmit(data);
			console.log(`processed`, processed);
			try {
				crud.startUpdating();
				const { status, error } = await httpPatchAsync({
					url: `v1/prods/counter`,
					data: processed,
					bearer: token,
				});
				if (status.success) {
					toast.success(`商品「${data?.ProdData}」櫃位已成功更新`);
					crud.doneUpdating();
					loadItem({ id: processed?.ProdID });
				} else {
					throw error || new Error("櫃位更新失敗");
				}
			} catch (err) {
				crud.failUpdating(err);
				console.error("onCounterSubmit.failed", err);
				toast.error(Errors.getMessage("櫃位更新失敗", err));
			}
		},
		[crud, httpPatchAsync, loadItem, token]
	);

	const onCounterSubmitError = useCallback((err) => {
		console.error(`A01.onCounterSubmitError`, err);
		toast.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
		);
	}, []);

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log(`A01.onEditorSubmit()`, data);
			console.log(`transGrid.gridData`, transGrid.gridData);
			console.log(`comboGrid.gridData`, comboGrid.gridData);
			const processed = A01.transformForEditorSubmit(
				data,
				transGrid.gridData,
				comboGrid.gridData
			);
			console.log(`processed`, processed);
			if (crud.creating) {
				handleCreate({ data: processed });
			} else if (crud.updating) {
				handleUpdate({ data: processed });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[
			comboGrid.gridData,
			crud.creating,
			crud.updating,
			handleCreate,
			handleUpdate,
			transGrid.gridData,
		]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`A01.onSubmitError`, err);
		toast.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
		);
	}, []);

	const resetGridData = useCallback(
		(data) => {
			transGrid.setGridData(data?.trans || [], {
				reset: true,
				commit: true,
			});
			comboGrid.setGridData(data?.combo || [], {
				reset: true,
				commit: true,
			});
		},
		[comboGrid, transGrid]
	);

	const createTransRow = useCallback(
		() => ({
			dept: null,
			SCost: "",
		}),
		[]
	);

	const createComboRow = useCallback(
		() => ({
			prod: null,
			SProdQty: "",
		}),
		[]
	);

	const promptCreating = useCallback(
		(e) => {
			e?.stopPropagation();
			setSelectedTab(A01.Tabs.INFO);
			const data = {
				trans: Array.from({ length: 10 }, createTransRow),
				combo: Array.from({ length: 10 }, createComboRow),
			};
			crud.promptCreating({
				data,
			});
			transGrid.initGridData(data.trans);
			comboGrid.initGridData(data.combo);
		},
		[comboGrid, createComboRow, createTransRow, crud, transGrid]
	);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除商品「${crud.itemData?.ProdData}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url:
							mode === A01.Mode.NEW_PROD
								? `v1/new-prods/${crud.itemData?.ProdID}`
								: `v1/prods/${crud.itemData?.ProdID}`,
						bearer: token,
					});
					crud.cancelAction();
					if (status.success) {
						toast.success(
							`成功删除${
								mode === A01.Mode.NEW_PROD ? "新" : ""
							}商品${crud.itemData.ProdData}`
						);
						listLoader.loadList({
							refresh: true,
						});
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failDeleting(err);
					console.error("confirmDelete.failed", err);
					toast.error(Errors.getMessage("刪除失敗", err));
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, listLoader, mode, token]);

	// PRINT
	const printAction = useAction();
	const printing = useMemo(() => {
		return !!printAction.state;
	}, [printAction.state]);

	const promptPrint = useCallback(() => {
		printAction.prompt();
	}, [printAction]);

	const cancelPrint = useCallback(() => {
		printAction.clear();
	}, [printAction]);

	// REVIEW
	const reviewAction = useAction();
	const reviewing = useMemo(() => {
		return !!reviewAction.state;
	}, [reviewAction.state]);

	const handleReview = useCallback(
		async (value) => {
			console.log(`handleReview`, value);
			try {
				const { status, error } = await httpPatchAsync({
					url: `v1/new-prods/reviewed`,
					data: {
						...crud.itemData,
						OfficialProdID: value,
					},
					bearer: token,
				});
				if (status.success) {
					reviewAction.clear();
					crud.cancelAction();
					listLoader.loadList({
						refresh: true,
					});
					toast.success(
						`商品「${crud.itemData?.ProdData}」已覆核成功`
					);
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("覆核失敗", err));
			}
		},
		[crud, httpPatchAsync, listLoader, reviewAction, token]
	);

	const promptReview = useCallback(() => {
		dialogs.prompt({
			title: "確認覆核",
			label: "正式商品編號",
			placeholder: "請輸入正式商品編號",
			onConfirm: handleReview,
			value: crud.itemData?.ProdID || "",
			confirmText: "通過",
		});
		reviewAction.prompt();
	}, [crud.itemData?.ProdID, dialogs, handleReview, reviewAction]);

	const cancelReview = useCallback(() => {
		reviewAction.cancel();
	}, [reviewAction]);

	const startReview = useCallback(() => {
		reviewAction.start();
	}, [reviewAction]);

	const finishReview = useCallback(() => {
		reviewAction.finish();
	}, [reviewAction]);

	const failReview = useCallback(() => {
		reviewAction.fail();
	}, [reviewAction]);

	// SEARCH
	const onSearchSubmit = useCallback(
		(data) => {
			handlePopperClose();
			console.log(`onSearchSubmit`, data);
			listLoader.loadList({
				params: data,
			});
		},
		[handlePopperClose, listLoader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error(`onSearchSubmitError`, err);
	}, []);

	const handleTabChange = useCallback((e, newValue) => {
		setSelectedTab(newValue);
	}, []);

	// TRANS GRID
	const handleTransGridChange = useCallback(
		(newValue, operations) => {
			const operation = operations[0];
			console.log("operation", operation);
			console.log("newValue", newValue);

			if (operation.type === "UPDATE") {
				const rowIndex = operation.fromRowIndex;
				const rowData = newValue[rowIndex];
				const row = { rowIndex, rowData };
				if (
					rowData.dept &&
					transGrid.isDuplicating(rowData, newValue)
				) {
					transGrid.setValueByRowIndex(
						row.rowIndex,
						{
							dept: null,
						},
						{
							data: newValue,
						}
					);
					toast.error(
						`「${rowData.dept?.DeptName}」已存在, 請選擇其他門市`
					);
					return;
				}
			}
			transGrid.propagateGridChange(newValue, operations);
		},
		[transGrid]
	);

	// COMBO GRID
	const handleComboGridChange = useCallback(
		(newValue, operations) => {
			const operation = operations[0];
			console.log("operation", operation);
			console.log("newValue", newValue);

			if (operation.type === "UPDATE") {
				const rowIndex = operation.fromRowIndex;
				const rowData = newValue[rowIndex];
				const row = { rowIndex, rowData };
				if (
					rowData.prod &&
					comboGrid.isDuplicating(rowData, newValue)
				) {
					comboGrid.setValueByRowIndex(
						row.rowIndex,
						{
							dept: null,
						},
						{
							data: newValue,
						}
					);
					toast.error(
						`「${rowData.prod?.ProdData}」已存在, 請選擇其他商品`
					);
					return;
				}
			}
			comboGrid.propagateGridChange(newValue, operations);
		},
		[comboGrid]
	);

	// const handleTransGridDeptBlur = useCallback(({cell}) => {
	// 	const {col, row} =  cell;
	// 	const rowData = transGrid.getRowDataByIndex(row);
	// 	switch (col) {
	// 		case 1: //門市
	// 			if (transGrid.isKeyDuplicated(rowData)) {
	// 				toast.error(`門市「${rowData.dept?.DeptName}」不可重複選擇`);
	// 				transGrid.setValueByRowIndex(row, newValue, {
	// 					dept: null,
	// 				});
	// 			}
	// 			console.log(`duplicated`);
	// 			break;
	// 		default:
	// 			break;
	// 	}

	// }, []);

	const handleReset = useCallback(
		({ reset }) =>
			() => {
				handlePopperClose();
				listLoader.loadList({
					params: {},
				});
				reset({});
			},
		[handlePopperClose, listLoader]
	);

	const cancelAction = useCallback(() => {
		crud.cancelAction();
		// 清除 query params
		clearParams();
	}, [clearParams, crud]);

	const transTabDisabled = useMemo(() => {
		return crud.editing && mode === A01.Mode.STORE;
	}, [crud.editing, mode]);

	const comboTabDisabled = useMemo(() => {
		return crud.editing && mode === A01.Mode.STORE;
	}, [crud.editing, mode]);

	useInit(() => {
		crud.cancelAction();
	}, []);

	return {
		...listLoader,
		selectById,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,

		onSearchSubmit,
		onSearchSubmitError,
		mode,
		handleSelect,
		selectedItem,
		...crud,
		//override CRUD
		cancelAction: cancelAction,
		handleDialogClose,
		confirmDialogClose,
		confirmQuitCreating,
		onEditorSubmit,
		onEditorSubmitError,
		confirmReturn,
		resetGridData,
		// CRUD OVERRIDES
		promptCreating,
		confirmDelete,
		// REVIEW
		reviewing,
		promptReview,
		cancelReview,
		startReview,
		finishReview,
		failReview,
		// ProdTransGrid
		setTransGridRef: transGrid.setGridRef,
		transGridData: transGrid.gridData,
		handleTransGridChange,
		// ProdComboGrid
		setComboGridRef: comboGrid.setGridRef,
		comboGridData: comboGrid.gridData,
		handleComboGridChange,
		// Store
		onCounterSubmit,
		onCounterSubmitError,
		// module
		...appModule,
		// PRINT
		printing,
		promptPrint,
		cancelPrint,
		// TAB
		selectedTab,
		handleTabChange,
		setSelectedTab,
		handleReset,
		createTransRow,
		createComboRow,
		transTabDisabled,
		comboTabDisabled,
	};
};