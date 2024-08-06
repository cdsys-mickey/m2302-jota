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
import { addDays, isDate } from "date-fns";
import { nanoid } from "nanoid";

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

	const prodGrid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
	});

	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			prod: null,
			SQty: "",
		}),
		[]
	);

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
		prodGrid.initGridData(data.prods, { createRow });
	}, [createRow, crud, prodGrid]);

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
				toast.error(Errors.getMessage("修改失敗", err));
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
			rowData = {
				...rowData,
				["SQty"]: "",
				["PackData_N"]: "",
			};

			let prodInfoRetrieved = false;
			if (prod?.ProdID) {
				const existedRowIndex = D06.isProdExists({
					newValue,
					rowData,
					rowIndex,
				});
				// 檢查是否已存在
				if (existedRowIndex !== -1) {
					rowData = {
						...rowData,
						prod: null,
					};
					toast.warn(
						`「"${prod.ProdID} / ${prod.ProdData}」已存在於第 ${
							existedRowIndex + 1
						} 筆, 請重新選擇`
					);
				} else {
					prodInfoRetrieved = true;
					// console.log("qtyMap updated", qtyMap);
					rowData = {
						...rowData,
						["PackData_N"]: prod?.PackData_N || "",
					};
				}
			}
			if (!prodInfoRetrieved) {
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
			const collected = D06.transformForSubmitting(
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
				JobName: "D06",
				IDs: crud.itemData?.RemID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebD06Rep.aspx?LogKey=${
					operator?.LogKey
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
	};
};
