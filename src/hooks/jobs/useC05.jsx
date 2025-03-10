import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toast-ex";
import C05 from "@/modules/md-c05";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Forms from "@/shared-modules/sd-forms";
import { isDate } from "date-fns";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef } from "react";
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "./useAppModule";

export const useC05 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const appModule = useAppModule({
		token,
		moduleId: "C05",
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/purchase/returns",
		bearer: token,
		initialFetchSize: 50,
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SQty: "",
			SPrice: "",
			SRemark: "",
			ChkQty: "",
			SOrdID: "",
		}),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
		createRow
	});

	const updateAmt = useCallback(({ setValue, data, reset = false }) => {
		if (reset) {
			setValue("InAmt", "");
			setValue("TaxAmt", "");
			setValue("TotAmt", "");
			setValue("RecvAmt", "");
			setValue("RtAmt", "");
			setValue("RtnAmt", "");
		} else {
			setValue("InAmt", data.InAmt);
			setValue("TaxAmt", data.TaxAmt);
			setValue("TotAmt", data.TotAmt);
			setValue("RecvAmt", data.RecvAmt);
			setValue("RtAmt", data.RtAmt);
			setValue("RtnAmt", data.RtnAmt);
		}
	}, []);


	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			prods: [],
			GrtDate: new Date(),
			RecvAmt: "",
			TaxType: "",
			employee: null,
			supplier: null,
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
					url: "v1/purchase/returns",
					data: data,
					bearer: token,
				});
				if (status.success) {
					toastEx.success(`新增成功`);
					crud.doneCreating();
					crud.cancelReading();
					listLoader.loadList({ refresh: true });
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failCreating();
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
					url: "v1/purchase/returns",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = C05.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					// setSelectedInq(data);

					grid.handleGridDataLoaded(data.prods);
				} else {
					throw error ?? new Error("未預期例外");
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

			loadItem({ id: rowData.退貨單號 });
		},
		[crud, loadItem]
	);

	const isSupplierNameDisabled = useCallback((supplier) => {
		return supplier?.FactID !== "*";
	}, []);

	const refreshGrid = useCallback(
		async ({ formData, setValue }) => {
			const rtnDate = formData.GrtDate;
			const supplier = formData.supplier;

			if (
				supplier &&
				rtnDate &&
				grid.gridData.filter((x) => x.prod).length > 0
			) {
				const collected = C05.transformForSubmitting(
					formData,
					grid.gridData
				);
				console.log("collected", collected);
				try {
					const { status, payload, error } = await httpPostAsync({
						url: "v1/purchase/returns/refresh-grid",
						bearer: token,
						data: collected,
					});
					console.log("refresh-grid.payload", payload);
					if (status.success) {
						const data = C05.transformForReading(payload.data[0]);
						console.log("refresh-grid.data", data);
						grid.initGridData(data.prods, {
							fillRows: crud.creating,
							supressEvents: true
						});
						updateAmt({ setValue, data });
						toastEx.info("商品單價已更新");
					} else {
						throw error ?? new Error("未預期例外");
					}
				} catch (err) {
					toastEx.error("更新商品單價失敗", err);
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
				console.log("handleRefresh");
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

	// 直接於值變動時呼叫太頻繁
	const handleRtnDateChanged = useCallback(
		({ setValue, getValues }) =>
			(newValue) => {
				console.log("rtnDate changed", newValue);
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
					url: "v1/purchase/returns",
					data: data,
					bearer: token,
				});
				if (status.success) {
					toastEx.success(`修改成功`);
					crud.doneUpdating();
					//crud.cancelReading();
					loadItem({ refresh: true });
					listLoader.loadList({ refresh: true });
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failUpdating();
				console.error("handleCreate.failed", err);
				toastEx.error("修改失敗", err);
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除退貨單「${itemData?.GrtID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/purchase/returns`,
						bearer: token,
						params: {
							id: itemData?.GrtID,
						},
					});
					if (status.success) {
						// 關閉對話框
						crud.cancelAction();
						toastEx.success(`成功删除退貨單 ${itemData?.GrtID}`);
						listLoader.loadList({ refresh: true });
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failDeleting(err);
					console.error("confirmDelete.failed", err);
					toastEx.error("刪除失敗", err);
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, itemData, listLoader, token]);

	const handleReset = useCallback(
		({ reset }) =>
			() => {
				// handlePopperClose();
				// listLoader.loadList({
				// 	params: {},
				// });
				reset({
					supplier: null,
					spn: "",
					spa: "",
					spu: "",
					inv: "",
					taxType: null,
					rd: null,
					rd2: null,
					employee: null
				});
			},
		[]
	);

	const onSearchSubmit = useCallback(
		(data) => {
			console.log("onSearchSubmit", data);
			handlePopperClose();
			listLoader.loadList({
				params: C05.transformAsQueryParams(data),
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
		async (prodId, { supplier, rtnDate }) => {
			if (!prodId) {
				toastEx.error("請先選擇商品", {
					position: "top-right"
				});
				return;
			}

			const supplierId = supplier?.FactID;
			if (!supplierId) {
				toastEx.error("請先選擇廠商", {
					position: "top-right"
				});
				return;
			}

			if (!isDate(rtnDate)) {
				toastEx.error("請先輸入退貨日期", {
					position: "top-right"
				});
				return;
			}

			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/returns/prod-info",
					bearer: token,
					params: {
						spi: supplierId,
						pd: prodId,
						rd: Forms.formatDate(rtnDate),
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

	const spriceDisabled = useCallback(({ rowData }) => {
		return !!rowData.SInqFlag;
	}, []);

	const handleRefreshAmt = useCallback(
		async ({ formData, gridData, setValue }) => {
			const total = C05.getTotal(gridData);
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/returns/refresh-amt",
					bearer: token,
					data: {
						tt: formData?.TaxType,
						arv: formData?.RecvAmt,
						art: total,
					},
				});
				if (status.success) {
					console.log("refresh-amt", payload);
					setValue("RtnAmt", payload.RtnAmt);
					setValue("TaxAmt", payload.TaxAmt);
					setValue("TotAmt", payload.TotAmt);
					setValue("RtAmt", total.toFixed(2));
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
				// const received = getValues("RecvAmt");
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

	const onUpdateRow = useCallback(({ formData, fromRowIndex, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
		// prod
		if (rowData.prod?.ProdID != oldRowData.prod?.ProdID) {
			console.log(
				`prod[rowIndex] changed`,
				rowData?.prod
			);

			const prodInfo = rowData.prod?.ProdID ? await getProdInfo(
				rowData.prod.ProdID,
				{
					supplier: formData.supplier,
					rtnDate: formData.GrtDate,
				}
			) : null;
			console.log("prodInfo", prodInfo);
			// 取得報價

			processedRowData = {
				...processedRowData,
				["ProdData"]: rowData.prod?.ProdData || "",
				["PackData_N"]:
					rowData.prod?.PackData_N || "",
				["SInqFlag"]: prodInfo?.SInqFlag || "",
				["SPrice"]: prodInfo?.SPrice || "",
			};
		}

		// 單價, 贈,  數量
		if (rowData.SPrice !== oldRowData.SPrice || rowData.SQty !== oldRowData.SQty) {
			// 計算合計
			processedRowData = {
				...processedRowData,
				["SAmt"]:
					!rowData.SPrice || !rowData.SQty
						? ""
						: rowData.SPrice * rowData.SQty,
			};
			updateResult.rows++;
		}


		return processedRowData;
	}, [getProdInfo, grid.gridData]);

	const onGridChanged = useCallback(({ gridData, formData, setValue, updateResult, prevGridData }) => {
		if (updateResult.rows > 0) {
			handleRefreshAmt({
				formData,
				gridData,
				setValue,
			});
		}
	}, [handleRefreshAmt]);

	// const buildGridChangeHandlerOld = useCallback(
	// 	({ getValues, setValue, gridMeta }) =>
	// 		async (newValue, operations) => {
	// 			const formData = getValues();
	// 			console.log("buildGridChangeHandler", operations);
	// 			console.log("newValue", newValue);
	// 			const newGridData = [...newValue];
	// 			let checkFailed = false;
	// 			for (const operation of operations) {
	// 				if (operation.type === "UPDATE") {
	// 					const updatedRows = await Promise.all(
	// 						newValue
	// 							.slice(
	// 								operation.fromRowIndex,
	// 								operation.toRowIndex
	// 							)
	// 							.map(async (item, index) => {
	// 								const updatedRow = await onUpdateRow({
	// 									formData,
	// 									fromRowIndex: operation.fromRowIndex,
	// 								})(item, index);
	// 								return updatedRow;
	// 							})
	// 					)
	// 					console.log("updatedRows", updatedRows);

	// 					newGridData.splice(
	// 						operation.fromRowIndex,
	// 						updatedRows.length,
	// 						...updatedRows
	// 					)

	// 					// newValue
	// 					// 	.slice(operation.fromRowIndex, operation.toRowIndex)
	// 					// 	.forEach(async (rowData, i) => {
	// 					// 		const { prod, SPrice, SQty } = rowData;
	// 					// 		const rowIndex = operation.fromRowIndex + i;
	// 					// 		const {
	// 					// 			prod: oldProd,
	// 					// 			SPrice: oldSPrice,
	// 					// 			oldSQty,
	// 					// 		} = grid.gridData[rowIndex];

	// 					// 		let processedRowData = { ...rowData };
	// 					// 		// 商品
	// 					// 		if (prod?.ProdID !== oldProd?.ProdID) {
	// 					// 			console.log(
	// 					// 				`prod[${rowIndex}] changed`,
	// 					// 				prod
	// 					// 			);
	// 					// 			let prodInfoRetrieved = false;
	// 					// 			if (prod?.ProdID) {
	// 					// 				const prodInfo = await getProdInfo(
	// 					// 					prod?.ProdID,
	// 					// 					{
	// 					// 						supplier: formData.supplier,
	// 					// 						rtnDate: formData.GrtDate,
	// 					// 					}
	// 					// 				);
	// 					// 				// 取得報價
	// 					// 				prodInfoRetrieved =
	// 					// 					prodInfo && prodInfo.SPrice !== "";
	// 					// 				processedRowData = {
	// 					// 					...processedRowData,
	// 					// 					["PackData_N"]:
	// 					// 						prod?.PackData_N || "",
	// 					// 					...(prodInfoRetrieved && prodInfo),
	// 					// 				};
	// 					// 			}
	// 					// 			if (!prodInfoRetrieved) {
	// 					// 				processedRowData = {
	// 					// 					...processedRowData,
	// 					// 					["SInqFlag"]: "",
	// 					// 					["SPrice"]: "",
	// 					// 				};
	// 					// 			}
	// 					// 		}

	// 					// 		// 單價, 贈,  數量
	// 					// 		if (SPrice !== oldSPrice || SQty !== oldSQty) {
	// 					// 			// 計算合計
	// 					// 			processedRowData = {
	// 					// 				...processedRowData,
	// 					// 				["SAmt"]:
	// 					// 					!SPrice || !SQty
	// 					// 						? ""
	// 					// 						: SPrice * SQty,
	// 					// 			};
	// 					// 		}
	// 					// 		newGridData[rowIndex] = processedRowData;
	// 					// 	});
	// 				} else if (operation.type === "DELETE") {
	// 					// 列舉原資料
	// 					// checkFailed = grid.gridData
	// 					// 	.slice(operation.fromRowIndex, operation.toRowIndex)
	// 					// 	.some((rowData, i) => {
	// 					// 		if (prodDisabled({ rowData })) {
	// 					// 			const rowIndex = operation.fromRowIndex + i;
	// 					// 			toastEx.error(
	// 					// 				`不可刪除第 ${rowIndex + 1} 筆商品`
	// 					// 			);
	// 					// 			return true;
	// 					// 		}
	// 					// 		return false;
	// 					// 	});
	// 				} else if (operation.type === "CREATE") {
	// 					console.log("dsg.CREATE");
	// 					// process CREATE here
	// 					gridMeta.toFirstColumn({ nextRow: true });
	// 				}
	// 			}
	// 			console.log("grid.changed", newGridData);
	// 			if (!checkFailed) {
	// 				grid.setGridData(newGridData);
	// 				handleRefreshAmt({
	// 					formData,
	// 					gridData: newGridData,
	// 					setValue,
	// 				});
	// 			}
	// 		},
	// 	[handleRefreshAmt, grid, onUpdateRow]
	// );

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C05.transformForSubmitting(
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

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebC05Rep.aspx`
	}, [config.REPORT_URL])
	const reports = useJotaReports();

	const onPrintSubmit = useCallback(
		(payload) => {
			console.log("onPrintSubmit", payload);
			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "C05",
				IDs: crud.itemData?.GrtID,
			};
			// postToBlank(
			// 	`${config.REPORT_URL}/WebC05Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.GrtID, operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback(({ setValue }) => (outputType) => {
		console.log("handlePrint", outputType);
		setValue("outputType", outputType);
	}, []);

	const onRefreshGridSubmit = useCallback(
		({ setValue }) =>
			async (data) => {
				console.log("onRefreshGridSubmit", data);
				try {
					if (grid.gridData.length > 0) {
						const collected = C05.transformForSubmitting(
							data,
							grid.gridData
						);
						console.log("collected", collected);

						const { status, payload, error } = await httpPostAsync({
							url: "v1/purchase/returns/refresh-grid",
							bearer: token,
							data: collected,
						});
						console.log("refresh-grid.payload", payload);
						if (status.success) {
							const data = C05.transformForReading(
								payload.data[0]
							);
							console.log("refreshed data", data);
							grid.initGridData(data.prods, {
								fillRows: crud.creating,
								supressEvents: true
							});
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
		[grid, httpPostAsync, token, crud.creating, updateAmt]
	);

	const onRefreshGridSubmitError = useCallback((err) => {
		console.error("onRefreshGridSubmitError", err);
	}, []);

	const checkEditableAction = useAction();

	const handleCheckEditable = useCallback(async () => {
		try {
			checkEditableAction.start();
			const { status, error } = await httpGetAsync({
				url: "v1/purchase/returns/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.GrtID,
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

	const handleRecvAmtChange = useCallback(({ setValue, getValues }) => (newValue) => {
		console.log("handleRecvAmtChange", newValue);
		const formData = getValues();
		console.log("formData", formData);
		handleRefreshAmt({
			formData,
			gridData: grid.gridData,
			setValue,
		});
	}, [grid.gridData, handleRefreshAmt]);

	return {
		...crud,
		...listLoader,
		...appModule,
		// selectedInq,
		loadItem,
		handleSelect,
		handleSupplierChanged,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		handleReset,
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
		spriceDisabled,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		isSupplierNameDisabled,
		onRefreshGridSubmit,
		onRefreshGridSubmitError,
		handleTaxTypeChange,
		// handleRtnDateChanged,
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		handleRefresh,
		refreshWorking: refreshAction.working,
		...sideDrawer,
		onUpdateRow,
		onGridChanged,
		handleRecvAmtChange,
		refreshGrid,
		handleRtnDateChanged,
		handlePrint
	};
};
