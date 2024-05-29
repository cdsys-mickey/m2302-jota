import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import C03 from "@/modules/md-C03";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/useDSG";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "@/shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "@/shared-hooks/useHttpPost";
import Forms from "../../shared-modules/sd-forms";
import { addDays, getYear, isDate, isValid } from "date-fns";

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
	const prevDataRef = useRef();

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

	const prodGrid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
	});

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
			prods: [],
		};
		crud.promptCreating({ data });
		prodGrid.handleGridDataLoaded(data.prods);
	}, [crud, prodGrid]);

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

					prodGrid.handleGridDataLoaded(data.prods);
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[crud, httpGetAsync, prodGrid, setPrevData, token]
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
				toast.error(Errors.getMessage("修改失敗", err));
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
		return Number(rowData.SInQty) > 0;
	}, []);

	const spriceDisabled = useCallback(({ rowData }) => {
		return rowData.SInqFlag === "*";
	}, []);

	const sqtyDisabled = useCallback(
		({ rowData }) => {
			return (
				rowData.SInQty > 0 ||
				(!!itemData?.GinID_N &&
					rowData.SQty !== rowData.SNotQty &&
					rowData.SNotQty) > 0
			);
		},
		[itemData?.GinID_N]
	);

	const sNotQtyDisabled = useCallback(({ rowData }) => {
		return Number(rowData?.SNotQty) <= 0;
	}, []);

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

	const handleSupplierChanged = useCallback(
		({ setValue, handleSubmit, getValues }) =>
			(newValue) => {
				console.log("supplier changed", newValue);
				setValue("FactData", newValue?.FactData || "");

				const ordDate = getValues("OrdDate");
				console.log("OrdDate", ordDate);
				if (
					newValue &&
					newValue.FactID !== "*" &&
					prodGrid.gridData.length > 0 &&
					isValid(ordDate) &&
					getYear(ordDate) > 1911
				) {
					// 重新計算報價
					handleSubmit();
				} else {
					// 清空「詢價註記」及「單價」
					prodGrid.handleGridDataLoaded(
						prodGrid.gridData.map((x) => ({
							...x,
							["SInqFlag"]: "",
							["SPrice"]: null,
						}))
					);
				}
			},
		[prodGrid]
	);

	const handleOrdDateChanged = useCallback(
		({ handleSubmit, getValues }) =>
			(newValue) => {
				const supplier = getValues("supplier");
				console.log("ordDate changed", newValue);
				// 重新計算報價
				if (
					supplier &&
					supplier.FactID !== "*" &&
					prodGrid.gridData.length > 0 &&
					isValid(newValue) &&
					getYear(newValue) > 1911
				) {
					handleSubmit();
				} else {
					// 清空「詢價註記」及「單價」
					prodGrid.handleGridDataLoaded(
						prodGrid.gridData.map((x) => ({
							...x,
							["SInqFlag"]: "",
							["SPrice"]: null,
						}))
					);
				}
			},
		[prodGrid]
	);

	const getProdInfo = useCallback(
		async (prodId, getValues) => {
			if (!prodId) {
				toast.error("請先選擇商品");
				return;
			}

			const supplierId = getValues("supplier")?.FactID;
			if (!supplierId) {
				toast.error("請先選擇廠商");
				return;
			}

			const ordDate = getValues("OrdDate");
			if (!isDate(ordDate)) {
				toast.error("請先輸入採購日期");
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
				toast.error(Errors.getMessage("查詢報價失敗", err));
			}
		},
		[httpGetAsync, token]
	);

	const handleGridChange = useCallback(
		({ getValues, setValue }) =>
			(newValue, operations) => {
				console.log("handleGridChange", operations);
				console.log("newValue", newValue);
				const newGridData = [...newValue];
				let checkFailed = false;
				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						newValue
							.slice(operation.fromRowIndex, operation.toRowIndex)
							.forEach(async (rowData, i) => {
								const { prod, SQty, SPrice, SInQty, SNotQty } =
									rowData;
								const rowIndex = operation.fromRowIndex + i;
								const {
									prod: oldProd,
									SQty: oldSQty,
									SNotQty: oldSNotQty,
									SPrice: oldSPrice,
									SInQty: oldSInQty,
								} = prodGrid.gridData[rowIndex];

								let processedRowData = { ...rowData };
								// 商品
								if (prod?.ProdID !== oldProd?.ProdID) {
									console.log(
										`prod[${rowIndex}] changed`,
										prod
									);

									if (prod?.ProdID) {
										const prodInfo = await getProdInfo(
											prod?.ProdID,
											getValues
										);
										// 取得報價
										processedRowData = {
											...processedRowData,
											["PackData_N"]:
												prod?.PackData_N || "",
											...prodInfo,
											["SQty"]: "",
											["SNotQty"]: "",
											["SAmt"]: "",
										};
									} else {
										processedRowData = {
											...processedRowData,
											["PackData_N"]: "",
											["SInqFlag"]: "",
											["SPrice"]: "",
											["SQty"]: "",
											["SNotQty"]: "",
											["SAmt"]: "",
										};
									}
								}
								// 單價
								if (SPrice !== oldSPrice) {
									const newSubtotal =
										!SPrice || !SQty ? "" : SPrice * SQty;
									processedRowData = {
										...processedRowData,
										["SAmt"]: newSubtotal,
									};
									console.log("SAmt→", newSubtotal);
								}
								// 數量改變
								if (SQty !== oldSQty) {
									processedRowData = {
										...processedRowData,
										["SAmt"]:
											!SPrice || !SQty
												? ""
												: SPrice * SQty,
									};
									// 新增時, 數量會同步到未進量
									if (crud.creating) {
										processedRowData = {
											...processedRowData,
											["SNotQty"]: SQty,
										};
									}
								}

								// 未進量改變
								if (SNotQty !== oldSNotQty) {
									processedRowData = {
										...processedRowData,
										["SNotQty"]:
											SNotQty === 0 ? 0 : SQty - SInQty,
									};
								}

								newGridData[rowIndex] = processedRowData;
							});
					} else if (operation.type === "DELETE") {
						// 列舉原資料
						checkFailed = prodGrid.gridData
							.slice(operation.fromRowIndex, operation.toRowIndex)
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
					const subtotal = C03.getSubtotal(newGridData);
					setValue("OrdAmt_N", subtotal);
					// setValue("OrdAmt_N", C03.getSubtotal(newGridData));
				}
			},
		[crud.creating, getProdInfo, prodDisabled, prodGrid]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C03.transformForSubmitting(
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
	const reviewAction = useAction();
	const reviewing = useMemo(() => {
		return !!reviewAction.state;
	}, [reviewAction.state]);

	const handleReview = useCallback(
		async (value) => {
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
				toast.error(Errors.getMessage("覆核失敗", err));
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
	const rejecting = useMemo(() => {
		return !!rejectAction.state;
	}, [rejectAction.state]);

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
				toast.error(Errors.getMessage("解除覆核失敗", err));
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
			working: rejecting,
		});
	}, [crud.itemData?.OrdID, dialogs, handleReject, rejecting]);

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
				`${import.meta.env.VITE_URL_REPORT}/WebC03Rep.aspx?LogKey=${
					operator?.LogKey
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
						prodGrid.gridData
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
						prodGrid.handleGridDataLoaded(data.prods);
						// toast.info("商品單價已更新");
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
					toast.error(Errors.getMessage("單價重整失敗", err));
					// 還原
					const prevData = getPrevData();
					setValue("supplier", prevData?.supplier);
					setValue("OrdDate", prevData?.OrdDate);
				}
			},
		[getPrevData, httpPatchAsync, prodGrid, setPrevData, token]
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
		handleSupplierChanged,
		handleOrdDateChanged,
		// Grid
		...prodGrid,
		handleGridChange,
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
		rejecting,
		handleReject,
		promptReject,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		onRefreshGridSubmit,
		onRefreshGridSubmitError,
	};
};
