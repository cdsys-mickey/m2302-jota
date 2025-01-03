import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import C02 from "@/modules/md-c02";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import Forms from "@/shared-modules/sd-forms";
import { isValid } from "date-fns";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "./useAppModule";

export const useC02 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "C02",
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

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
		url: "v1/purchase/req-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SOrdQty: null,
			SFactID: "",
			SFactNa: "",
			SOrdID: "*",
		}),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
		createRow
	});

	/**
	 * 由於 columns 需要所以往前提
	 */
	const rqtQtyDisabled = useCallback(({ rowData }) => {
		return (
			(!!rowData.SOrdID && rowData.SOrdID !== "*") || !!rowData.SOrdQty
		);
	}, []);



	const [selectedItem, setSelectedItem] = useState();


	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			RqtDate: new Date(),
			quotes: [],
		};
		crud.promptCreating({ data });
		grid.initGridData(data.quotes, {
			fillRows: true
		});
	}, [crud, grid]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error, payload } = await httpPostAsync({
					url: "v1/purchase/req-orders",
					data: data,
					bearer: token,
				});
				if (status.success) {
					toast.success(`請購單 ${payload.data[0].RqtID} 新增成功`);
					crud.doneCreating();
					crud.cancelReading();
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failCreating();
				console.error("handleCreate.failed", err);
				toast.error(Errors.getMessage("請購單新增失敗", err), {
					position: "top-right"
				});
			}
		},
		[crud, httpPostAsync, listLoader, token]
	);

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
					url: "v1/purchase/req-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = C02.transformForReading(payload.data[0]);
					setSelectedInq(data);

					grid.initGridData(data.prods);

					crud.doneReading({
						data: data,
					});
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, grid, token]
	);

	const selectById = useCallback(
		async (id) => {
			crud.cancelAction();
			const item = {
				RqtID: id,
			};
			setSelectedItem(item);
			loadItem({
				id,
			});
		},
		[crud, loadItem]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			setSelectedItem(rowData);

			loadItem({ id: rowData.請購單號 });
		},
		[crud, loadItem]
	);

	const confirmQuitCreating = useCallback(() => {
		dialogs.confirm({
			message: "確定要放棄新增?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmQuitUpdating = useCallback(() => {
		dialogs.confirm({
			message: "確定要放棄修改?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmReturnReading = useCallback(() => {
		dialogs.confirm({
			message: "確定要取消編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

	// UPDATE
	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				const { status, error } = await httpPutAsync({
					url: "v1/purchase/req-orders",
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
				toast.error(Errors.getMessage("修改失敗", err), {
					position: "top-right"
				});
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除請購單「${itemData?.RqtID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/purchase/req-orders`,
						bearer: token,
						params: {
							id: itemData?.RqtID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除請購單 ${itemData?.RqtID}`);
						listLoader.loadList({ refresh: true });
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failDeleting(err);
					console.error("confirmDelete.failed", err);
					toast.error(Errors.getMessage("刪除失敗", err), {
						position: "top-right"
					});
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, itemData, listLoader, token]);

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	const prodDisabled = useCallback(({ rowData }) => {
		return (
			(!!rowData.SOrdID && rowData.SOrdID !== "*") || !!rowData.SOrdQty
		);
	}, []);



	const supplierNameDisabled = useCallback(({ rowData }) => {
		return !!rowData.SOrdID && rowData.SOrdID !== "*";
	}, []);

	const getProdInfo = useCallback(
		async (prodId) => {
			if (!prodId) {
				toast.error("請先選擇商品", {
					position: "top-right"
				});
				return;
			}
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/inv/stock",
					bearer: token,
					params: {
						id: prodId,
						cv: "i",
					},
				});

				if (status.success) {
					return payload;
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("查詢庫存失敗", err), {
					position: "top-right"
				});
			}
		}
		, [httpGetAsync, token]);

	const handleGridProdChange = useCallback(async ({ rowData }) => {
		const prodInfo = rowData?.prod ? await getProdInfo(
			rowData?.prod?.ProdID,
		) : null;

		const { prod } = rowData;
		return {
			...rowData,
			["ProdData"]: prod?.ProdData || "",
			["PackData_N"]: prod?.PackData_N || "",
			["StockQty_N"]: prodInfo?.StockQty || "",
			["SRqtQty"]: "",
		};
	}, [getProdInfo]);

	const isRowDeletable = useCallback(({ rowData }) => {
		return !prodDisabled({ rowData });
	}, [prodDisabled]);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
		// 商品
		if (processedRowData.prod?.ProdID !== oldRowData.prod?.ProdID) {
			processedRowData = await handleGridProdChange({
				rowData: processedRowData,
				formData
			});
			// console.log("handleGridProdChange done", processedRowData);
		}
		return processedRowData;
	}, [grid.gridData, handleGridProdChange]);

	// const buildGridChangeHandler = useCallback(
	// 	({ gridMeta }) => (newValue, operations) => {
	// 		console.log("buildGridChangeHandler", operations);
	// 		console.log("newValue", newValue);
	// 		const newGridData = [...newValue];
	// 		let checkFailed = false;
	// 		for (const operation of operations) {
	// 			if (operation.type === "UPDATE") {
	// 				newValue
	// 					.slice(operation.fromRowIndex, operation.toRowIndex)
	// 					.forEach((rowData, i) => {
	// 						const rowIndex = operation.fromRowIndex + i;
	// 						const oldRowData = grid.gridData[rowIndex];

	// 						let processedRowData = { ...rowData };

	// 						// 商品
	// 						if (
	// 							rowData.prod?.ProdID !== oldRowData.prod?.ProdID
	// 						) {
	// 							console.log(
	// 								`prod[${rowIndex}] changed`,
	// 								rowData.prod
	// 							);
	// 							processedRowData = handleGridProdChange({
	// 								rowData: processedRowData,
	// 							});
	// 						}
	// 						newGridData[rowIndex] = processedRowData;
	// 					});
	// 			} else if (operation.type === "DELETE") {
	// 				checkFailed = grid.gridData
	// 					.slice(operation.fromRowIndex, operation.toRowIndex)
	// 					.some((rowData, i) => {
	// 						if (prodDisabled({ rowData })) {
	// 							const rowIndex = operation.fromRowIndex + i;
	// 							toast.error(`不可刪除第 ${rowIndex + 1} 筆商品`, {
	// 								position: "top-right"
	// 							});
	// 							return true;
	// 						}
	// 						return false;
	// 					});
	// 			} else if (operation.type === "CREATE") {
	// 				console.log("dsg.CREATE");
	// 				// process CREATE here
	// 				gridMeta.toFirstColumn({ nextRow: true });
	// 			}
	// 		}
	// 		console.log("after changed", newGridData);
	// 		if (!checkFailed) {
	// 			grid.setGridData(newGridData);
	// 		}
	// 	},
	// 	[grid, handleGridProdChange, prodDisabled]
	// );

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C02.transformForSubmitting(
				data,
				grid.gridData
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
			grid.gridData,
		]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
		Forms.onSubmitError(err);
	}, []);

	// REVIEW
	const getCurrentIndex = useCallback(() => {
		return listLoader.getIndexById({
			id: crud.itemData?.RqtID,
			key: "請購單號",
		});
	}, [crud.itemData?.RqtID, listLoader]);

	const reviewAction = useAction();
	const reviewing = useMemo(() => {
		return !!reviewAction.state;
	}, [reviewAction.state]);

	const handleReview = useCallback(
		async ({ value }) => {
			console.log(`handleReview`, value);
			const nextId = listLoader.findNextId({
				id: crud.itemData?.RqtID,
				key: "請購單號",
				reverse: true,
			});
			console.log("nextId", nextId);
			try {
				reviewAction.start();
				const { status, error } = await httpPatchAsync({
					url: `v1/purchase/req-orders/reviewed`,
					data: {
						RqtID: crud.itemData.RqtID,
						Checker: 2,
					},
					bearer: token,
				});
				if (status.success) {
					reviewAction.clear();
					crud.cancelAction();
					if (nextId) {
						selectById(nextId);
					}

					listLoader.loadList({
						refresh: true,
					});
					toast.success(`請購單${crud.itemData?.RqtID}」已覆核成功`);
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				reviewAction.fail({ error: err });
				toast.error(Errors.getMessage("覆核失敗", err), {
					position: "top-right"
				});
			}
		},
		[crud, httpPatchAsync, listLoader, reviewAction, selectById, token]
	);

	const promptReview = useCallback(() => {
		dialogs.confirm({
			title: "確認覆核",
			message: `確定要通過請購單「${crud.itemData?.RqtID}」?`,
			onConfirm: handleReview,
			confirmText: "通過",
			working: reviewing,
		});
	}, [crud.itemData?.RqtID, dialogs, handleReview, reviewing]);

	const cancelReview = useCallback(() => {
		reviewAction.cancel();
	}, [reviewAction]);

	// REJECT
	const rejectAction = useAction();
	// const rejecting = useMemo(() => {
	// 	return !!rejectAction.state;
	// }, [rejectAction.state]);

	const handleReject = useCallback(
		async (value) => {
			console.log(`handleReject`, value);
			try {
				rejectAction.start();
				const { status, error } = await httpPatchAsync({
					url: `v1/purchase/req-orders/reviewed`,
					data: {
						RqtID: crud.itemData.RqtID,
						Checker: 1,
					},
					bearer: token,
				});
				if (status.success) {
					rejectAction.clear();
					crud.cancelAction();
					listLoader.loadList({
						refresh: true,
					});
					toast.success(
						`請購單${crud.itemData?.RqtID}」已解除覆核成功`
					);
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				rejectAction.fail({ error: err });
				toast.error(Errors.getMessage("解除覆核失敗", err), {
					position: "top-right"
				});
			}
		},
		[crud, httpPatchAsync, listLoader, rejectAction, token]
	);

	const promptReject = useCallback(() => {
		dialogs.confirm({
			title: "確認解除覆核",
			message: `確定要解除覆核請購單「${crud.itemData?.RqtID}」?`,
			onConfirm: handleReject,
			confirmText: "解除",
			working: rejectAction.working,
		});
	}, [crud.itemData?.RqtID, dialogs, handleReject, rejectAction.working]);

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const jsonData = {
				...(data.outputType && {
					Action: data.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "C02",
				IDs: crud.itemData?.RqtID,
			};
			console.log("[C02]jsonData", jsonData);
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebC02Rep.aspx?LogKey=${operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.RqtID,
			operator?.CurDeptID,
			operator?.LogKey,
			postToBlank,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	// const validateDate = useCallback((value) => {
	// 	if (value != null && !isValid(value)) {
	// 		return "日期格式錯誤";
	// 	}
	// 	return true;
	// }, []);

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
		confirmDelete,
		promptCreating,
		onEditorSubmit,
		onEditorSubmitError,
		// Grid
		createRow,
		...grid,
		grid,
		// buildGridChangeHandler,
		getRowKey,
		prodDisabled,
		rqtQtyDisabled,
		supplierNameDisabled,
		// 覆核
		reviewing,
		handleReview,
		promptReview,
		cancelReview,
		getCurrentIndex,
		// 解除覆核
		handleReject,
		promptReject,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		// 推播
		selectedItem,
		selectById,
		...sideDrawer,
		isRowDeletable,
		onUpdateRow,
		// validateDate
	};
};
