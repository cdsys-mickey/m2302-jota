import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth/AuthContext";
import CrudContext from "../../contexts/crud/CrudContext";
import C04 from "@/modules/md-C04";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { useDSG } from "../../shared-hooks/useDSG";
import { useInfiniteLoader } from "../../shared-hooks/useInfiniteLoader";
import { useWebApi } from "../../shared-hooks/useWebApi";
import Errors from "../../shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "../../shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "../../shared-hooks/useHttpPost";
import { isDate } from "date-fns";
import Forms from "../../shared-modules/sd-forms";

export const useC04 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "C04",
	});

	// const [selectedInq, setSelectedInq] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/purchase/restocks",
		bearer: token,
		initialFetchSize: 50,
	});

	const [expState, setExpState] = useState({
		expProd: null,
		expDate: null,
		expPrompting: false,
	});

	const prodGrid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
	});

	const refreshAmt = useCallback(({ setValue, data, reset = false }) => {
		if (reset) {
			setValue("InAmt", "");
			setValue("TaxAmt", "");
			setValue("TotAmt", "");
			setValue("PaidAmt", "");
			setValue("PayAmt", "");
		} else {
			setValue("InAmt", data.InAmt);
			setValue("TaxAmt", data.TaxAmt);
			setValue("TotAmt", data.TotAmt);
			setValue("PaidAmt", data.PaidAmt);
			setValue("PayAmt", data.PayAmt);
		}
	}, []);

	// const refreshSAmt = useCallback(
	// 	({ processedRowData, SPrice, SQty, stype }) => {
	// 		return {
	// 			...processedRowData,
	// 			["SAmt"]: !SPrice || !SQty ? "" : stype?.id ? 0 : SPrice * SQty,
	// 		};
	// 	},
	// 	[]
	// );

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			prods: [],
			purchaseOrders: [],
			GinDate: new Date(),
			taxExcluded: false,
		};
		crud.promptCreating({ data });
		prodGrid.handleGridDataLoaded(data.prods);
	}, [crud, prodGrid]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/purchase/restocks",
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
					url: "v1/purchase/restocks",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = C04.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					// setSelectedInq(data);

					prodGrid.handleGridDataLoaded(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, prodGrid, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			// setSelectedItem(rowData);

			loadItem({ id: rowData.進貨單號 });
		},
		[crud, loadItem]
	);

	const isSupplierNameDisabled = useCallback((supplier) => {
		return supplier?.FactID !== "*";
	}, []);

	const refreshGrid = useCallback(
		async ({ formData, setValue }) => {
			const rstDate = formData.GinDate;
			const supplier = formData.supplier;

			if (supplier && rstDate && prodGrid.gridData.length > 0) {
				const collected = C04.transformForSubmitting(
					formData,
					prodGrid.gridData
				);
				console.log("collected", collected);
				const { status, payload, error } = await httpPostAsync({
					url: "v1/purchase/restocks/refresh-grid",
					bearer: token,
					data: collected,
				});
				console.log("refresh-grid.payload", payload);
				if (status.success) {
					const data = C04.transformForReading(payload.data[0]);
					console.log("refresh-grid.data", data);
					prodGrid.handleGridDataLoaded(data.prods);
					refreshAmt({ setValue, data });
					toast.info("商品單價已更新");
				} else {
					throw error || new Error("未預期例外");
				}
			} else {
				//clear
				console.warn("clear values?");
			}
		},
		[httpPatchAsync, prodGrid, refreshAmt, token]
	);

	const refreshAction = useAction();

	const handleRefresh = useCallback(
		({ setValue, getValues }) =>
			async () => {
				try {
					refreshAction.start();
					refreshGrid({ formData: getValues(), setValue });
				} finally {
					refreshAction.clear();
				}
			},
		[refreshAction, refreshGrid]
	);

	const handleSupplierChanged = useCallback(
		({ setValue, getValues }) =>
			(newValue) => {
				console.log("handleSupplierChanged", newValue);
				setValue("FactData", newValue?.FactData || "");
				setValue("Uniform", newValue?.Uniform || "");
				setValue("TaxType", newValue?.TaxType === "Y" ? "Y" : "");
				setValue("FactAddr", newValue?.CompAddr || "");

				refreshGrid({ formData: getValues(), setValue });

				//refresh-grid
			},
		[refreshGrid]
	);

	const handleRstDateChanged = useCallback(
		({ setValue, getValues }) =>
			(newValue) => {
				console.log("rstDate changed", newValue);
				refreshGrid({ formData: getValues(), setValue });
			},
		[refreshGrid]
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
					url: "v1/purchase/restocks",
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
			message: `確認要删除進貨單「${itemData?.GinID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/purchase/restocks`,
						bearer: token,
						params: {
							id: itemData?.GinID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除進貨單 ${itemData?.GinID}`);
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

	const getProdInfo = useCallback(
		async (prodId, { supplier, rstDate }) => {
			if (!prodId) {
				toast.error("請先選擇商品");
				return;
			}

			const supplierId = supplier?.FactID;
			if (!supplierId) {
				toast.error("請先選擇廠商");
				return;
			}

			if (!isDate(rstDate)) {
				toast.error("請先輸入進貨日期");
				return;
			}

			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/restocks/prod-info",
					bearer: token,
					params: {
						pd: prodId,
						spi: supplierId,
						od: Forms.formatDate(rstDate),
					},
				});

				if (status.success) {
					return payload;
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("查詢報價失敗", err));
			}
		},
		[httpGetAsync, token]
	);

	const purchaseOrdersDisabled = useMemo(() => {
		return !!crud.itemData?.GinID;
	}, [crud.itemData?.GinID]);

	const prodDisabled = useCallback(({ rowData }) => {
		return !!rowData.ordId;
	}, []);

	const spriceDisabled = useCallback(({ rowData }) => {
		return !!rowData.SInqFlag || !!rowData.stype;
	}, []);

	const fetchAmt = useCallback(
		async ({ paid, taxType, gridData, setValue }) => {
			const total = C04.getTotal(gridData);
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/restocks/refresh-amt",
					bearer: token,
					data: {
						tt: taxType,
						ap: paid,
						at: total,
					},
				});
				if (status.success) {
					console.log("refresh-amt", payload);
					setValue("PayAmt", payload.PayAmt);
					setValue("TaxAmt", payload.TaxAmt);
					setValue("TotAmt", payload.TotAmt);
					setValue("InAmt", total.toFixed(2));
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("計算合計失敗", err));
			}
		},
		[httpGetAsync, token]
	);

	const handleTaxTypeChanged = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				console.log("onTaxTypeChanged", newValue);
				const paid = getValues("PaidAmt");
				// console.log("formData", formData);
				fetchAmt({
					paid: paid,
					taxType: newValue,
					gridData: prodGrid.gridData,
					setValue,
				});
			},
		[fetchAmt, prodGrid.gridData]
	);

	const handleGridChange = useCallback(
		({ getValues, setValue }) =>
			(newValue, operations) => {
				const formData = getValues();
				console.log("handleGridChange", operations);
				console.log("newValue", newValue);
				const newGridData = [...newValue];
				let checkFailed = false;
				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						newValue
							.slice(operation.fromRowIndex, operation.toRowIndex)
							.forEach(async (rowData, i) => {
								const { prod, SPrice, SQty, stype } = rowData;
								const rowIndex = operation.fromRowIndex + i;
								const {
									prod: oldProd,
									SPrice: oldSPrice,
									oldSQty,
									oldStype,
								} = prodGrid.gridData[rowIndex];

								let processedRowData = { ...rowData };
								// 商品
								if (prod?.ProdID !== oldProd?.ProdID) {
									console.log(
										`prod[${rowIndex}] changed`,
										prod
									);
									let prodRetrieved = false;
									if (prod?.ProdID) {
										const prodInfo = await getProdInfo(
											prod?.ProdID,
											{
												supplier: formData.supplier,
												rstDate: formData.GinDate,
											}
										);
										// 取得報價
										if (prodInfo) {
											processedRowData = {
												...processedRowData,
												["PackData_N"]:
													prod?.PackData_N || "",
												["SInqFlag"]: prodInfo.SInqFlag,
												["SPrice"]: prodInfo.SPrice,
												["SExpDate"]: Forms.parseDate(
													prodInfo.MaxDate
												),
											};
											prodRetrieved = true;
										}
									}
									if (!prodRetrieved) {
										processedRowData = {
											...processedRowData,
											prod: null,
											["PackData_N"]: "",
											["SInqFlag"]: "",
											["SPrice"]: "",
											["SExpDate"]: "",
										};
									}
								}

								// 單價, 贈,  數量
								if (
									SPrice !== oldSPrice ||
									stype?.id !== oldStype?.id ||
									SQty !== oldSQty
								) {
									// 計算合計
									processedRowData = {
										...processedRowData,
										["SAmt"]:
											!SPrice || !SQty
												? ""
												: stype?.id
												? 0
												: SPrice * SQty,
									};
								}
								newGridData[rowIndex] = processedRowData;
							});
					} else if (operation.type === "DELETE") {
						// 列舉原資料
						// checkFailed = prodGrid.gridData
						// 	.slice(operation.fromRowIndex, operation.toRowIndex)
						// 	.some((rowData, i) => {
						// 		if (prodDisabled({ rowData })) {
						// 			const rowIndex = operation.fromRowIndex + i;
						// 			toast.error(
						// 				`不可刪除第 ${rowIndex + 1} 筆商品`
						// 			);
						// 			return true;
						// 		}
						// 		return false;
						// 	});
					}
				}
				console.log("prodGrid.changed", newGridData);
				if (!checkFailed) {
					// 檢查要不要改 purchaseOrders
					/*
					const newOrdIds = newGridData
						.map((item) => item.ordId)
						.filter((item) => item);
					console.log("newOrdIds", newOrdIds);
					const newPurchaseOrders = formData.purchaseOrders.filter(
						(item) => newOrdIds.includes(item.採購單號)
					);
					console.log("newPurchaseOrders", newPurchaseOrders);
					setValue("purchaseOrders", newPurchaseOrders);
					*/

					prodGrid.setGridData(newGridData);
					fetchAmt({
						paid: formData.PaidAmt,
						taxType: formData.TaxType,
						gridData: newGridData,
						setValue,
					});
				}
			},
		[fetchAmt, getProdInfo, prodGrid]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C04.transformForSubmitting(
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

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const jsonData = {
				...(data.outputType && {
					Action: data.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "C04",
				IDs: crud.itemData?.GinID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebC04Rep.aspx?LogKey=${
					operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.GinID,
			operator?.CurDeptID,
			operator?.LogKey,
			postToBlank,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	// 有效日期查詢
	const onExpDialogOpen = useCallback(() => {
		setExpState((prev) => ({
			...prev,
			expPrompting: true,
		}));
	}, []);

	const onExpDialogClose = useCallback(() => {
		setExpState((prev) => ({
			...prev,
			expPrompting: false,
		}));
	}, []);

	const onExpSubmit = useCallback((data) => {
		console.log("onExpSubmit", data);
		setExpState((prev) => ({
			...prev,
			expProd: data.expProd,
			expDate: data.expDate,
			expPrompting: false,
		}));
	}, []);

	const onExpSubmitError = useCallback((err) => {
		console.error("onExpSubmitError", err);
	}, []);

	const cancelExpChecking = useCallback(() => {
		setExpState({
			expProd: null,
			expDate: null,
			expPrompting: false,
		});
	}, []);

	const expChecking = useMemo(() => {
		return expState.expProd !== null;
	}, [expState.expProd]);

	const handlePurchaseOrdersChanged = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				console.log("handlePurchaseOrdersChanged", newValue);
				const formData = getValues();
				const collected = C04.transformForSubmitting(
					formData,
					prodGrid.gridData
				);
				console.log("collected", collected);
				try {
					const { status, payload, error } = await httpPostAsync({
						url: "v1/purchase/restocks/load-prods",
						bearer: token,
						data: collected,
					});
					console.log("load-prods.payload", payload);
					if (status.success) {
						const data = C04.transformForReading(payload.data[0]);
						console.log("refreshed data", data);
						prodGrid.handleGridDataLoaded(data.prods);
						refreshAmt({ setValue, data });
						// toast.info("採購單商品已載入");
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("載入採購單商品失敗", err));
				}
			},
		[httpPostAsync, prodGrid, refreshAmt, token]
	);

	const onRefreshGridSubmit2 = useCallback((data) => {
		console.log("onRefreshGridSubmit2", data);
	}, []);

	const onRefreshGridSubmit = useCallback(
		({ setValue }) =>
			async (data) => {
				console.log("onRefreshGridSubmit", data);
				try {
					if (prodGrid.gridData.length > 0) {
						const collected = C04.transformForSubmitting(
							data,
							prodGrid.gridData
						);
						console.log("collected", collected);

						const { status, payload, error } = await httpPostAsync({
							url: "v1/purchase/restocks/refresh-grid",
							bearer: token,
							data: collected,
						});
						console.log("refresh-grid.payload", payload);
						if (status.success) {
							const data = C04.transformForReading(
								payload.data[0]
							);
							console.log("refreshed data", data);
							prodGrid.handleGridDataLoaded(data.prods);
							refreshAmt({ setValue, data });
							toast.info("商品單價已更新");
						} else {
							throw error || new Error("未預期例外");
						}
					} else {
						refreshAmt({
							setValue,
							reset: true,
						});
					}
				} catch (err) {
					toast.error(Errors.getMessage("商品單價更新失敗", err));
					// 還原
				}
			},
		[httpPatchAsync, prodGrid, refreshAmt, token]
	);

	const onRefreshGridSubmitError = useCallback((err) => {
		console.error("onRefreshGridSubmitError", err);
	}, []);

	const onLoadProdsSubmit = useCallback(
		({ setValue }) =>
			async (data) => {
				console.log("onLoadProdsSubmit", data);
				try {
					const collected = C04.transformForSubmitting(
						data,
						prodGrid.gridData
					);
					console.log("collected", collected);

					const { status, payload, error } = await httpPostAsync({
						url: "v1/purchase/restocks/load-prods",
						bearer: token,
						data: collected,
					});
					console.log("refresh-grid.payload", payload);
					if (status.success) {
						const data = C04.transformForReading(payload.data[0]);
						console.log("load-prods.data", data);
						prodGrid.handleGridDataLoaded(data.prods);
						refreshAmt({ setValue, data });
						// toast.info("採購單商品已載入");
					} else {
						throw error || new Error("發生未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("重整商品失敗", err));
					// 還原
				}
			},
		[httpPatchAsync, prodGrid, refreshAmt, token]
	);

	const onLoadProdsSubmitError = useCallback((err) => {
		console.error("onLoadProdsSubmitError", err);
	}, []);

	const checkEditableAction = useAction();

	const handleCheckEditable = useCallback(async () => {
		try {
			checkEditableAction.start();
			const { status, error } = await httpGetAsync({
				url: "v1/purchase/restocks/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.GinID,
				},
			});
			if (status.success) {
				crud.promptUpdating();
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			toast.error(Errors.getMessage("編輯檢查失敗", err));
		} finally {
			checkEditableAction.clear();
		}
	}, [checkEditableAction, crud, httpGetAsync, token]);

	const getSPriceClassName = useCallback(({ rowData }) => {
		return rowData.stype?.id ? "line-through" : null;
	}, []);

	return {
		...crud,
		...listLoader,
		...appModule,
		// selectedInq,
		loadItem,
		handleSelect,
		handleSupplierChanged,
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
		purchaseOrdersDisabled,
		spriceDisabled,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		// 有效日期查詢
		...expState,
		expChecking,
		onExpDialogOpen,
		onExpDialogClose,
		cancelExpChecking,
		onExpSubmit,
		onExpSubmitError,
		isSupplierNameDisabled,
		onRefreshGridSubmit2,
		onRefreshGridSubmit,
		onRefreshGridSubmitError,
		handleTaxTypeChanged,
		onLoadProdsSubmit,
		onLoadProdsSubmitError,
		handleRstDateChanged,
		handlePurchaseOrdersChanged,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		getSPriceClassName,
		handleRefresh,
		refreshWorking: refreshAction.working,
	};
};
