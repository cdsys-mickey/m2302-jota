import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth/AuthContext";
import CrudContext from "../../contexts/crud/CrudContext";
import C01 from "../../modules/md-c01";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useInfiniteLoader } from "../../shared-hooks/useInfiniteLoader";
import { useWebApi } from "../../shared-hooks/useWebApi";
import Errors from "../../shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "../../shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "../../shared-hooks/useHttpPost";
import { useToggle } from "../../shared-hooks/useToggle";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { SupplierPickerComponentContainer } from "@/components/dsg/columns/supplier-picker/SupplierPickerComponentContainer";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { nanoid } from "nanoid";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import { useSideDrawer } from "../useSideDrawer";

export const useC01 = () => {
	const crud = useContext(CrudContext);
	const listLoaderCtx = useContext(InfiniteLoaderContext);
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
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

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						forId: true,
						withStock: true,
						withPurchasePackageName: true,
						// queryRequired: true,
						disableClearable: true,
						fuzzy: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
						selectOnFocus: true,
						// triggerDelay: 300,
						// filterByServer: true,
						// disableOpenOnInput: true,
						// hideControlsOnActive: false,
						// autoHighlight: true,
					})
				),
				id: "SProdID",
				title: "商品編號",
				minWidth: 140,
				maxWidth: 140,
				disabled: !crud.editing || prodDisabled,
			},
			{
				...keyColumn(
					"ProdData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				disabled: true,
				grow: 2,
			},
			{
				...keyColumn(
					"PackData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "單位",
				minWidth: 60,
				maxWidth: 60,
				disabled: true,
			},
			{
				...keyColumn("StockQty_N", createFloatColumn(2)),
				title: "當下庫存",
				minWidth: 90,
				maxWidth: 90,
				disabled: true,
			},
			{
				...keyColumn("SRqtQty", createFloatColumn(2)),
				title: "請購量",
				minWidth: 90,
				maxWidth: 90,
				disabled: !crud.editing || rqtQtyDisabled,
			},
			{
				...keyColumn("SOrdQty", createFloatColumn(2)),
				title: "採購量",
				minWidth: 90,
				maxWidth: 90,
				disabled: !crud.editing || orderQtyDisabled,
			},
			{
				...keyColumn(
					"supplier",
					optionPickerColumn(SupplierPickerComponentContainer, {
						name: "supplier",
						selectOnFocus: true,
						// triggerDelay: 300,
						// queryRequired: true,
						// filterByServer: true,
						// disableOpenOnInput: true,
						// hideControlsOnActive: false,
						forId: true,
						disableClearable: true,
						fuzzy: true,
						autoHighlight: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
					})
				),
				title: "供應商",
				minWidth: 120,
				maxWidth: 120,
				disabled: !crud.editing || supplierDisabled,
			},
			{
				...keyColumn(
					"SFactNa",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "名稱",
				grow: 2,
				disabled: !crud.editing || supplierNameDisabled,
			},
			{
				...keyColumn(
					"SOrdID",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "採購單",
				minWidth: 120,
				disabled: true,
			},
		],
		[crud.editing, orderQtyDisabled, prodDisabled, rqtQtyDisabled, supplierDisabled, supplierNameDisabled]
	);

	const gridMeta = useDSGMeta({
		data: grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

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
				toast.error(Errors.getMessage("修改失敗", err), {
					position: "top-center"
				});
			}
		},
		[crud, httpPutAsync, listLoader, loadItem, token]
	);

	const handleReset = useCallback(
		({ reset, getValues }) =>
			() => {
				const formData = getValues();
				handlePopperClose();
				listLoader.loadList({
					params: {
						ck: 2,
						of: formData.listMode?.id,
					},
				});
				reset({});
			},
		[handlePopperClose, listLoader]
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

	const handleGridProdChange = useCallback(({ rowData, rowIndex }) => {
		const { prod } = rowData;
		console.log(`prod[${rowIndex}] changed`, prod);
		let processedRowData = { ...rowData };

		processedRowData = {
			...processedRowData,
			["ProdData"]: prod?.ProdData || "",
			["PackData_N"]: prod?.PackData_N || "",
			["StockQty_N"]: prod?.StockQty || "",
		};
		return processedRowData;
	}, []);

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
								grid.gridData[rowIndex];

							let processedRowData = { ...rowData };

							if (prod?.ProdID !== oldProd?.ProdID) {
								processedRowData = handleGridProdChange({
									rowData: processedRowData,
									rowIndex,
								});
							}

							if (supplier?.FactID !== oldSupplier?.FactID) {
								processedRowData = handleGridSupplierChange({
									rowData: processedRowData,
									rowIndex,
								});
							}

							newGridData[rowIndex] = processedRowData;
						});
				} else if (operation.type === "DELETE") {
					checkFailed = grid.gridData
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
								toast.error(`不可刪除第 ${rowIndex + 1} 筆商品`, {
									position: "top-center"
								});
								return true;
							}
							return false;
						});
				} else if (operation.type === "CREATE") {
					console.log("dsg.CREATE");
					// process CREATE here
					gridMeta.toFirstColumn({ nextRow: true });
				}
			}
			if (!checkFailed) {
				console.log("after changed", newGridData);
				grid.setGridData(newGridData);
			} else {
				console.log("checkFailed");
			}
		},
		[handleGridProdChange, handleGridSupplierChange, prodDisabled, grid]
	);

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
				`${import.meta.env.VITE_URL_REPORT}/WebC01Rep.aspx?LogKey=${operator?.LogKey
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
						toast.error("沒有形成採購單，請檢查內容後重新執行", {
							position: "top-center",
						});
						transformAction.clear();
					} else {
						const ordIds = payload.OrdIDs.split("，");
						toast.success(
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
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				transformAction.fail(err);
				toast.error(Errors.getMessage("形成採購單失敗", err), {
					position: "top-center"
				});
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
						toast.error("沒有形成採購單，請檢查內容後重新執行", {
							position: "top-center",
						});
						transformListAction.clear();
					} else {
						const ordIds = payload.OrdIDs.split("，");
						toast.success(
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
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				transformListAction.fail(err);
				toast.error(Errors.getMessage("形成採購單失敗", err), {
					position: "top-center"
				});
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
		...gridMeta,
		createRow,
		grid,
		gridMeta,
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
		...sideDrawer
	};
};
