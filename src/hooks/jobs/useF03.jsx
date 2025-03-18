import { AuthContext } from "@/contexts/auth/AuthContext";
import ConfigContext from "@/contexts/config/ConfigContext";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toastEx";
import F03 from "@/modules/md-f03";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { useToggle } from "../../shared-hooks/useToggle";
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useF03 = () => {
	const config = useContext(ConfigContext);
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "F03",
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
		url: "v1/inv/taking/filling",
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
		}),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
		createRow
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
			RetDate: new Date(),
		};
		crud.promptCreating({ data });
		// qtyMap.clear();
		grid.initGridData(data.prods, {
			fillRows: true
		});
	}, [crud, grid]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: "v1/inv/taking/filling",
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
				if (err.code === 102) {
					// recoverStockMap(data.prods, { mark: true });
					toastEx.error("部分商品庫存不足，請調整後再送出", {
						position: "top-right"
					});
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
					url: "v1/inv/taking/filling",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = F03.transformForReading(payload.data[0]);
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

			loadItem({ id: rowData.PhyID });
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
					url: "v1/inv/taking/filling",
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
				crud.failUpdating(err);
				console.error("handleCreate.failed", err);
				toastEx.error("修改失敗", err);
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除盤點清單「${itemData?.CalID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/inv/taking/filling`,
						bearer: token,
						params: {
							id: itemData?.CalID,
						},
					});
					if (status.success) {
						// 關閉對話框
						crud.cancelAction();
						toastEx.success(`成功删除盤點清單 ${itemData?.CalID}`);
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
				params: F03.transformAsQueryParams(data),
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
		return !!crud.itemData?.CalID;
	}, [crud.itemData?.CalID]);

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

	// 		prodGrid.spreadOnRow(sqtyLock.rowIndex, newRowData);
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
	// 					toastEx.error("密碼錯誤, 請重新輸入");
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

			const prodRowIndex = prod?.ProdID ? F03.findProdIndex({
				newValue,
				rowData,
				rowIndex,
			}) : null;

			const found = rowData.prod?.ProdID && prodRowIndex !== -1;

			// 檢查是否已存在
			if (found) {
				toastEx.error(
					`「${prod.ProdID} / ${prod.ProdData}」已存在於第 ${prodRowIndex + 1
					} 筆, 請重新選擇`
				);
			}

			rowData = {
				...rowData,
				prod: found ? null : rowData.prod,
				["ProdData"]: found ? "" : rowData.prod?.ProdData,
				["PackData_N"]: found ? "" : prod?.PackData_N || "",
				["SQty"]: "",
			};

			return rowData;
		},
		[]
	);

	const updateGridRow = useCallback(({ fromRowIndex, newValue }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
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
		return processedRowData;
	}, [grid.gridData, handleGridProdChange]);

	const buildGridChangeHandler = useCallback(
		({ getValues, setValue, gridMeta }) =>
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
						)
						console.log("updatedRows", updatedRows);

						newGridData.splice(
							operation.fromRowIndex,
							updatedRows.length,
							...updatedRows
						)
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

						// 		// 數量, 且有選 prod
						// 		// if (rowData.SQty !== oldRowData.SQty) {
						// 		// 	processedRowData = handleGridSQtyChange({
						// 		// 		rowData: processedRowData,
						// 		// 		gridData: newValue,
						// 		// 		rowIndex,
						// 		// 		setValue,
						// 		// 	});
						// 		// }

						// 		// 強迫銷貨
						// 		// if (
						// 		// 	rowData.overrideSQty !==
						// 		// 	oldRowData.overrideSQty
						// 		// ) {
						// 		// 	processedRowData =
						// 		// 		handleGridOverrideSQtyChange({
						// 		// 			rowData: processedRowData,
						// 		// 		});
						// 		// }
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
			const collected = F03.transformForSubmitting(
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
		return `${config.REPORT_URL}/WebF03Rep.aspx`
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
				JobName: "F03",
				IDs: crud.itemData?.PhyID,
			};
			// console.log("jsonData", data);
			// postToBlank(
			// 	`${config.REPORT_URL}/WebF03Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.PhyID, operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback(({ setValue }) => (outputType) => {
		console.log("handlePrint", outputType);
		setValue("outputType", outputType);
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
		// loadStockPword,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		...sideDrawer
	};
};
