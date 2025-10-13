import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import D041 from "@/modules/D041.mjs";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import useAction from "@/shared-modules/ActionState/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useToggle } from "../../shared-hooks/useToggle";
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useD041 = () => {
	const config = useContext(ConfigContext);
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "D041",
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();
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

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
		createRow,
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
	// 			throw error ?? new Error("未預期例外");
	// 		}
	// 	} catch (err) {
	// 		toastEx.error("讀取設定發生錯誤", err));
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

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
			prods: [],
			EntDate: new Date(),
		};
		crud.promptCreating({ data });
		// qtyMap.clear();
		grid.initGridData(data.prods, {
			fillRows: true,
		});
	}, [crud, grid]);

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
				if (err.code === 102) {
					// recoverStockMap(data.prods, { mark: true });
					toastEx.error("部分商品庫存不足，請調整後再送出");
				} else {
					toastEx.error("新增失敗", err);
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
					if (status.success) {
						// 關閉對話框
						crud.cancelAction();
						toastEx.success(`成功删除入庫單 ${itemData?.EntID}`);
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

	const handleReset = useCallback(
		({ reset }) =>
			() => {
				// handlePopperClose();
				// listLoader.loadList({
				// 	params: {},
				// });
				reset({
					employee: null,
					sdate: null,
					pdline: null,
				});
			},
		[]
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

	const handleGridProdChange = useCallback(
		async ({ rowData, rowIndex, newValue }) => {
			const { prod } = rowData;
			rowData = {
				...rowData,
				["SQty"]: "",
				["ProdData"]: prod?.ProdData || "",
				["PackData_N"]: prod?.PackData_N || "",
				["SExpDate"]: "",
			};

			return rowData;
		},
		[]
	);

	const updateGridRow = useCallback(
		({ fromRowIndex, newValue }) =>
			async (rowData, index) => {
				const rowIndex = fromRowIndex + index;
				const oldRowData = grid.gridData[rowIndex];
				console.log(`開始處理第 ${rowIndex} 列...`, rowData);
				let processedRowData = {
					...rowData,
				};
				// 商品
				if (rowData.prod?.ProdID !== oldRowData.prod?.ProdID) {
					processedRowData = await handleGridProdChange({
						rowIndex,
						rowData: processedRowData,
						newValue,
					});
				}
				return processedRowData;
			},
		[grid.gridData, handleGridProdChange]
	);

	const buildGridChangeHandler = useCallback(
		({ gridMeta }) =>
			async (newValue, operations) => {
				// const formData = getValues();
				console.log("buildGridChangeHandler", operations);
				console.log("newValue", newValue);
				const newGridData = [...newValue];
				let checkFailed = false;
				for (const operation of operations) {
					if (operation.type === "UPDATE") {
						const updatedRows = await Promise.all(
							newValue
								.slice(
									operation.fromRowIndex,
									operation.toRowIndex
								)
								.map(async (item, index) => {
									const updatedRow = await updateGridRow({
										fromRowIndex: operation.fromRowIndex,
										newValue,
									})(item, index);
									return updatedRow;
								})
						);
						console.log("updatedRows", updatedRows);

						newGridData.splice(
							operation.fromRowIndex,
							updatedRows.length,
							...updatedRows
						);
						// newValue
						// 	.slice(operation.fromRowIndex, operation.toRowIndex)
						// 	.forEach(async (rowData, i) => {
						// 		const rowIndex = operation.fromRowIndex + i;
						// 		const oldRowData = grid.gridData[rowIndex];

						// 		let processedRowData = { ...rowData };
						// 		// 商品
						// 		if (
						// 			rowData.prod?.ProdID !==
						// 			oldRowData.prod?.ProdID
						// 		) {
						// 			processedRowData =
						// 				await handleGridProdChange({
						// 					rowIndex,
						// 					rowData: processedRowData,
						// 					newValue,
						// 				});
						// 		}

						// 		newGridData[rowIndex] = processedRowData;
						// 	});
					} else if (operation.type === "DELETE") {
						// do nothing now
					} else if (operation.type === "CREATE") {
						console.log("dsg.CREATE");
						// process CREATE here
						gridMeta.toFirstColumn({ nextRow: true });
					}
				}
				console.log("prodGrid.changed", newGridData);
				if (!checkFailed) {
					grid.setGridData(newGridData);
				}
			},
		[updateGridRow, grid]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = D041.transformForSubmitting(data, grid.gridData);
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
		return `${config.REPORT_URL}/WebD041Rep.aspx`;
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
				JobName: "D041",
				IDs: crud.itemData?.EntID,
			};
			// postToBlank(
			// 	`${config.REPORT_URL}/WebD041Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.EntID, operator?.CurDeptID, reportUrl, reports]
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
				throw error ?? new Error("未預期例外");
			}
		} catch (err) {
			toastEx.error("編輯檢查失敗", err);
		} finally {
			checkEditableAction.clear();
		}
	}, [checkEditableAction, crud, httpGetAsync, token]);

	const dtypeDisabled = useCallback(({ rowData }) => {
		return !rowData.prod || !!rowData.reworked || !!rowData.stype;
	}, []);

	const stypeDisabled = useCallback(({ rowData }) => {
		return !rowData.prod || !!rowData.reworked || !!rowData.dtype;
	}, []);

	const reworkedDisabled = useCallback(({ rowData }) => {
		return !rowData.prod || !!rowData.dtype || !!rowData.stype;
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
		...grid,
		grid,
		createRow,
		buildGridChangeHandler,
		getRowKey,
		prodDisabled,
		purchaseOrdersDisabled,
		spriceDisabled,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		handlePrint,
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
		...sideDrawer,
	};
};
