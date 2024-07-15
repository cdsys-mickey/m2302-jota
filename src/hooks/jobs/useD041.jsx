import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import D041 from "@/modules/md-d041";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/useDSG";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "@/shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useToggle } from "../../shared-hooks/useToggle";
import { nanoid } from "nanoid";

export const useD041 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "D041",
	});

	// const qtyMap = useMemo(() => new Map(), []);

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/own-brand/stocking-orders",
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

	// 挑戰
	// const pwordLockRef = useRef(null);
	// const sqtyLockRef = useRef(null);

	// const loadStockPword = useCallback(async () => {
	// 	try {
	// 		const { status, payload, error } = await httpGetAsync({
	// 			url: `v1/ou/dept/params`,
	// 			bearer: token,
	// 			params: {
	// 				id: "StockPword",
	// 				dc: 1,
	// 			},
	// 		});
	// 		if (status.success) {
	// 			pwordLockRef.current = {
	// 				value: payload,
	// 				passed: false,
	// 			};
	// 		} else {
	// 			throw error || new Error("未預期例外");
	// 		}
	// 	} catch (err) {
	// 		toast.error(Errors.getMessage("讀取設定發生錯誤", err));
	// 	}
	// }, [httpGetAsync, token]);

	// const calcProdStock = useCallback(
	// 	({ prodId, rowIndex, gridData }) => {
	// 		const totalSQty = gridData
	// 			.filter(
	// 				(item, index) =>
	// 					item.prod.ProdID === prodId && index < rowIndex
	// 			)
	// 			.reduce((sum, item) => sum + parseFloat(item.SQty), 0);
	// 		const stock = qtyMap.get(prodId) || 0;
	// 		return stock - totalSQty;
	// 	},
	// 	[qtyMap]
	// );

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			PackData_N: "",
			SQty: "",
			SExpDate: null,
			dtype: null,
			reworked: false,
			stype: null,
			SRemark: "",
		}),
		[]
	);

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			prods: [],
			EntDate: new Date(),
		};
		crud.promptCreating({ data });
		// qtyMap.clear();
		prodGrid.initGridData(data.prods, { createRow });
	}, [createRow, crud, prodGrid]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/own-brand/stocking-orders",
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
				if (err.code === 102) {
					// loadStockMap(data.prods, { mark: true });
					toast.error("部分商品庫存不足，請調整後再送出");
				} else {
					toast.error(Errors.getMessage("新增失敗", err));
				}
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
					url: "v1/own-brand/stocking-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = D041.transformForReading(payload.data[0]);
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

			loadItem({ id: rowData.入庫單號 });
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
					url: "v1/own-brand/stocking-orders",
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
			message: `確認要删除入庫單「${itemData?.EntID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/own-brand/stocking-orders`,
						bearer: token,
						params: {
							id: itemData?.EntID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除入庫單 ${itemData?.EntID}`);
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

	const onSearchSubmit = useCallback(
		(data) => {
			console.log("onSearchSubmit", data);
			handlePopperClose();
			listLoader.loadList({
				params: D041.transformAsQueryParams(data),
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

	const purchaseOrdersDisabled = useMemo(() => {
		return !!crud.itemData?.EntID;
	}, [crud.itemData?.EntID]);

	const prodDisabled = useCallback(({ rowData }) => {
		return !!rowData.ordId;
	}, []);

	const spriceDisabled = useCallback(({ rowData }) => {
		return !!rowData.SInqFlag || !!rowData.stype;
	}, []);

	// const recoverActiveCell = useCallback(() => {
	// 	if (sqtyLockRef.current !== undefined && sqtyLockRef.current !== null) {
	// 		prodGrid.setActiveCell({
	// 			col: "SQty",
	// 			row: sqtyLockRef.current?.rowIndex,
	// 		});
	// 	} else {
	// 		console.warn("sqtyLockRef is null");
	// 	}
	// }, [prodGrid]);

	// const commitSQty = useCallback(
	// 	({ setValue }) => {
	// 		const sqtyLock = sqtyLockRef.current;
	// 		// 置換

	// 		const newRowData = {
	// 			SQty: sqtyLock.demand,
	// 			SQtyNote: "*",
	// 		};
	// 		console.log("commitSQty", newRowData);

	// 		prodGrid.setValueByRowIndex(sqtyLock.rowIndex, newRowData);
	// 		const newGridData = [...prodGrid.gridData];
	// 		newGridData[sqtyLock.rowIndex] = newRowData;

	// 		prodGrid.setActiveCell({
	// 			col: "SQty",
	// 			row: sqtyLock.rowIndex,
	// 		});
	// 		sqtyLockRef.current = null;
	// 	},
	// 	[prodGrid]
	// );

	/**
	 * 確認強迫銷貨
	 */
	// const promptOverrideSQty = useCallback(
	// 	({ setValue }) => {
	// 		const sqtyLock = sqtyLockRef.current;
	// 		dialogs.confirm({
	// 			message: `[${sqtyLock.prod.ProdID} ${sqtyLock.prod.ProdData}] 庫存不足(${sqtyLock.stock})，是否強迫銷貨？`,
	// 			onConfirm: () => {
	// 				commitSQty({ setValue });
	// 			},
	// 			onCancel: () => {
	// 				console.log("pword cancelled");
	// 				// prodGrid.setActiveCell({
	// 				// 	col: "SQty",
	// 				// 	row: sqtyLock.rowIndex,
	// 				// });
	// 				recoverActiveCell();
	// 			},
	// 			onClose: recoverActiveCell,
	// 			closeOthers: true,
	// 		});
	// 	},
	// 	[commitSQty, dialogs, recoverActiveCell]
	// );

	// const promptPwordEntry = useCallback(
	// 	({ promptOverrideSQty, setValue, first = true }) => {
	// 		console.log("promptPwordEntry, first:", first);
	// 		const sqtyLock = sqtyLockRef.current;
	// 		const pwordLock = pwordLockRef.current;
	// 		dialogs.prompt({
	// 			title: "庫存不足",
	// 			message: first
	// 				? `[${sqtyLock.prod.ProdID} ${sqtyLock.prod.ProdData}] 庫存不足(${sqtyLock.stock}), 請輸入密碼`
	// 				: "密碼錯誤，請再次輸入或取消",
	// 			label: "強迫銷貨密碼",
	// 			triggerCancelOnClose: true,
	// 			disableCloseOnConfirm: true,
	// 			closeOthers: !first,
	// 			onConfirm: (value) => {
	// 				if (value === pwordLock.value) {
	// 					console.log("pword passed");
	// 					pwordLockRef.current = {
	// 						...pwordLockRef.current,
	// 						passed: true,
	// 					};
	// 					// dialogs.closeLatest();
	// 					promptOverrideSQty({ setValue });
	// 				} else {
	// 					// dialogs.closeLatest();
	// 					console.log("pword not passed");
	// 					toast.error("密碼錯誤, 請重新輸入");
	// 					promptPwordEntry({
	// 						promptOverrideSQty,
	// 						setValue,
	// 						first: false,
	// 					});
	// 				}
	// 			},
	// 			onCancel: () => {
	// 				console.log("pword cancelled");
	// 				// prodGrid.setActiveCell({
	// 				// 	col: "SQty",
	// 				// 	row: sqtyLock.rowIndex,
	// 				// });
	// 				recoverActiveCell();
	// 			},
	// 			onClose: recoverActiveCell,
	// 			// confirmText: "通過",
	// 		});
	// 	},
	// 	[dialogs, recoverActiveCell]
	// );

	// const handleOverrideSQty = useCallback(
	// 	({ setValue }) => {
	// 		const pwordLock = pwordLockRef.current;
	// 		// 1.如果通過密碼判定(stockPwordPassedRef.current), 則直接跳確認
	// 		prodGrid.setActiveCell(null);
	// 		if (!pwordLock?.passed) {
	// 			promptPwordEntry({ promptOverrideSQty, setValue });
	// 			return;
	// 		}
	// 		promptOverrideSQty({ setValue });
	// 	},
	// 	[prodGrid, promptOverrideSQty, promptPwordEntry]
	// );

	const handleGridProdChange = useCallback(
		async ({ rowData, rowIndex, newValue }) => {
			const { prod } = rowData;
			rowData = {
				...rowData,
				["SQty"]: "",
				["PackData_N"]: "",
			};

			let prodInfoEntrieved = false;
			if (prod?.ProdID) {
				prodInfoEntrieved = true;
				rowData = {
					...rowData,
					["PackData_N"]: prod?.PackData_N || "",
				};
			}
			if (!prodInfoEntrieved) {
				rowData = {
					...rowData,
					["prod"]: null,
					["PackData_N"]: "",
				};
			}
			return rowData;
		},
		[]
	);

	// const handleGridSQtyChange = useCallback(
	// 	({ rowData, rowIndex, setValue, gridData }) => {
	// 		if (!rowData.prod) {
	// 			return rowData;
	// 		}

	// 		// const prodStock = calcProdStock({
	// 		// 	rowIndex,
	// 		// 	prodId: rowData.prod.ProdID,
	// 		// 	gridData,
	// 		// });

	// 		sqtyLockRef.current = {
	// 			rowIndex: rowIndex,
	// 			prod: rowData.prod,
	// 			demand: rowData.SQty,
	// 			price: rowData.SPrice,
	// 			stype: rowData.stype,
	// 			// stock: prodStock,
	// 		};

	// 		if (prodStock < rowData.SQty && rowData.SQty > 0) {
	// 			rowData = {
	// 				...rowData,
	// 				["SQty"]: 0,
	// 			};

	// 			handleOverrideSQty({ setValue });
	// 		} else {
	// 			rowData = {
	// 				...rowData,
	// 				// ["SQtyNote"]: "",
	// 				// sqtyError: false,
	// 			};
	// 		}
	// 		return rowData;
	// 	},
	// 	[calcProdStock, handleOverrideSQty]
	// );

	// const handleGridOverrideSQtyChange = useCallback(({ rowData }) => {
	// 	rowData = {
	// 		...rowData,
	// 		...(rowData.overrideSQty && {
	// 			sqtyError: false,
	// 		}),
	// 	};
	// 	return rowData;
	// }, []);

	const buildGridChangeHandler = useCallback(
		({ getValues, setValue }) =>
			(newValue, operations) => {
				// const formData = getValues();
				console.log("buildGridChangeHandler", operations);
				console.log("newValue", newValue);
				const newGridData = [...newValue];
				let checkFailed = false;
				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						newValue
							.slice(operation.fromRowIndex, operation.toRowIndex)
							.forEach(async (rowData, i) => {
								const rowIndex = operation.fromRowIndex + i;
								const oldRowData = prodGrid.gridData[rowIndex];

								let processedRowData = { ...rowData };
								// 商品
								if (
									rowData.prod?.ProdID !==
									oldRowData.prod?.ProdID
								) {
									processedRowData =
										await handleGridProdChange({
											rowIndex,
											rowData: processedRowData,
											newValue,
										});
								}

								newGridData[rowIndex] = processedRowData;
							});
					} else if (operation.type === "DELETE") {
						// do nothing now
					}
				}
				console.log("prodGrid.changed", newGridData);
				if (!checkFailed) {
					prodGrid.setGridData(newGridData);
				}
			},
		[handleGridProdChange, prodGrid]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = D041.transformForSubmitting(
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
				JobName: "D041",
				IDs: crud.itemData?.EntID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebD041Rep.aspx?LogKey=${
					operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.EntID,
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

	const checkEditableAction = useAction();

	const handleCheckEditable = useCallback(async () => {
		try {
			checkEditableAction.start();
			const { status, error } = await httpGetAsync({
				url: "v1/own-brand/stocking-orders/check-editable",
				bearer: token,
				params: {
					id: crud.itemData.EntID,
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

	const dtypeDisabled = useCallback(({ rowData }) => {
		return !rowData.prod || !!rowData.reworked;
	}, []);

	const stypeDisabled = useCallback(({ rowData }) => {
		return !rowData.prod;
	}, []);

	const reworkedDisabled = useCallback(({ rowData }) => {
		return !rowData.prod || !!rowData.dtype;
	}, []);

	return {
		...crud,
		...listLoader,
		...appModule,
		// selectedInq,
		loadItem,
		handleSelect,
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
		...prodGrid,
		buildGridChangeHandler,
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
		// 檢查可否編輯
		checkEditableWorking: checkEditableAction.working,
		handleCheckEditable,
		// loadStockPword,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		dtypeDisabled,
		stypeDisabled,
		reworkedDisabled,
	};
};
