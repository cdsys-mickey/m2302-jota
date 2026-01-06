import { AuthContext } from "@/contexts/auth/AuthContext";
import { ConfigContext } from "shared-components/config";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "shared-components/toast-ex";
import C04 from "@/modules/md-c04";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import useAction from "@/shared-modules/ActionState/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApiAsync } from "@/shared-hooks";
import Forms from "@/shared-modules/Forms.mjs";
import { isDate } from "date-fns";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useC04 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const appModule = useAppModule({
		token,
		moduleId: "C04",
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();

	// const [selectedInq, setSelectedInq] = useState();

	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApiAsync();
	const dialogs = useContext(DialogsContext);

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

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

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			stype: null,
			SQty: "",
			SPrice: "",
			ChkQty: "",
			SOrdID: "",
			// 雖然型態是字串，但日期初始值一定要是 null, 否則會有第一個輸入字元被吃掉的問題
			SExpDate: null,
		}),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
		createRow,
	});

	const getSPriceClassName = useCallback(({ rowData }) => {
		return rowData.stype?.id ? "line-through" : null;
	}, []);

	// const purchaseOrdersDisabled = useMemo(() => {
	// 	return !!crud.itemData?.GinID;
	// }, [crud.itemData?.GinID]);

	const prodDisabled = useCallback(({ rowData }) => {
		return !!rowData.ordId;
	}, []);

	const spriceDisabled = useCallback(({ rowData }) => {
		return !!rowData.SInqFlag || !!rowData.stype;
	}, []);

	const updateAmt = useCallback(({ setValue, data, reset = false }) => {
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
		grid.initGridData(data.prods, {
			fillRows: true,
		});
	}, [crud, grid]);

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
					toastEx.success(`新增成功`);
					crud.finishedCreating();
					crud.cancelReading();
					listLoader.loadList({ refresh: true });
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedCreating();
				console.error("handleCreate.failed", err);
				toastEx.error("新增失敗", err);
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
					crud.finishedReading({
						data: data,
					});
					// setSelectedInq(data);

					grid.handleGridDataLoaded(data.prods);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedReading(err);
			}
		},
		[crud, httpGetAsync, grid, token]
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

	const supplierDisabled = useMemo(() => {
		return crud.itemData?.purchaseOrders?.length > 0 && crud.updating;
	}, [crud.itemData?.purchaseOrders?.length, crud.updating]);

	const isSupplierNameDisabled = useCallback((supplier) => {
		return supplier?.FactID !== "*";
	}, []);

	const refreshGrid = useCallback(
		async ({ formData, setValue }) => {
			const rstDate = formData.GinDate;
			const supplier = formData.supplier;

			if (
				supplier &&
				rstDate &&
				grid.gridData.filter((v) => v.prod?.ProdID).length > 0
			) {
				const collected = C04.transformForSubmitting(
					formData,
					grid.gridData
				);
				console.log("collected", collected);
				try {
					const { status, payload, error } = await httpPostAsync({
						url: "v1/purchase/restocks/refresh-grid",
						bearer: token,
						data: collected,
					});
					console.log("refresh-grid.payload", payload);
					if (status.success) {
						const data = C04.transformForReading(payload.data[0]);
						console.log("refresh-grid.data", data);
						grid.initGridData(data.prods, {
							fillRows: crud.creating,
							supressEvents: true,
						});
						updateAmt({ setValue, data });
						toastEx.info("商品單價已更新");
					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (e) {
					console.error(e);
					toastEx.error("商品單價更新失敗, 請檢查各欄位是否完整", {
						position: "top-right",
					});
				}
			} else {
				//clear
				console.warn("clear values?");
			}
		},
		[grid, httpPostAsync, token, crud.creating, updateAmt]
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
				if (grid.gridData.filter((v) => v.prod?.ProdID).length > 0) {
					const formData = getValues();
					refreshGrid({ formData, setValue });
				}

				//refresh-grid
			},
		[grid.gridData, refreshGrid]
	);

	const handleStkDateChanged = useCallback(
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
					toastEx.success(`修改成功`);
					crud.finishedUpdating();
					//crud.cancelReading();
					loadItem({ refresh: true });
					listLoader.loadList({ refresh: true });
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedUpdating();
				console.error("handleCreate.failed", err);
				toastEx.error("修改失敗", err);
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
					if (status.success) {
						// 關閉對話框
						crud.cancelAction();
						toastEx.success(`成功删除進貨單 ${itemData?.GinID}`);
						listLoader.loadList({ refresh: true });
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failedDeleting(err);
					console.error("confirmDelete.failed", err);
					toastEx.error("刪除失敗", err);
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, itemData, listLoader, token]);

	const onSearchSubmit = useCallback(
		(data) => {
			console.log("onSearchSubmit", data);
			handlePopperClose();
			console.log(`onSearchSubmit`, data);
			listLoader.loadList({
				params: C04.transformAsQueryParams(data),
			});
		},
		[handlePopperClose, listLoader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	const getProdInfo = useCallback(
		async (prodId, { supplier, rstDate }) => {
			if (!prodId) {
				// toastEx.error("請先選擇商品");
				return;
			}

			const supplierId = supplier?.FactID;
			if (!supplierId) {
				toastEx.error("請先選擇廠商", {
					position: "top-right",
				});
				return;
			}

			if (!isDate(rstDate)) {
				toastEx.error("請先輸入進貨日期", {
					position: "top-right",
				});
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
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				toastEx.error("查詢報價失敗", err);
			}
		},
		[httpGetAsync, token]
	);

	const handleRefreshAmt = useCallback(
		async ({ formData, gridData, setValue }) => {
			const total = C04.getTotal(gridData);
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/restocks/refresh-amt",
					bearer: token,
					data: {
						tt: formData?.TaxType,
						ap: formData?.PaidAmt,
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
				toastEx.error("計算合計失敗", err);
			}
		},
		[httpGetAsync, token]
	);

	const handleTaxTypeChange = useCallback(
		({ setValue, getValues }) =>
			async (newValue) => {
				console.log("onTaxTypeChanged", newValue);
				const formData = getValues();
				// console.log("formData", formData);
				handleRefreshAmt({
					formData: {
						...formData,
						TaxType: newValue,
					},
					gridData: grid.gridData,
					setValue,
				});
			},
		[handleRefreshAmt, grid.gridData]
	);

	const handleGridProdChange = useCallback(
		async ({ rowData, formData }) => {
			let processedRowData = {
				...rowData,
			};
			const prodInfo = rowData.prod?.ProdID
				? await getProdInfo(rowData.prod?.ProdID, {
						supplier: formData.supplier,
						rstDate: formData.GinDate,
				  })
				: null;
			console.log("prodInfo", prodInfo);

			// let finalDate = prodInfo?.MaxDate ? Forms.parseDate(
			// 	prodInfo.MaxDate
			// ) : null,

			processedRowData = {
				...processedRowData,
				["ProdData"]: rowData.prod?.ProdData || "",
				["PackData_N"]: rowData.prod?.PackData_N || "",
				["SInqFlag"]: prodInfo?.SInqFlag || "",
				["SPrice"]: prodInfo?.SPrice || "",
				["SExpDate"]: rowData.prod
					? prodInfo?.SExpDate || rowData.SExpDate
					: "",
				["stype"]: null,
				["SQty"]: "",
				["SAmt"]: "",
				["ordId"]: "",
			};

			return processedRowData;
		},
		[getProdInfo]
	);

	const onUpdateRow = useCallback(
		({
				fromRowIndex,
				formData,
				newValue,
				setValue,
				gridMeta,
				updateResult,
			}) =>
			async (rowData, index) => {
				const rowIndex = fromRowIndex + index;
				const oldRowData = grid.gridData[rowIndex];
				console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);
				let processedRowData = {
					...rowData,
				};
				// 商品
				if (rowData.prod?.ProdID != oldRowData.prod?.ProdID) {
					console.log(`prod[${rowIndex}] changed`, rowData.prod);
					processedRowData = await handleGridProdChange({
						rowData: processedRowData,
						formData,
					});
				}

				// 單價, 贈,  數量
				if (
					processedRowData.SPrice !== oldRowData.SPrice ||
					processedRowData.stype?.id !== oldRowData.stype?.id ||
					processedRowData.SQty !== oldRowData.SQty
				) {
					const newSAmt =
						!processedRowData.SPrice || !processedRowData.SQty
							? ""
							: processedRowData.stype?.id
							? 0
							: processedRowData.SPrice * processedRowData.SQty;
					// 計算合計
					processedRowData = {
						...processedRowData,
						["SAmt"]: newSAmt,
					};
					updateResult.rows++;
				}

				// 數量改變同步未進量
				// if (processedRowData.SQty !== oldRowData.SQty) {
				// 	processedRowData = {
				// 		...processedRowData,
				// 		["SNotQty"]: processedRowData.SQty,
				// 	};
				// }
				return processedRowData;
			},
		[grid.gridData, handleGridProdChange]
	);

	const onGridChanged = useCallback(
		({ gridData, formData, setValue, updateResult }) => {
			handleRefreshAmt({
				formData,
				gridData,
				setValue,
			});
		},
		[handleRefreshAmt]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C04.transformForSubmitting(data, grid.gridData);
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
		toastEx.error("資料驗證失敗, 請檢查並修正標註錯誤的欄位後，再重新送出");
	}, []);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebC04Rep.aspx`;
	}, [config.REPORT_URL]);
	const reports = useJotaReports();

	const onPrintSubmit = useCallback(
		(payload) => {
			console.log("onPrintSubmit", payload);
			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "C04",
				IDs: crud.itemData?.GinID,
			};
			// postToBlank(
			// 	`${config.REPORT_URL}/WebC04Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.GinID, operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback(
		({ setValue }) =>
			(outputType) => {
				console.log("handlePrint", outputType);
				setValue("outputType", outputType);
			},
		[]
	);

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
					grid.gridData
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
						grid.setGridData(data.prods, {
							fillRows: crud.creating,
							supressEvents: true,
						});
						updateAmt({ setValue, data });
						// toastEx.info("採購單商品已載入");
					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (err) {
					toastEx.error("載入採購單商品失敗", err);
				}
			},
		[grid, httpPostAsync, token, crud.creating, updateAmt]
	);

	const onRefreshGridSubmit2 = useCallback((data) => {
		console.log("onRefreshGridSubmit2", data);
	}, []);

	const onRefreshGridSubmit = useCallback(
		({ setValue }) =>
			async (data) => {
				console.log("onRefreshGridSubmit", data);
				try {
					if (grid.gridData.length > 0) {
						const collected = C04.transformForSubmitting(
							data,
							grid.gridData
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
							grid.handleGridDataLoaded(data.prods);
							updateAmt({ setValue, data });
							toastEx.info("商品單價已更新");
						} else {
							throw error ?? new Error("未預期例外");
						}
					} else {
						updateAmt({
							setValue,
							reset: true,
						});
					}
				} catch (err) {
					toastEx.error("商品單價更新失敗", err);
					// 還原
				}
			},
		[httpPostAsync, grid, updateAmt, token]
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
						grid.gridData
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
						grid.handleGridDataLoaded(data.prods, {
							fillRows: true,
							supressEvents: true,
						});
						updateAmt({ setValue, data });
						// toastEx.info("採購單商品已載入");
					} else {
						throw error || new Error("發生未預期例外");
					}
				} catch (err) {
					toastEx.error("重整商品失敗", err);
					// 還原
				}
			},
		[grid, httpPostAsync, token, updateAmt]
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
				throw error ?? new Error("未預期例外");
			}
		} catch (err) {
			toastEx.error("編輯檢查失敗", err);
		} finally {
			checkEditableAction.clear();
		}
	}, [checkEditableAction, crud, httpGetAsync, token]);

	const handlePaidAmtChange = useCallback(
		({ setValue, getValues }) =>
			(newValue) => {
				console.log("handlePaidAmtChange", newValue);
				const formData = getValues();
				console.log("formData", formData);
				handleRefreshAmt({
					formData,
					gridData: grid.gridData,
					setValue,
				});
			},
		[grid.gridData, handleRefreshAmt]
	);

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
		createRow,
		...grid,
		// ...gridMeta,
		grid,
		// gridMeta,

		getRowKey,
		prodDisabled,
		// purchaseOrdersDisabled,
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
		handleTaxTypeChange,
		onLoadProdsSubmit,
		onLoadProdsSubmitError,
		handleStkDateChanged,
		handlePurchaseOrdersChanged,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		getSPriceClassName,
		handleRefresh,
		refreshWorking: refreshAction.working,
		...sideDrawer,
		handlePaidAmtChange,
		onUpdateRow,
		onGridChanged,
		refreshGrid,
		supplierDisabled,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		handleReset,
		handlePrint,
	};
};
