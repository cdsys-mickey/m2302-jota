import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import C03 from "@/modules/md-c03";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { addDays, getYear, isDate, isValid } from "date-fns";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import Forms from "../../shared-modules/sd-forms";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "./useAppModule";

// const DEFAULT_ROWS = 5;

export const useC03 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "C03",
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

	const listLoader = useInfiniteLoader({
		url: "v1/purchase/orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SOrdQty: null,
			SQty: "",
			SPrice: "",
			SAmt: "",
			SInqFlag: "",
			SFactID: "",
			SFactNa: "",
			SOrdID: "*",
			SInQty: "",
			SNotQty: "",
		}),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "Pkey",
		createRow
	});

	// 有進貨連結
	const prodDisabled = useCallback(({ rowData }) => {
		// return !!itemData?.GinID_N || Number(rowData.SInQty) > 0;
		return !!itemData?.GinID_N;
	}, [itemData?.GinID_N]);

	// 有進貨連結 或 有詢價記錄
	const spriceDisabled = useCallback(({ rowData }) => {
		return !!itemData?.GinID_N || rowData.SInqFlag === "*";
	}, [itemData?.GinID_N]);

	// 有進貨單連結
	const sqtyDisabled = useCallback(
		({ rowData }) => {
			return (
				!!itemData?.GinID_N
				// Number(rowData.SInQty) > 0
				// (!!itemData?.GinID_N &&
				// 	rowData.SQty !== rowData.SNotQty &&
				// 	rowData.SNotQty) > 0
			);
		},
		[itemData?.GinID_N]
	);

	// 沒有進貨連結
	const sNotQtyDisabled = useCallback(({ rowData }) => {
		return (
			!itemData?.GinID_N
			// !(Number(rowData.SInQty) > 0 ||
			// 	!!itemData?.GinID_N)
			// (rowData?.SNotQty && Number(rowData?.SNotQty) <= 0)
		);
	}, [itemData?.GinID_N]);

	const supplierPickerDisabled = useMemo(() => {
		return !!itemData?.GinID_N || !!itemData?.RqtID_N;
	}, [itemData?.GinID_N, itemData?.RqtID_N]);

	// const supplierNameDisabled = useMemo(() => {
	// 	return supplierPickerDisabled || itemData?.supplier?.FactID !== "*";
	// }, [itemData?.supplier?.FactID, supplierPickerDisabled]);

	const isSupplierNameDisabled = useCallback(
		(supplier) => {
			return supplierPickerDisabled || supplier?.FactID !== "*";
		},
		[supplierPickerDisabled]
	);

	const squaredFlagDisabled = useMemo(() => {
		return itemData?.CFlag === "*";
	}, [itemData?.CFlag]);



	const [selectedItem, setSelectedItem] = useState();

	/**
	 * 變更前備份
	 */
	const prevDataRef = useRef();
	const getPrevData = useCallback(() => {
		return prevDataRef.current;
	}, []);

	const setPrevData = useCallback(
		(updatingValues) => {
			prevDataRef.current = {
				...prevDataRef.current,
				...updatingValues,
			};
			console.log("prevData", getPrevData());
		},
		[getPrevData]
	);



	// CREATE
	const promptCreating = useCallback(() => {
		const today = new Date();
		const data = {
			OrdDate: today,
			ArrDate: addDays(today, 7),
			squared: C03.getSquaredOptionById(C03.SquaredState.NONE),
			prods: [],
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
					url: "v1/purchase/orders",
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
					url: "v1/purchase/orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = C03.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					setPrevData({
						supplier: data?.supplier,
						ordDate: data?.OrdDate,
					});

					// setSelectedInq(data);

					grid.initGridData(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, grid, setPrevData, token]
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
			// setSelectedItem(rowData);

			loadItem({ id: rowData.採購單號 });
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
					url: "v1/purchase/orders",
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
			message: `確認要删除採購單「${itemData?.OrdID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/purchase/orders`,
						bearer: token,
						params: {
							id: itemData?.OrdID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除採購單 ${itemData?.OrdID}`);
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



	const supplierChangedHandler = useCallback(
		({ setValue, handleSubmit, getValues }) =>
			(newValue) => {
				console.log("supplier changed", newValue);
				setValue("FactData", newValue?.FactData || "");

				const ordDate = getValues("OrdDate");
				console.log("OrdDate", ordDate);
				if (
					newValue &&
					newValue.FactID !== "*" &&
					grid.gridData.filter((v) => v.prod).length > 0 &&
					isValid(ordDate) &&
					getYear(ordDate) > 1911
				) {
					// 重新計算報價
					handleSubmit();
				} else {
					// 清空「詢價註記」及「單價」
					grid.initGridData(
						grid.gridData.map((x) => ({
							...x,
							["SInqFlag"]: "",
							["SPrice"]: null,
						}))
					);
				}
			},
		[grid]
	);

	const buildOrdDateChangeHandler = useCallback(
		({ handleSubmit, getValues, setValue }) =>
			(newValue) => {
				const supplier = getValues("supplier");
				console.log("ordDate changed", newValue);
				if (newValue && isValid(newValue)) {
					setValue("ArrDate", addDays(newValue, 7));
				} else {
					setValue("ArrDate", null);
				}
				// 重新計算報價
				if (
					supplier &&
					supplier.FactID !== "*" &&
					grid.gridData.length > 0 &&
					isValid(newValue) &&
					getYear(newValue) > 1911
				) {
					handleSubmit();
				} else {
					// 清空「詢價註記」及「單價」
					grid.initGridData(
						grid.gridData.map((x) => ({
							...x,
							["SInqFlag"]: "",
							["SPrice"]: null,
						}))
					);
				}
			},
		[grid]
	);

	const getProdInfo = useCallback(
		async (prodId, { formData }) => {
			if (!prodId) {
				toast.error("請先選擇商品", {
					position: "top-right"
				});
				return;
			}

			const supplierId = formData.supplier?.FactID;
			if (!supplierId) {
				toast.error("請先選擇廠商", {
					position: "top-right"
				});
				return;
			}

			const ordDate = formData?.OrdDate;
			if (!isDate(ordDate)) {
				toast.error("請先輸入採購日期", {
					position: "top-right"
				});
				return;
			}

			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/orders/prod-info",
					bearer: token,
					params: {
						pd: prodId,
						spl: supplierId,
						od: Forms.formatDate(ordDate),
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

	const handleGridProdChange = useCallback(async ({ rowData, formData }) => {
		const prodInfo = rowData?.prod ? await getProdInfo(
			rowData?.prod?.ProdID,
			{ formData }
		) : null;

		return {
			...rowData,
			["ProdData"]: rowData.prod?.ProdData || "",
			["PackData_N"]:
				rowData?.prod?.PackData_N || "",
			["SInqFlag"]: prodInfo?.SInqFlag || "",
			["SPrice"]: prodInfo?.SPrice || "",
			["SQty"]: "",
			["SNotQty"]: "",
			["SAmt"]: "",
		};
	}, [getProdInfo]);

	const isRowDeletable = useCallback(({ key, rowData }) => {
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

		// 單價、數量改變, 同步金額
		if (processedRowData.SQty !== oldRowData.SQty || processedRowData.SPrice !== oldRowData.SPrice) {
			const newSubtotal =
				!processedRowData.SPrice || !processedRowData.SQty ? "" : processedRowData.SPrice * rowData.SQty;
			processedRowData = {
				...processedRowData,
				["SAmt"]: newSubtotal,
			};
			console.log("SAmt→", newSubtotal);
			updateResult.rows++;
		}

		// 數量改變同步未進量
		if (processedRowData.SQty !== oldRowData.SQty) {
			processedRowData = {
				...processedRowData,
				["SNotQty"]: processedRowData.SQty,
			};
		}

		// 未進量改變
		if (rowData.SNotQty !== oldRowData.SNotQty) {
			processedRowData = {
				...processedRowData,
				["SNotQty"]:
					rowData.SNotQty === 0 ? 0 : rowData.SQty - rowData.SInQty,
			};
		}
		return processedRowData;
	}, [grid.gridData, handleGridProdChange]);

	const updateAmt = useCallback(({ setValue, gridData }) => {
		const subtotal = C03.getSubtotal(gridData);
		setValue("OrdAmt_N", subtotal.toFixed(2));
	}, []);

	const onGridChanged = useCallback(({ gridData, formData, setValue, updateResult }) => {
		updateAmt({ setValue, gridData });
	}, [updateAmt]);

	// const buildGridChangeHandler = useCallback(
	// 	({ setValue, getValues, gridMeta }) =>
	// 		async (newValue, operations) => {
	// 			console.log("handleGridChange", operations);
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
	// 								const updatedRow = await updateGridRow({
	// 									getValues,
	// 									fromIndex: operation.fromRowIndex,
	// 									newValue,
	// 								})(item, index);
	// 								return updatedRow;
	// 							})
	// 					)
	// 					newGridData.splice(
	// 						operation.fromRowIndex,
	// 						updatedRows.length,
	// 						...updatedRows
	// 					);
	// 				} else if (operation.type === "DELETE") {
	// 					// 列舉原資料
	// 					checkFailed = grid.gridData
	// 						.slice(operation.fromRowIndex, operation.toRowIndex)
	// 						.some((rowData, i) => {
	// 							if (prodDisabled({ rowData })) {
	// 								const rowIndex = operation.fromRowIndex + i;
	// 								toast.error(`不可刪除第 ${rowIndex + 1} 筆商品`, {
	// 									position: "top-right"
	// 								});
	// 								return true;
	// 							}
	// 							return false;
	// 						});
	// 				} else if (operation.type === "CREATE") {
	// 					console.log("dsg.CREATE");
	// 					// process CREATE here
	// 					gridMeta.toFirstColumn({ nextRow: true });
	// 				}
	// 			}
	// 			console.log("after changed", newGridData);
	// 			if (!checkFailed) {
	// 				grid.setGridData(newGridData);
	// 				// const subtotal = C03.getSubtotal(newGridData);
	// 				// setValue("OrdAmt_N", subtotal.toFixed(2));
	// 				updateAmt({ gridData: newGridData, setValue });
	// 			}
	// 		},
	// 	[grid, updateAmt, prodDisabled]
	// );

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C03.transformForSubmitting(
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

	// REVIEW
	const reviewAction = useAction();
	const reviewing = useMemo(() => {
		return !!reviewAction.state;
	}, [reviewAction.state]);

	const handleReview = useCallback(
		async ({ value }) => {
			console.log(`handleReview`, value);
			try {
				reviewAction.start();
				const { status, error } = await httpPatchAsync({
					url: `v1/purchase/orders/reviewed`,
					data: {
						OrdID: crud.itemData?.OrdID,
						Checker: 2,
					},
					bearer: token,
				});
				if (status.success) {
					reviewAction.clear();
					// crud.cancelAction();
					loadItem({
						refresh: true,
					});
					listLoader.loadList({
						refresh: true,
					});
					toast.success(`採購單${crud.itemData?.OrdID}」已覆核成功`);
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("覆核失敗", err), {
					position: "top-right"
				});
			}
		},
		[
			crud.itemData?.OrdID,
			httpPatchAsync,
			listLoader,
			loadItem,
			reviewAction,
			token,
		]
	);

	const promptReview = useCallback(() => {
		dialogs.confirm({
			title: "確認覆核",
			message: `確定要通過採購單「${crud.itemData?.OrdID}」?`,
			onConfirm: handleReview,
			confirmText: "通過",
			working: reviewing,
		});
	}, [crud.itemData?.OrdID, dialogs, handleReview, reviewing]);

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
					url: `v1/purchase/orders/reviewed`,
					data: {
						OrdID: crud.itemData?.OrdID,
						Checker: 1,
					},
					bearer: token,
				});
				if (status.success) {
					rejectAction.clear();
					// crud.cancelAction();
					loadItem({
						refresh: true,
					});
					listLoader.loadList({
						refresh: true,
					});
					toast.success(
						`採購單${crud.itemData?.OrdID}」已解除覆核成功`
					);
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("解除覆核失敗", err), {
					position: "top-right"
				});
			}
		},
		[
			crud.itemData?.OrdID,
			httpPatchAsync,
			listLoader,
			loadItem,
			rejectAction,
			token,
		]
	);

	const promptReject = useCallback(() => {
		dialogs.confirm({
			title: "確認解除覆核",
			message: `確定要解除覆核採購單「${crud.itemData?.OrdID}」?`,
			onConfirm: handleReject,
			confirmText: "解除",
			working: rejectAction.working,
		});
	}, [crud.itemData?.OrdID, dialogs, handleReject, rejectAction.working]);

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const jsonData = {
				...(data.outputType && {
					Action: data.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "C03",
				IDs: crud.itemData?.OrdID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebC03Rep.aspx?LogKey=${operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.OrdID,
			operator?.CurDeptID,
			operator?.LogKey,
			postToBlank,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const onRefreshGridSubmit = useCallback(
		({ setValue }) =>
			async (data) => {
				console.log("onRefreshGridSubmit", data);
				try {
					const collected = C03.transformForSubmitting(
						data,
						grid.gridData
					);
					console.log("collected", collected);

					const { status, payload, error } = await httpPostAsync({
						url: "v1/purchase/orders/refresh-grid",
						bearer: token,
						data: collected,
					});
					console.log("refresh-grid.payload", payload);
					if (status.success) {
						const data = C03.transformForReading(payload.data[0]);
						console.log("data.prods", data.prods);
						// 置換 grid 部分
						grid.initGridData(data.prods, {
							fillRows: crud.creating
						});
						toast.info("商品單價已更新");
						// 置換採購金額
						setValue("OrdAmt_N", data.OrdAmt_N);
						setPrevData({
							supplier: data?.supplier,
							OrdDate: data?.OrdDate,
						});
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					console.error("onRefreshGridSubmit failed", err);
					toast.error(Errors.getMessage("單價重整失敗", err), {
						position: "top-right"
					});
					// 還原
					const prevData = getPrevData();
					setValue("supplier", prevData?.supplier);
					setValue("OrdDate", prevData?.OrdDate);
				}
			},
		[grid, httpPostAsync, token, setPrevData, getPrevData]
	);

	const onRefreshGridSubmitError = useCallback((err) => {
		console.error("onRefreshGridSubmitError", err);
	}, []);

	return {
		...crud,
		...listLoader,
		...appModule,
		// selectedInq,
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
		supplierChangedHandler,
		buildOrdDateChangeHandler,
		// Grid
		createRow,
		...grid,
		grid,
		// buildGridChangeHandler,
		getRowKey,
		prodDisabled,
		spriceDisabled,
		sqtyDisabled,
		sNotQtyDisabled,
		// supplierNameDisabled,
		isSupplierNameDisabled,
		supplierPickerDisabled,
		squaredFlagDisabled,
		// 覆核
		reviewing,
		handleReview,
		promptReview,
		cancelReview,
		// 解除覆核
		// rejecting,
		handleReject,
		promptReject,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		onRefreshGridSubmit,
		onRefreshGridSubmitError,
		selectById,
		selectedItem,
		...sideDrawer,
		onGridChanged,
		onUpdateRow,
		isRowDeletable
	};
};
