/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import C06 from "@/modules/md-c06";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "@/shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { isDate } from "date-fns";
import Forms from "@/shared-modules/sd-forms";
import { useToggle } from "@/shared-hooks/useToggle";
import { nanoid } from "nanoid";

export const useC06 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "C06",
	});

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/purchase/dep-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const prodGrid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
	});

	const refreshAmt = useCallback(({ setValue, gridData, reset = false }) => {
		if (reset) {
			setValue("OrdAmt", "");
		} else {
			const total = C06.getTotal(gridData);
			setValue("OrdAmt", total.toFixed(2));
		}
	}, []);

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			stype: null,
			SQty: "",
			SPrice: "",
			SRemark: "",
			ChkQty: "",
			SOrdID: "",
		}),
		[]
	);

	// CREATE
	const promptCreating = useCallback(async () => {
		// 取得總公司
		let spDeptId = "";
		let deptName = "";
		console.log("operator", operator);
		if (operator.parentDeptId !== operator.CurDeptID) {
			spDeptId = operator.parentDeptId;
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "/v1/ou/depts",
					bearer: token,
					params: {
						id: spDeptId,
					},
				});
				if (status.success) {
					deptName = payload["AbbrName"];
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				toast.error(Errors.getMessage("讀取總公司失敗", err));
			}
		}

		const data = {
			prods: prodGrid.fillRows({ createRow }),
			OrdDate: new Date(),
			ArrDate: new Date(),
			stype: null,
			ordDept: {
				DeptID: operator.CurDeptID,
			},
			spDept: spDeptId
				? {
						DeptID: spDeptId,
						AbbrName: deptName,
				  }
				: null,
		};
		crud.promptCreating({ data });
		prodGrid.handleGridDataLoaded(data.prods);
	}, [createRow, crud, httpGetAsync, operator, prodGrid, token]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/purchase/dep-orders",
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
					url: "v1/purchase/dep-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = C06.transformForReading(payload.data[0]);
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

			loadItem({ id: rowData.訂貨單號 });
		},
		[crud, loadItem]
	);

	const spDeptDisabled = useMemo(() => {
		return crud.itemData?.transOutOrders?.length > 0;
	}, [crud.itemData?.transOutOrders?.length]);

	const refreshGrid = useCallback(
		async ({ formData, setValue }) => {
			const spDept = formData.spDept;

			if (spDept && prodGrid.gridData.filter((x) => x.prod).length > 0) {
				const collected = C06.transformForSubmitting(
					formData,
					prodGrid.gridData
				);
				console.log("collected", collected);
				try {
					const { status, payload, error } = await httpPostAsync({
						url: "v1/purchase/dep-orders/refresh-grid",
						bearer: token,
						data: collected,
					});
					console.log("refresh-grid.payload", payload);
					if (status.success) {
						const data = C06.transformForReading(payload.data[0]);
						console.log("refresh-grid.data", data);
						prodGrid.handleGridDataLoaded(
							prodGrid.fillRows({ createRow, data: data.prods })
						);
						refreshAmt({ setValue, gridData: data.prods });
						toast.info("商品單價已更新");
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toast.error(Errors.getMessage("更新商品單價失敗", err));
				}
			} else {
				//clear
				console.warn("clear values?");
			}
		},
		[createRow, httpPostAsync, prodGrid, refreshAmt, token]
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
					url: "v1/purchase/dep-orders",
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
			message: `確認要删除訂貨單「${itemData?.OrdID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/purchase/dep-orders`,
						bearer: token,
						params: {
							id: itemData?.OrdID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除訂貨單 ${itemData?.OrdID}`);
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

	const onSearchSubmit = useCallback(
		(data) => {
			console.log("onSearchSubmit", data);
			listLoader.loadList({
				params: C06.transformAsQueryParams(data),
			});
		},
		[listLoader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	const getProdInfo = useCallback(
		async (prodId, { spDept }) => {
			if (!prodId) {
				toast.error("請先選擇商品");
				return;
			}

			const spDeptId = spDept?.DeptID;
			if (!spDeptId) {
				toast.error("請先選擇出貨門市");
				return;
			}

			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/purchase/dep-orders/prod-info",
					bearer: token,
					params: {
						pd: prodId,
						sd: spDeptId,
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

	const sprodDisabled = useCallback(
		({ rowData }) => {
			return !!crud.itemData?.transOutOrders?.length > 0;
		},
		[crud.itemData?.transOutOrders?.length]
	);

	const sqtyDisabled = useCallback(
		({ rowData }) => {
			return !!crud.itemData?.transOutOrders?.length > 0;
		},
		[crud.itemData?.transOutOrders?.length]
	);

	const stypeDisabled = useCallback(
		({ rowData }) => {
			return !!crud.itemData?.transOutOrders?.length > 0;
		},
		[crud.itemData?.transOutOrders?.length]
	);

	// const fetchAmt = useCallback(
	// 	async ({ received, taxType, gridData, setValue }) => {
	// 		const total = C06.getTotal(gridData);
	// 		try {
	// 			const { status, payload, error } = await httpGetAsync({
	// 				url: "v1/purchase/dep-orders/refresh-amt",
	// 				bearer: token,
	// 				data: {
	// 					tt: taxType,
	// 					arv: received,
	// 					art: total,
	// 				},
	// 			});
	// 			if (status.success) {
	// 				console.log("refresh-amt", payload);
	// 				setValue("RtnAmt", payload.RtnAmt);
	// 				setValue("TaxAmt", payload.TaxAmt);
	// 				setValue("TotAmt", payload.TotAmt);
	// 				setValue("RtAmt", total);
	// 			} else {
	// 				throw error || new Error("發生未預期例外");
	// 			}
	// 		} catch (err) {
	// 			toast.error(Errors.getMessage("計算合計失敗", err));
	// 		}
	// 	},
	// 	[httpGetAsync, token]
	// );

	const buildGridChangeHandler = useCallback(
		({ getValues, setValue }) =>
			(newValue, operations) => {
				const formData = getValues();
				console.log("buildGridChangeHandler", operations);
				console.log("newValue", newValue);
				const newGridData = [...newValue];
				let checkFailed = false;
				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						newValue
							.slice(operation.fromRowIndex, operation.toRowIndex)
							.forEach(async (rowData, i) => {
								const {
									prod,
									SPrice,
									SQty,
									stype,
									SInQty,
									SNotQty,
								} = rowData;
								const rowIndex = operation.fromRowIndex + i;
								const {
									prod: oldProd,
									SPrice: oldSPrice,
									SQty: oldSQty,
									stype: oldStype,
									SNotQty: oldSNotQty,
								} = prodGrid.gridData[rowIndex];

								let processedRowData = { ...rowData };
								// 商品
								if (prod?.ProdID !== oldProd?.ProdID) {
									console.log(
										`prod[${rowIndex}] changed`,
										prod
									);
									let prodInfoRetrieved = false;
									if (prod?.ProdID) {
										const prodInfo = await getProdInfo(
											prod?.ProdID,
											{
												spDept: formData.spDept,
											}
										);
										// 取得報價 (空白和 0 都不可調撥)
										prodInfoRetrieved =
											prodInfo && !!prodInfo.Price;
										if (prodInfoRetrieved) {
											processedRowData = {
												...processedRowData,
												["PackData_N"]:
													prod?.PackData_N || "",
												...(prodInfoRetrieved && {
													SPrice: prodInfo.Price,
													SMsg: `庫存為 ${prodInfo.Stock}`,
												}),
											};
										} else {
											toast.error(
												`出貨部門未設定「${prod.ProdID} ${prod.ProdData}」調撥成本，不得訂購`
											);
										}
									}
									if (!prodInfoRetrieved) {
										processedRowData = {
											...processedRowData,
											["prod"]: null,
											["SInqFlag"]: "",
											["SPrice"]: "",
											["PackData_N"]: "",
											["SNote"]: "",
											["SQty"]: "",
											["SNotQty"]: "",
											["SInQty"]: "",
											["SAmt"]: "",
										};
									}
								}

								// 數量改變
								if (SQty !== oldSQty) {
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

								// 單價, 贈, 數量
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
												: stype
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
					prodGrid.setGridData(newGridData);
					const total = C06.getTotal(newGridData);
					setValue("OrdAmt", total.toFixed(2));
					refreshAmt({ setValue, gridData: newGridData });
				}
			},
		[crud.creating, getProdInfo, prodGrid, refreshAmt]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C06.transformForSubmitting(
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
				JobName: "C06",
				IDs: crud.itemData?.OrdID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebC06Rep.aspx?LogKey=${
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
					if (prodGrid.gridData.length > 0) {
						const collected = C06.transformForSubmitting(
							data,
							prodGrid.gridData
						);
						console.log("collected", collected);

						const { status, payload, error } = await httpPostAsync({
							url: "v1/purchase/dep-orders/refresh-grid",
							bearer: token,
							data: collected,
						});
						console.log("refresh-grid.payload", payload);
						if (status.success) {
							const data = C06.transformForReading(
								payload.data[0]
							);
							console.log("refreshed data", data);
							prodGrid.handleGridDataLoaded(
								prodGrid.fillRows({
									createRow,
									data: data.prods,
								})
							);
							refreshAmt({ setValue, gridData: data.prods });
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
		[httpPostAsync, prodGrid, refreshAmt, token]
	);

	const onRefreshGridSubmitError = useCallback((err) => {
		console.error("onRefreshGridSubmitError", err);
	}, []);

	const checkEditableAction = useAction();

	const handleCheckEditable = useCallback(async () => {
		try {
			checkEditableAction.start();
			const { status, error } = await httpGetAsync({
				url: "v1/purchase/dep-orders/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.OrdID,
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

	const squaredFlagDisabled = useMemo(() => {
		return crud.creating;
	}, [crud.creating]);

	const handleSpDeptChanged = useCallback(
		({ setValue, getValues }) =>
			(newValue) => {
				console.log("handleSpDeptChanged", newValue);

				refreshGrid({ formData: getValues(), setValue });
			},
		[refreshGrid]
	);

	const getSPriceClassName = useCallback(({ rowData }) => {
		return rowData.stype?.id ? "line-through" : null;
	}, []);

	const disableAddRows = useMemo(() => {
		return crud.itemData?.transOutOrders?.length > 0;
	}, [crud.itemData?.transOutOrders?.length]);

	return {
		...crud,
		...listLoader,
		...appModule,
		// selectedInq,
		loadItem,
		handleSelect,
		handleSupplierChanged,
		// Popper
		//
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
		buildGridChangeHandler,
		getRowKey,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		onRefreshGridSubmit,
		onRefreshGridSubmitError,
		// 檢查可否編輯
		handleRefresh,
		refreshWorking: refreshAction.working,
		squaredFlagDisabled,
		handleSpDeptChanged,
		getSPriceClassName,
		spDeptDisabled,
		sprodDisabled,
		sqtyDisabled,
		stypeDisabled,
		disableAddRows,
	};
};
