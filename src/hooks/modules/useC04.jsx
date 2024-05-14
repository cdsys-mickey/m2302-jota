import { useCallback, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth/AuthContext";
import CrudContext from "../../contexts/crud/CrudContext";
import C04 from "@/modules/md-C04";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { useDSG } from "../../shared-hooks/useDSG";
import { useInfiniteLoader } from "../../shared-hooks/useInfiniteLoader";
import { useWebApi } from "../../shared-hooks/useWebApi";
import Errors from "../../shared-modules/sd-errors";
import { useAppModule } from "./useAppModule";
import { useAction } from "../../shared-hooks/useAction";
import { useMemo } from "react";
import useHttpPost from "../../shared-hooks/useHttpPost";

export const useC04 = () => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;
	const itemIdRef = useRef();
	const { postToBlank } = useHttpPost();
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "C04",
	});

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
		url: "v1/purchase/restocks",
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

	// CREATE
	const promptCreating = useCallback(() => {
		const data = {
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
					url: "v1/purchase/restocks",
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
					url: "v1/purchase/restocks",
					bearer: token,
					params: {
						id: itemId,
					},
				});
				if (status.success) {
					const data = C04.transformForReading(payload.data[0]);
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

			loadItem({ id: rowData.進貨單號 });
		},
		[crud, loadItem]
	);

	const handleSupplierChanged = useCallback(
		({ setValue }) =>
			(newValue) => {
				setValue("FactData", newValue.FactData);
				setValue("Uniform", newValue.Uniform);
				setValue("TaxType", newValue.TaxType);
				setValue("FactAddr", newValue.FactAddr);
			},
		[]
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
					url: "v1/purchase/restocks",
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
			message: `確認要删除進貨單「${itemData?.GinID}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/purchase/restocks`,
						bearer: token,
						params: {
							id: itemData?.GinID,
						},
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除進貨單 ${itemData?.GinID}`);
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
		return !!rowData.SGinID && rowData.SGinID !== "*";
	}, []);

	const rqtQtyDisabled = useCallback(({ rowData }) => {
		return !!rowData.SGinID && rowData.SGinID !== "*";
	}, []);

	const supplierNameDisabled = useCallback(({ rowData }) => {
		return !!rowData.SGinID && rowData.SGinID !== "*";
	}, []);

	const handleGridChange = useCallback(
		(newValue, operations) => {
			console.log("handleGridChange", operations);
			console.log("newValue", newValue);
			const newGridData = [...newValue];
			let checkFailed = false;
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const { prod } = rowData;
							const rowIndex = operation.fromRowIndex + i;
							console.log(`prod[${rowIndex}] changed`, prod);
							newGridData[rowIndex] = {
								...rowData,
								["PackData_N"]: prod?.PackData_N || "",
								["StockQty_N"]: prod?.StockQty || "",
							};
						});
				} else if (operation.type === "DELETE") {
					// 列舉原資料
					checkFailed = prodGrid.gridData
						.slice(operation.fromRowIndex, operation.toRowIndex)
						// .forEach((rowData, i) => {
						// 	const rowIndex = operation.fromRowIndex + i;
						// 	// const { prod, SGinID } = rowData;
						// 	// if (SGinID !== "*") {
						// 	if (prodDisabled({ rowData })) {
						// 		toast.error(
						// 			`第 ${rowIndex + 1} 筆已形成進貨單不可刪除`
						// 		);
						// 		const rowIndex = operation.fromRowIndex + i;
						// 		newGridData[rowIndex] = {
						// 			...rowData,
						// 		};
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
			console.log("after changed", newGridData);
			if (!checkFailed) {
				prodGrid.setGridData(newGridData);
			}
		},
		[prodDisabled, prodGrid]
	);

	const onEditorSubmit = useCallback(
		(data) => {
			console.log("onEditorSubmit", data);
			const collected = C04.transformForSubmitting(
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
				JobName: "C04",
				IDs: crud.itemData?.GinID,
			};
			postToBlank(
				`${import.meta.env.VITE_URL_REPORT}/WebC04Rep.aspx?LogKey=${
					operator?.LogKey
				}`,
				{
					jsonData: JSON.stringify(jsonData),
				}
			);
		},
		[
			crud.itemData?.GinID,
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

	return {
		...crud,
		...listLoader,
		...appModule,
		// selectedInq,
		loadItem,
		handleSelect,
		handleSupplierChanged,
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
		handleGridChange,
		getRowKey,
		prodDisabled,
		rqtQtyDisabled,
		supplierNameDisabled,
		// 列印
		onPrintSubmit,
		onPrintSubmitError,
		// 有效日期查詢
		...expState,
		onExpDialogOpen,
		onExpDialogClose,
		cancelExpChecking,
	};
};
