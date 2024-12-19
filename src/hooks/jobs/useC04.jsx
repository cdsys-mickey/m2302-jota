import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import C04 from "@/modules/md-c04";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import Forms from "@/shared-modules/sd-forms";
import { isDate } from "date-fns";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppModule } from "./useAppModule";
import { useSideDrawer } from "../useSideDrawer";
import { useToggle } from "@/shared-hooks/useToggle";

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
	// 側邊欄
	const sideDrawer = useSideDrawer();

	// const [selectedInq, setSelectedInq] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();
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
		createRow
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
			fillRows: true
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
				toast.error(Errors.getMessage("新增失敗", err), {
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

					grid.handleGridDataLoaded(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
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

			if (supplier && rstDate && grid.gridData.filter(v => v.prod?.ProdID).length > 0) {
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
							supressEvents: true
						});
						updateAmt({ setValue, data });
						toast.info("商品單價已更新");
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (e) {
					console.error(e);
					toast.error("商品單價更新失敗, 請檢查各欄位是否完整", {
						position: "top-right"
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
					toast.error(Errors.getMessage("刪除失敗", err), {
						position: "top-right"
					});
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, itemData, listLoader, token]);

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
		handlePopperClose();
		console.log(`onSearchSubmit`, data);
		listLoader.loadList({
			params: C04.transformAsQueryParams(data),
		});
	}, [handlePopperClose, listLoader]);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	const getProdInfo = useCallback(
		async (prodId, { supplier, rstDate }) => {
			if (!prodId) {
				// toast.error("請先選擇商品");
				return;
			}

			const supplierId = supplier?.FactID;
			if (!supplierId) {
				toast.error("請先選擇廠商", {
					position: "top-right"
				});
				return;
			}

			if (!isDate(rstDate)) {
				toast.error("請先輸入進貨日期", {
					position: "top-right"
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
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("查詢報價失敗", err), {
					position: "top-right"
				});
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
				toast.error(Errors.getMessage("計算合計失敗", err), {
					position: "top-right"
				});
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
						TaxType: newValue
					},
					gridData: grid.gridData,
					setValue,
				});
			},
		[handleRefreshAmt, grid.gridData]
	);



	const handleGridProdChange = useCallback(async ({ rowData, formData }) => {
		let processedRowData = {
			...rowData
		};
		const prodInfo = rowData.prod?.ProdID ? await getProdInfo(
			rowData.prod?.ProdID,
			{
				supplier: formData.supplier,
				rstDate: formData.GinDate,
			}
		) : null;
		console.log("prodInfo", prodInfo);

		// let finalDate = prodInfo?.MaxDate ? Forms.parseDate(
		// 	prodInfo.MaxDate
		// ) : null,

		processedRowData = {
			...processedRowData,
			["ProdData"]: rowData.prod?.ProdData || "",
			["PackData_N"]:
				rowData.prod?.PackData_N || "",
			["SInqFlag"]: prodInfo?.SInqFlag || "",
			["SPrice"]: prodInfo?.SPrice || "",
			["SExpDate"]: rowData.prod ? (prodInfo?.SExpDate ? Forms.reformatDateAsDash(
				prodInfo.SExpDate
			) : rowData.SExpDate) : "",
			["stype"]: null,
			["SQty"]: "",
			["SAmt"]: "",
			["ordId"]: "",
		};

		return processedRowData;

	}, [getProdInfo]);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
		// 商品
		if (rowData.prod?.ProdID != oldRowData.prod?.ProdID) {
			console.log(
				`prod[${rowIndex}] changed`,
				rowData.prod
			);
			processedRowData = await handleGridProdChange({
				rowData: processedRowData,
				formData
			})
		}

		// 單價, 贈,  數量
		if (
			processedRowData.SPrice !== oldRowData.SPrice ||
			processedRowData.stype?.id !== oldRowData.stype?.id ||
			processedRowData.SQty !== oldRowData.SQty
		) {
			const newSAmt = !processedRowData.SPrice || !processedRowData.SQty
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
	}, [grid.gridData, handleGridProdChange]);

	const onGridChanged = useCallback(({ gridData, formData, setValue, updateResult }) => {
		handleRefreshAmt({
			formData,
			gridData,
			setValue,
		});
	}, [handleRefreshAmt]);

	const buildGridChangeHandlerOld = useCallback(
		({ getValues, setValue, gridMeta }) =>
			async (newValue, operations) => {
				const formData = getValues();
				console.log("buildGridChangeHandlerOld", operations);
				console.log("newValue", newValue);
				const newGridData = [...newValue];
				let checkFailed = false;
				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						const promises = newValue
							.slice(
								operation.fromRowIndex,
								operation.toRowIndex
							)
							.map(async (item, index) => {
								const updatedRow = await onUpdateRow({
									formData,
									fromRowIndex: operation.fromRowIndex,
								})(item, index);
								newGridData[operation.fromRowIndex + index] = updatedRow;
							})
						await Promise.all(promises);
						handleRefreshAmt({
							formData,
							gridData: newGridData,
							setValue,
						});
					} else if (operation.type === "DELETE") {
						// do nothing
						handleRefreshAmt({
							formData,
							gridData: newGridData,
							setValue,
						});
					} else if (operation.type === "CREATE") {
						console.log("dsg.CREATE");
						// process CREATE here
						gridMeta.toFirstColumn({ nextRow: true });
					}
				}
				console.log("grid.changed", newGridData);
				console.log("newGridData", newGridData);
				grid.setGridData(newGridData);
			},
		[handleRefreshAmt, grid, onUpdateRow]
	);

	const handleGridChangeAsync = useCallback(
		({ getValues, setValue, gridMeta }) => (newValue, operations) => {
			const newGridData = [...newValue];

			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					const formData = getValues();
					const updateRowFunc = onUpdateRow({
						formData,
						fromRowIndex: operation.fromRowIndex,
					});

					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach(async (rowData, i) => {
							const rowIndex = operation.fromRowIndex + i;
							const oldRowData = grid.gridData[rowIndex];
							let processedRowData = { ...rowData };

							if (rowData.prod?.ProdID !== oldRowData.prod?.ProdID ||
								rowData.SPrice !== oldRowData.SPrice ||
								rowData.stype?.id !== oldRowData.stype?.id ||
								rowData.SQty !== oldRowData.SQty
							) {
								processedRowData = await updateRowFunc(processedRowData, i);
								newGridData[rowIndex] = processedRowData;
								handleRefreshAmt({
									formData,
									gridData: newGridData,
									setValue,
								});
							}
							grid.setGridData(newGridData);
						});
				} else if (operation.type === "DELETE") {
					grid.setGridData(newGridData);
					const formData = getValues();
					handleRefreshAmt({
						formData,
						gridData: newGridData,
						setValue,
					});
				} else if (operation.type === "CREATE") {
					console.log("dsg.CREATE");
					grid.setGridData(newGridData);
					// process CREATE here
					gridMeta.toFirstColumn({ nextRow: true });
				}
			}
		},
		[handleRefreshAmt, grid, onUpdateRow]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C04.transformForSubmitting(
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
				`${import.meta.env.VITE_URL_REPORT}/WebC04Rep.aspx?LogKey=${operator?.LogKey
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
							supressEvents: true
						});
						updateAmt({ setValue, data });
						// toast.info("採購單商品已載入");
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("載入採購單商品失敗", err), {
						position: "top-right"
					});
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
							toast.info("商品單價已更新");
						} else {
							throw error || new Error("未預期例外");
						}
					} else {
						updateAmt({
							setValue,
							reset: true,
						});
					}
				} catch (err) {
					toast.error(Errors.getMessage("商品單價更新失敗", err), {
						position: "top-right"
					});
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
						// toast.info("採購單商品已載入");
					} else {
						throw error || new Error("發生未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("重整商品失敗", err), {
						position: "top-right"
					});
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
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			toast.error(Errors.getMessage("編輯檢查失敗", err), {
				position: "top-right"
			});
		} finally {
			checkEditableAction.clear();
		}
	}, [checkEditableAction, crud, httpGetAsync, token]);

	const handlePaidAmtChange = useCallback(({ setValue, getValues }) => (newValue) => {
		console.log("handlePaidAmtChange", newValue);
		const formData = getValues();
		console.log("formData", formData);
		handleRefreshAmt({
			formData,
			gridData: grid.gridData,
			setValue,
		});
	}, [grid.gridData, handleRefreshAmt]);

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

		// handleGridChangeAsync,
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
		handleReset
	};
};
