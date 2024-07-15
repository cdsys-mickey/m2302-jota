import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import C02 from "@/modules/md-c02";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/useDSG";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "@/shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { nanoid } from "nanoid";

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
		url: "v1/purchase/requests",
		bearer: token,
		initialFetchSize: 50,
	});

	const prodGrid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
	});

	const [selectedItem, setSelectedItem] = useState();

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

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			RqtDate: new Date(),
			quotes: prodGrid.fillRows({ createRow }),
		};
		crud.promptCreating({ data });
		prodGrid.initGridData(data.quotes);
	}, [createRow, crud, prodGrid]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error, payload } = await httpPostAsync({
					url: "v1/purchase/requests",
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
				toast.error(Errors.getMessage("請購單新增失敗", err));
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
					url: "v1/purchase/requests",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = C02.transformForReading(payload.data[0]);
					setSelectedInq(data);

					prodGrid.initGridData(data.prods);

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
		[crud, httpGetAsync, listLoader, prodGrid, token]
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
					url: "v1/purchase/requests",
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

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除請購單「${itemData?.RqtID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/purchase/requests`,
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
					toast.error(Errors.getMessage("刪除失敗", err));
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

	const rqtQtyDisabled = useCallback(({ rowData }) => {
		return (
			(!!rowData.SOrdID && rowData.SOrdID !== "*") || !!rowData.SOrdQty
		);
	}, []);

	const supplierNameDisabled = useCallback(({ rowData }) => {
		return !!rowData.SOrdID && rowData.SOrdID !== "*";
	}, []);

	const handleGridProdChange = useCallback(({ rowData }) => {
		const { prod } = rowData;
		rowData = {
			...rowData,
			["PackData_N"]: prod?.PackData_N || "",
			["StockQty_N"]: prod?.StockQty || "",
			["SRqtQty"]: "",
		};
		return rowData;
	}, []);

	const handleGridChange = useCallback(
		(newValue, operations) => {
			console.log("handleGridChange", operations);
			console.log("newValue", newValue);
			const newGridData = [...newValue];
			let checkFailed = false;
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const rowIndex = operation.fromRowIndex + i;
							const oldRowData = prodGrid.gridData[rowIndex];

							let processedRowData = { ...rowData };

							// 商品
							if (
								rowData.prod?.ProdID !== oldRowData.prod?.ProdID
							) {
								console.log(
									`prod[${rowIndex}] changed`,
									rowData.prod
								);
								processedRowData = handleGridProdChange({
									rowData: processedRowData,
								});
							}
							newGridData[rowIndex] = processedRowData;
						});
				} else if (operation.type === "DELETE") {
					// 列舉原資料
					checkFailed = prodGrid.gridData
						.slice(operation.fromRowIndex, operation.toRowIndex)
						// .forEach((rowData, i) => {
						// 	const rowIndex = operation.fromRowIndex + i;
						// 	// const { prod, SOrdID } = rowData;
						// 	// if (SOrdID !== "*") {
						// 	if (prodDisabled({ rowData })) {
						// 		toast.error(
						// 			`第 ${rowIndex + 1} 筆已形成採購單不可刪除`
						// 		);
						// 		const rowIndex = operation.fromRowIndex + i;
						// 		newGridData[rowIndex] = {
						// 			...rowData,
						// 		};
						// 	}
						// });
						.some((rowData, i) => {
							if (prodDisabled({ rowData })) {
								const rowIndex = operation.fromRowIndex + i;
								toast.error(
									`不可刪除第 ${rowIndex + 1} 筆商品`
								);
								return true;
							}
							return false;
						});
				}
			}
			console.log("after changed", newGridData);
			if (!checkFailed) {
				prodGrid.setGridData(newGridData);
			}
		},
		[handleGridProdChange, prodDisabled, prodGrid]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C02.transformForSubmitting(
				data,
				prodGrid.gridData
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
			prodGrid.gridData,
		]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
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
		async (value) => {
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
					url: `v1/purchase/requests/reviewed`,
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
				reviewAction.fail(err);
				toast.error(Errors.getMessage("覆核失敗", err));
			}
		},
		[crud, httpPatchAsync, listLoader, reviewAction, token]
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
	const rejecting = useMemo(() => {
		return !!rejectAction.state;
	}, [rejectAction.state]);

	const handleReject = useCallback(
		async (value) => {
			console.log(`handleReject`, value);
			try {
				rejectAction.start();
				const { status, error } = await httpPatchAsync({
					url: `v1/purchase/requests/reviewed`,
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
				toast.error(Errors.getMessage("解除覆核失敗", err));
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
			working: rejecting,
		});
	}, [crud.itemData?.RqtID, dialogs, handleReject, rejecting]);

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
				`${import.meta.env.VITE_URL_REPORT}/WebC02Rep.aspx?LogKey=${
					operator?.LogKey
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
		...prodGrid,
		handleGridChange,
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
		rejecting,
		handleReject,
		promptReject,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		// 推播
		selectedItem,
		selectById,
	};
};
