import ConfigContext from "@/contexts/config/ConfigContext";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import { toastEx } from "@/helpers/toastEx";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { nanoid } from "nanoid";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import C01 from "@/modules/C01.mjs";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useAction } from "@/shared-hooks/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApi } from "@/shared-hooks/useWebApi";
import useJotaReports from "../useJotaReports";
import { useSideDrawer } from "../useSideDrawer";
import useSQtyManager from "../useSQtyManager";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useC01 = () => {
	const crud = useContext(CrudContext);
	const listLoaderCtx = useContext(InfiniteLoaderContext);
	const itemIdRef = useRef();
	const { token, operator } = useContext(AuthContext);
	const config = useContext(ConfigContext);
	const appModule = useAppModule({
		token,
		moduleId: "C01",
	});

	// 側邊欄
	const sideDrawer = useSideDrawer();

	const [selected, setSelected] = useState();

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
		url: "v1/purchase/req-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SOrdQty: null,
			supplier: null,
			SFactNa: "",
			SOrdID: "*",
		}),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
		createRow
	});

	const sqtyManager = useSQtyManager({
		grid,
		sqtyColumn: "SRqtQty",
		disableOverrideCheck: true
	});

	const prodDisabled = useCallback(({ rowData }) => {
		return (
			!!rowData.Pkey && rowData.Pkey.length === 36 && !!rowData.SRqtQty
		);
	}, []);

	const supplierNameDisabled = useCallback(({ rowData }) => {
		return rowData.SOrdID !== "*" || rowData.supplier?.FactID !== "*";
	}, []);

	const rqtQtyDisabled = useCallback(({ rowData }) => {
		return !!rowData.Pkey;
	}, []);

	const orderQtyDisabled = useCallback(({ rowData }) => {
		return rowData.SOrdID !== "*";
	}, []);

	const supplierDisabled = useCallback(({ rowData }) => {
		return rowData.SOrdID !== "*";
	}, []);


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
					url: "v1/purchase/req-to-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = C01.transformForReading(payload.data[0]);
					crud.doneReading({
						data: data,
					});
					setSelected(data);
					sqtyManager.recoverStockMap(data.prods);
					grid.handleGridDataLoaded(data.prods);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[httpGetAsync, token, crud, sqtyManager, grid]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			// setSelectedItem(rowData);

			loadItem({ id: rowData.請購單號 });
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
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

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
					url: "v1/purchase/req-to-orders",
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
				console.error("handleUpdate.failed", err);
				toastEx.error("修改失敗", err);
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	const handleReset = useCallback(
		({ reset, getValues }) =>
			() => {
				// const formData = getValues();
				// handlePopperClose();
				// listLoader.loadList({
				// 	params: {
				// 		ck: 2,
				// 		of: formData.listMode?.id,
				// 	},
				// });
				reset({});
			},
		[]
	);

	const onSearchSubmit = useCallback(
		(data) => {
			console.log("onSearchSubmit", data);
			const collected = {
				...C01.transformAsQueryParams(data),
				// of: data?.listMode?.id,
				ck: 2,
			};
			console.log("collected", collected);
			handlePopperClose();
			listLoader.loadList({
				params: collected,
			});
		},
		[handlePopperClose, listLoader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const getProdInfo = useCallback(
		async (prodId) => {
			if (!prodId) {
				toastEx.error("請先選擇商品", {
					position: "top-right"
				});
				return;
			}
			try {
				const { status, payload, error } = await httpGetAsync({
					url: "v1/inv/stock",
					bearer: token,
					params: {
						id: prodId,
						cv: "i",
						safety: 1
					},
				});

				if (status.success) {
					sqtyManager.updateStockQty(prodId, payload.Stock ?? payload.StockQty);
					return payload;
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				toastEx.error("查詢庫存失敗", err);
			}
		}
		, [httpGetAsync, sqtyManager, token]);

	const handleGridProdChange = useCallback(async ({ rowData, rowIndex }) => {
		const prodInfo = rowData?.prod ? await getProdInfo(
			rowData?.prod?.ProdID,
		) : null;

		const { prod } = rowData;
		console.log(`prod[${rowIndex}] changed`, prod);
		let processedRowData = { ...rowData };

		processedRowData = {
			...processedRowData,
			["ProdData"]: prod?.ProdData || "",
			["PackData_N"]: prod?.PackData_N || "",
			["StockQty_N"]: prodInfo?.Stock || "",
			["SRqtQty"]: "",
			["SOrdQty"]: "",
			["supplier"]: null,
			["tooltip"]: ""
		};
		return processedRowData;
	}, [getProdInfo]);

	const handleGridSupplierChange = useCallback(({ rowData, rowIndex }) => {
		const { supplier } = rowData;
		console.log(`supplier[${rowIndex}] changed`, supplier);

		let processedRowData = { ...rowData };
		processedRowData = {
			...processedRowData,
			["SFactNa"]: supplier?.FactData || "",
		};
		return processedRowData;
	}, []);

	const isRowDeletable = useCallback(({ rowData }) => {
		return !prodDisabled({ rowData });
	}, [prodDisabled]);

	const mapTooltip = useCallback(({ updateResult, prevGridData, gridData, rowIndex }) => {
		let _prodId;
		if (updateResult?.type === "DELETE") {
			_prodId = prevGridData[rowIndex]?.prod?.ProdID || '';
			console.log(`deleted prodId: "${_prodId}"`);
		} else {
			const targetRow = gridData[rowIndex];
			_prodId = targetRow.prod?.ProdID;
			// 如果 targetProdID 為空，則使用 prevGridData 的 ProdID
			if (!_prodId) {
				_prodId = prevGridData[rowIndex]?.prod?.ProdID || '';
			}
		}

		// 若 targetProdID 仍為空，則不執行更新
		if (!_prodId) {
			console.error("_prodId 為空, 不執行 mapTooltip")
			return gridData;
		}

		// 計算其他符合條件列的 SQty 加總
		return gridData.map((row) => {
			if (row.prod?.ProdID === _prodId) {

				const stock = sqtyManager.getStockQty(_prodId);
				// const stock = sqtyManager.getRemainingStock({ prodId: _prodId, gridData });

				let processedRowData = {
					...row,
					StockQty_N: stock,
				};

				processedRowData = {
					...processedRowData,
					["tooltip"]: C01.getTooltips({
						rowData: processedRowData,
						rowIndex
					}),
				}

				return processedRowData;
			}
			return row; // 不符合條件則返回原本的列
		});
	}, [sqtyManager]);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		updateResult.rowIndex = rowIndex;

		const oldRowData = grid.gridData[rowIndex];
		console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
		let dirty = false;
		// prod
		if (processedRowData.prod?.ProdID !== oldRowData.prod?.ProdID) {
			updateResult.cols.push("prod")
			processedRowData = await handleGridProdChange({
				rowData: processedRowData,
				rowIndex,
			});
		}

		if (processedRowData.supplier?.FactID !== oldRowData.supplier?.FactID) {
			updateResult.cols.push("supplier")
			processedRowData = handleGridSupplierChange({
				rowData: processedRowData,
				rowIndex,
			});
		}
		if (dirty) {
			updateResult.rows++;
		}
		return processedRowData;
	}, [grid.gridData, handleGridProdChange, handleGridSupplierChange]);

	const onGridChanged = useCallback(({ gridData, formData, setValue, updateResult, prevGridData }) => {
		console.log("onGridChanged", gridData);

		if (updateResult.cols.includes("prod") || updateResult.cols.includes("SRqtQty") || updateResult.type === "DELETE") {
			console.log("before reduce", gridData);
			const updated = mapTooltip({ updateResult, prevGridData, gridData, rowIndex: updateResult.rowIndex })
			console.log("after reduce", updated);
			return updated;
		}

	}, [mapTooltip]);


	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C01.transformForSubmitting(
				data,
				grid.gridData
			);
			console.log("collected", collected);
			if (crud.updating) {
				handleUpdate({ data: collected });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[crud.updating, handleUpdate, grid.gridData]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
	}, []);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebC01Rep.aspx`
	}, [config.REPORT_URL])
	const reports = useJotaReports();

	const onPrintSubmit = useCallback(
		(payload) => {
			console.log("onPrintSubmit", payload);
			const ordId = grid.gridData.map(x => x.SOrdID).filter(x => {
				return x && x !== "*"
			}).join(",");
			if (!ordId) {
				toastEx.error("目前沒有採購單");
				return;
			}
			const data = {
				...(payload.outputType && {
					Action: payload.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "C01",
				IDs: ordId,
			};
			// console.log("jsonData", data);
			// postToBlank(
			// 	`${config.REPORT_URL}/WebC01Rep.aspx?LogKey=${operator?.LogKey
			// 	}`,
			// 	{
			// 		jsonData: JSON.stringify(data),
			// 	}
			// );
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[grid.gridData, operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handlePrint = useCallback(({ setValue }) => (outputType) => {
		console.log("handlePrint", outputType);
		setValue("outputType", outputType);
	}, []);

	// 轉採購單
	const transformAction = useAction();

	const transformDialogOpen = useMemo(() => {
		return (
			transformAction.prompting ||
			transformAction.working ||
			transformAction.failed
		);
	}, [
		transformAction.failed,
		transformAction.prompting,
		transformAction.working,
	]);

	const promptTransform = useCallback(() => {
		transformAction.prompt();
	}, [transformAction]);

	const cancelTransform = useCallback(() => {
		transformAction.clear();
	}, [transformAction]);

	const transformWorking = useMemo(() => {
		return transformAction.working;
	}, [transformAction.working]);

	const onTransformSubmit = useCallback(
		async (data) => {
			console.log("onTransformSubmit", data);

			try {
				transformAction.start();
				const { status, payload, error } = await httpPatchAsync({
					url: "v1/purchase/req-to-orders/to-order",
					bearer: token,
					params: {
						id: crud.itemData?.RqtID,
						empi: data.employee?.CodeID,
					},
				});
				if (status.success) {
					console.log("to-order.payload", payload);

					if (!payload.OrdIDs) {
						toastEx.error("沒有形成採購單，請確認供應商等欄位是否有確實填寫");
						transformAction.clear();
					} else {
						const ordIds = payload.OrdIDs.split("，");
						toastEx.success(
							`成功形成 ${ordIds.length
							} 張採購單，單號：${ordIds.join("、")}`
						);
						transformAction.finish();
						crud.cancelAction();
						listLoader.loadList({
							refresh: true,
						});
					}
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				transformAction.fail({ error: err });
				toastEx.error("形成採購單失敗", err);
			}
		},
		[crud, httpPatchAsync, listLoader, token, transformAction]
	);

	const onTransformSubmitError = useCallback((err) => {
		console.error("onTransformSubmitError", err);
	}, []);

	// 多筆轉採購單
	const transformListAction = useAction();

	const transformListDialogOpen = useMemo(() => {
		return (
			transformListAction.prompting ||
			transformListAction.working ||
			transformListAction.failed
		);
	}, [
		transformListAction.failed,
		transformListAction.prompting,
		transformListAction.working,
	]);

	const promptTransformList = useCallback(() => {
		transformListAction.prompt();
	}, [transformListAction]);

	const cancelTransformList = useCallback(() => {
		transformListAction.clear();
	}, [transformListAction]);

	const transformListWorking = useMemo(() => {
		return transformListAction.working;
	}, [transformListAction.working]);

	const onTransformListSubmit = useCallback(
		async (data) => {
			console.log("onTransformListSubmit", data);
			console.log("params", {
				...listLoaderCtx.paramsRef.current,
				empi: data.employee?.CodeID,
			});

			try {
				transformListAction.start();
				const { status, payload, error } = await httpPatchAsync({
					url: "v1/purchase/req-to-orders/to-orders",
					bearer: token,
					params: {
						...listLoaderCtx.paramsRef.current,
						empi: data.employee?.CodeID,
					},
				});
				if (status.success) {
					console.log("to-order.payload", payload);

					if (!payload.OrdIDs) {
						toastEx.error("沒有形成採購單，請確認供應商等欄位是否有確實填寫");
						transformListAction.clear();
					} else {
						const ordIds = payload.OrdIDs.split("，");
						toastEx.success(
							`成功形成 ${ordIds.length
							} 張採購單，單號：${ordIds.join("、")}`
						);
						transformListAction.finish();
						crud.cancelAction();
						listLoader.loadList({
							refresh: true,
						});
					}
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				transformListAction.fail({ error: err });
				toastEx.error("形成採購單失敗", err);
			}
		},
		[crud, httpPatchAsync, listLoader, listLoaderCtx.paramsRef, token, transformListAction]
	);

	const onTransformListSubmitError = useCallback((err) => {
		console.error("onTransformListSubmitError", err);
	}, []);

	return {
		...crud,
		...listLoader,
		...appModule,
		selected,
		loadItem,
		handleSelect,
		handleReset,
		onSearchSubmit,
		onSearchSubmitError,
		confirmQuitCreating,
		confirmQuitUpdating,
		confirmReturnReading,
		onEditorSubmit,
		onEditorSubmitError,
		// Grid
		...grid,
		// ...gridMeta,
		createRow,
		grid,
		// gridMeta,
		isRowDeletable,
		onUpdateRow,
		onGridChanged,
		getRowKey,
		prodDisabled,
		rqtQtyDisabled,
		orderQtyDisabled,
		supplierDisabled,
		supplierNameDisabled,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		// 形成採購單
		transformDialogOpen,
		cancelTransform,
		promptTransform,
		transformWorking,
		onTransformSubmit,
		onTransformSubmitError,
		// 批次形成採購單
		transformListDialogOpen,
		cancelTransformList,
		promptTransformList,
		transformListWorking,
		onTransformListSubmit,
		onTransformListSubmitError,

		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		...sideDrawer,
		handlePrint
	};
};
