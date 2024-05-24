import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth/AuthContext";
import CrudContext from "../../contexts/crud/CrudContext";
import C01 from "../../modules/md-c01";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { useDSG } from "../../shared-hooks/useDSG";
import { useInfiniteLoader } from "../../shared-hooks/useInfiniteLoader";
import { useWebApi } from "../../shared-hooks/useWebApi";
import Errors from "../../shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "../../shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "../../shared-hooks/useHttpPost";

export const useC01 = () => {
	const crud = useContext(CrudContext);
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "C01",
	});

	const [selected, setSelected] = useState();

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpDeleteAsync,
		httpPatchAsync,
	} = useWebApi();
	const dialogs = useContext(DialogsContext);

	const listLoader = useInfiniteLoader({
		url: "v1/purchase/requests",
		bearer: token,
		initialFetchSize: 50,
	});

	const prodGrid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
	});

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
				console.error("handleUpdate.failed", err);
				toast.error(Errors.getMessage("修改失敗", err));
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	const onSearchSubmit = useCallback((data) => {
		console.log("onSearchSubmit", data);
	}, []);

	const onSearchSubmitError = useCallback((err) => {
		console.error("onSearchSubmitError", err);
	}, []);

	const prodDisabled = useCallback(({ rowData }) => {
		return (
			!!rowData.Pkey && rowData.Pkey.length === 36 && !!rowData.SRqtQty
		);
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

	const supplierNameDisabled = useCallback(({ rowData }) => {
		return rowData.SOrdID !== "*" || rowData.supplier?.FactID !== "*";
	}, []);

	const handleGridChange = useCallback(
		(newValue, operations) => {
			console.log("handleGridChange", operations);
			const newGridData = [...newValue];
			let checkFailed = false;
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const { prod, supplier } = rowData;
							const rowIndex = operation.fromRowIndex + i;

							const { prod: oldProd, supplier: oldSupplier } =
								prodGrid.gridData[rowIndex];

							let processedRowData = { ...rowData };

							if (prod?.ProdID !== oldProd?.ProdID) {
								console.log(`prod[${rowIndex}] changed`, prod);

								processedRowData = {
									...processedRowData,
									["PackData_N"]: prod?.PackData_N || "",
									["StockQty_N"]: prod?.StockQty || "",
								};
							}

							if (supplier?.FactID !== oldSupplier?.FactID) {
								console.log(
									`supplier[${rowIndex}] changed`,
									supplier
								);

								processedRowData = {
									...processedRowData,
									["SFactNa"]: supplier?.FactData || "",
								};
							}

							newGridData[rowIndex] = processedRowData;
						});
				} else if (operation.type === "DELETE") {
					checkFailed = prodGrid.gridData
						.slice(operation.fromRowIndex, operation.toRowIndex)
						// .forEach((rowData, i) => {
						// 	// const { prod } = rowData;
						// 	const rowIndex = operation.fromRowIndex + i;
						// 	if (prodDisabled({ rowData })) {
						// 		toast.error(
						// 			`不可刪除第 ${rowIndex + 1} 筆商品`
						// 		);
						// 		return;
						// 	}
						// });
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
			if (!checkFailed) {
				console.log("after changed", newGridData);
				prodGrid.setGridData(newGridData);
			} else {
				console.log("checkFailed");
			}
		},
		[prodDisabled, prodGrid]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C01.transformForSubmitting(
				data,
				prodGrid.gridData
			);
			console.log("collected", collected);
			if (crud.updating) {
				handleUpdate({ data: collected });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[crud.updating, handleUpdate, prodGrid.gridData]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error("onEditorSubmitError", err);
	}, []);

	const getRowKey = useCallback(({ rowData, rowIndex }) => {
		return `${rowData?.Pkey || rowIndex}`;
	}, []);

	const onPrintSubmit = useCallback(
		(data) => {
			console.log("onPrintSubmit", data);
			const jsonData = {
				...(data.outputType && {
					Action: data.outputType.id,
				}),
				DeptID: operator?.CurDeptID,
				JobName: "C01",
				IDs: crud.itemData?.RqtID,
			};
			console.log("jsonData", jsonData);
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebC01Rep.aspx?LogKey=${
					operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.RqtID,
			operator?.CurDeptID,
			operator?.LogKey,
			postToBlank,
		]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	// 轉採購單
	const transformAction = useAction();

	const handleTransform = useCallback(async () => {}, []);

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
						ep: data.employee?.CodeID,
					},
				});
				if (status.success) {
					console.log("to-order.payload", payload);

					if (!payload.OrdIDs) {
						toast.warn("沒有形成採購單，請檢查內容後重新執行");
						transformAction.clear();
					} else {
						const ordIds = payload.OrdIDs.split("，");
						toast.success(
							`成功形成 ${
								ordIds.length
							} 張採購單，單號：${ordIds.join("、")}`
						);
						transformAction.finish();
						crud.cancelAction();
						listLoader.loadList({
							refresh: true,
						});
					}
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				transformAction.fail(err);
				toast.error(Errors.getMessage("形成採購單失敗", err));
			}
		},
		[crud, httpPatchAsync, listLoader, token, transformAction]
	);

	const onTransformSubmitError = useCallback((err) => {
		console.error("onTransformSubmitError", err);
	}, []);

	return {
		...crud,
		...listLoader,
		...appModule,
		selected,
		loadItem,
		handleSelect,
		onSearchSubmit,
		onSearchSubmitError,
		confirmQuitCreating,
		confirmQuitUpdating,
		confirmReturnReading,
		onEditorSubmit,
		onEditorSubmitError,
		// Grid
		...prodGrid,
		handleGridChange,
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
	};
};
