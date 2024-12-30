import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/auth/AuthContext";
import CrudContext from "@/contexts/crud/CrudContext";
import D06 from "@/modules/md-d06";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "@/shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "@/shared-hooks/useHttpPost";
import { useToggle } from "../../shared-hooks/useToggle";
import { addDays, isDate, isValid } from "date-fns";
import { nanoid } from "nanoid";
import { useSideDrawer } from "../useSideDrawer";

export const useD06 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "D06",
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
		url: "v1/material/balance-orders",
		bearer: token,
		initialFetchSize: 50,
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SQty: "",
		}),
		[]
	);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
		createRow
	});

	// CREATE
	const promptCreating = useCallback(() => {
		const today = new Date();
		const data = {
			prods: [],
			RemDate: today,
			InitDate: addDays(today, 1),
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
					url: "v1/material/balance-orders",
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
					// recoverStockMap(data.prods, { mark: true });
					toast.error("部分商品庫存不足，請調整後再送出", {
						position: "top-right"
					});
				} else {
					toast.error(Errors.getMessage("新增失敗", err), {
						position: "top-right"
					});
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
					url: "v1/material/balance-orders",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = D06.transformForReading(payload.data[0]);
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

			loadItem({ id: rowData.結餘單號 });
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
					url: "v1/material/balance-orders",
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
			message: `確認要删除結餘單「${itemData?.RemID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/material/balance-orders`,
						bearer: token,
						params: {
							id: itemData?.RemID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除結餘單 ${itemData?.RemID}`);
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

	const handleReset = useCallback(
		({ reset }) =>
			() => {
				// handlePopperClose();
				// listLoader.loadList({
				// 	params: {},
				// });
				reset({
					employee: null,
					bdate: null
				});
			},
		[]
	);

	const onSearchSubmit = useCallback(
		(data) => {
			console.log("onSearchSubmit", data);
			handlePopperClose();
			listLoader.loadList({
				params: D06.transformAsQueryParams(data),
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

	const handleGridProdChange = useCallback(
		async ({ rowData, rowIndex, newValue }) => {
			const { prod } = rowData;

			const prodRowIndex = prod?.ProdID ? D06.findProdIndex({
				newValue,
				rowData,
				rowIndex,
			}) : null;

			const found = rowData.prod?.ProdID && prodRowIndex !== -1;

			// 檢查是否已存在
			if (found) {
				toast.error(
					`「${prod.ProdID} / ${prod.ProdData}」已存在於第 ${prodRowIndex + 1
					} 筆, 請重新選擇`,
					{
						position: "top-right",
					}
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
			const collected = D06.transformForSubmitting(
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
				JobName: "D06",
				IDs: crud.itemData?.RemID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebD06Rep.aspx?LogKey=${operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.RemID,
			operator?.CurDeptID,
			operator?.LogKey,
			postToBlank,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	const handleRemDateChanged = useCallback(
		({ setValue }) =>
			(value) => {
				if (value && isDate(value)) {
					setValue("InitDate", addDays(value, 1));
				} else {
					setValue("InitDate", null);
				}
			},
		[]
	);

	// const validateDate = useCallback((value) => {
	// 	if (value != null && !isValid(value)) {
	// 		return "日期格式錯誤";
	// 	}
	// 	return true;
	// }, []);

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
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		// 檢查可否編輯
		// loadStockPword,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		handleRemDateChanged,
		...sideDrawer,
		// validateDate
	};
};
