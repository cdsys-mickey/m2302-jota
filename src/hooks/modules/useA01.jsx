/* eslint-disable no-mixed-spaces-and-tabs */
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import CrudContext from "../../contexts/crud/CrudContext";
import A01 from "../../modules/md-a01";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { useAction } from "../../shared-hooks/useAction";
import { useDSG } from "../../shared-hooks/useDSG";
import { useToggle } from "../../shared-hooks/useToggle";
import Errors from "../../shared-modules/sd-errors";

/**
 * 適用三種情境
 * 1. 商品維護 A01
 * 2. 新商品維護(審核) - A010
 * 3. 門市櫃位維護 - A011
 */
export const useA01 = ({ token, mode }) => {
	const crud = useContext(CrudContext);
	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpPatchAsync,
		httpDeleteAsync,
	} = useWebApi();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);
	// const form = useFormContext();
	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const loader = useInfiniteLoader({
		url: mode === A01.Mode.NEW_PROD ? "v1/new-prods" : "v1/prods",
		bearer: token,
		initialFetchSize: 50,
		// columns: "pi,bc,pn",
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
			message: "確認要放棄編輯?",
			onConfirm: () => {
				crud.updateCancel();
			},
		});
	}, [crud, dialogs]);

	const loadProd = useCallback(
		async (prodId) => {
			try {
				const encodedProdId = encodeURIComponent(prodId);
				const { status, payload, error } = await httpGetAsync({
					url:
						mode === A01.Mode.NEW_PROD
							? `v1/new-prods/${encodedProdId}`
							: `v1/prods/${encodedProdId}`,
					bearer: token,
				});
				console.log("payload", payload);
				if (status.success) {
					const data = A01.processForRead(payload);

					transGrid.handleGridDataLoaded(data.trans);
					comboGrid.handleGridDataLoaded(data.combo);

					crud.readDone(data);
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				crud.readFail(err);
			}
		},
		[comboGrid, crud, httpGetAsync, mode, token, transGrid]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			setSelectedItem(rowData);

			crud.readStart(rowData, "讀取中...");
			loadProd(rowData.ProdID);
		},
		[crud, loadProd]
	);

	const dialogOpen = useMemo(() => {
		return crud.reading || crud.creating || crud.updating;
	}, [crud.creating, crud.reading, crud.updating]);

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
				crud.createStart();
				const { status, error } = await httpPostAsync({
					url:
						mode === A01.Mode.NEW_PROD
							? "v1/new-prods"
							: "v1/prods",
					data: data,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`${mode === A01.Mode.NEW_PROD ? "新" : ""}商品「${
							data?.ProdData
						}」新增成功`
					);
					crud.createDone();
					crud.readCancel();
					// 重新整理
					loader.loadList();
				} else {
					throw error || new Error("新增發生未預期例外");
				}
			} catch (err) {
				crud.createFail(err);
				console.error("handleCreate.failed", err);
				toast.error(Errors.getMessage("新增失敗", err));
			}
		},
		[crud, httpPostAsync, loader, mode, token]
	);

	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.updateStart();
				// const oldId = crud.itemData?.ProdID;
				const { status, error } = await httpPutAsync({
					url:
						mode === A01.Mode.NEW_PROD
							? `v1/new-prods`
							: `v1/prods`,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toast.success(
						`${mode === A01.Mode.NEW_PROD ? "新" : ""}商品「${
							data?.ProdData
						}」修改成功`
					);
					crud.updateDone();
					// crud.readCancel();
					loadProd(data?.ProdID);
					// 重新整理
					loader.loadList();
				} else {
					throw error || new Error("修改發生未預期例外");
				}
			} catch (err) {
				crud.updateFail(err);
				console.error("handleUpdate.failed", err);
				toast.error(Errors.getMessage("修改失敗", err));
			}
		},
		[crud, httpPutAsync, loadProd, loader, mode, token]
	);

	const onCounterSubmit = useCallback(
		async (data) => {
			console.log(`A01.onCounterSubmit()`, data);
			const processed = A01.processForCounterSubmit(data);
			console.log(`processed`, processed);
			try {
				crud.updateStart();
				const { status, error } = await httpPatchAsync({
					url: `v1/prods/counter`,
					data: processed,
					bearer: token,
				});
				if (status.success) {
					toast.success(`商品「${data?.ProdData}」已成功更新櫃位`);
					crud.updateDone();
					loadProd(processed?.ProdID);
				} else {
					throw error || new Error("櫃位更新失敗");
				}
			} catch (err) {
				crud.updateFail(err);
				console.error("onCounterSubmit.failed", err);
				toast.error(Errors.getMessage("更新櫃位失敗", err));
			}
		},
		[crud, httpPatchAsync, loadProd, token]
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
			const processed = A01.processForEditorSubmit(
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
			transGrid.setGridData(data?.trans || []);
			comboGrid.setGridData(data?.combo || []);
		},
		[comboGrid, transGrid]
	);

	const createPrompt = useCallback(
		(e) => {
			e?.stopPropagation();
			const data = {
				trans: [],
				combo: [],
			};
			crud.readDone(data);
			crud.createPrompt(data);
			transGrid.handleGridDataLoaded(data.trans);
			comboGrid.handleGridDataLoaded(data.combo);
		},
		[comboGrid, crud, transGrid]
	);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除商品「${crud.itemData?.ProdData}」?`,
			onConfirm: async () => {
				try {
					crud.deleteStart(crud.itemData);
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
						loader.loadList();
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.deleteFail(err);
					console.error("confirmDelete.failed", err);
					toast.error(Errors.getMessage("刪除失敗", err));
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, loader, mode, token]);

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
					loader.loadList();
					toast.success(
						`商品「${crud.itemData?.ProdData}」已審核成功`
					);
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("審核失敗", err));
			}
		},
		[crud, httpPatchAsync, loader, reviewAction, token]
	);

	const reviewPrompt = useCallback(() => {
		dialogs.prompt({
			title: "確認審核",
			message: "請輸入正式商品編號",
			onConfirm: handleReview,
			value: crud.itemData?.ProdID || "",
			confirmText: "通過",
		});
		reviewAction.prompt();
	}, [crud.itemData?.ProdID, dialogs, handleReview, reviewAction]);

	// const reviewPrompt = useCallback(() => {
	// 	reviewAction.prompt(crud.itemData, "確定要審核商品?");
	// }, [crud.itemData, reviewAction]);

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

	const onSearchSubmit = useCallback(
		(data) => {
			handlePopperClose();
			console.log(`onSearchSubmit`, data);
			// const q = data?.q;
			loader.loadList({
				params: data,
				// reset: true,
			});
		},
		[handlePopperClose, loader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error(`onSearchSubmitError`, err);
	}, []);

	return {
		...loader,
		// Popper
		popperOpen: popperOpen,
		handlePopperToggle: handlePopperToggle,
		handlePopperOpen: handlePopperOpen,
		handlePopperClose: handlePopperClose,
		onSearchSubmit,
		onSearchSubmitError,
		mode,
		handleSelect,
		selectedItem,
		...crud,
		handleDialogClose,
		confirmDialogClose,
		dialogOpen,
		onEditorSubmit,
		onEditorSubmitError,
		confirmReturn,
		resetGridData,
		// CRUD OVERRIDES
		createPrompt,
		confirmDelete,
		// REVIEW
		reviewing,
		reviewPrompt,
		cancelReview,
		startReview,
		finishReview,
		failReview,
		// ProdTransGrid
		setTransGridRef: transGrid.setGridRef,
		transGridData: transGrid.gridData,
		handleTransGridChange: transGrid.propagateGridChange,
		// ProdComboGrid
		setComboGridRef: comboGrid.setGridRef,
		comboGridData: comboGrid.gridData,
		handleComboGridChange: comboGrid.propagateGridChange,
		// Store
		onCounterSubmit,
		onCounterSubmitError,
	};
};
