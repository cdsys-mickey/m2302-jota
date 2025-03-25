/* eslint-disable no-mixed-spaces-and-tabs */
import { DeptPickerComponentContainer } from "@/components/dsg/columns/dept-picker/DeptPickerComponentContainer";
import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toastEx";
import A01 from "@/modules/A01.mjs";
import TaxTypes from "@/modules/md-tax-types";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useAction } from "@/shared-hooks/useAction";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useInit } from "@/shared-hooks/useInit";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useMemo, useState } from "react";
import { keyColumn } from "react-datasheet-grid";
import { ProdPickerComponentContainer } from "../../components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createTextColumnEx } from "../../shared-components/dsg/columns/text/createTextColumnEx";
import { useDSGMeta } from "../../shared-hooks/dsg/useDSGMeta";
import { useSideDrawer } from "../useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useRef } from "react";

/**
 * 適用三種情境
 * 1. 商品維護 A01
 * 2. 新商品維護(覆核) - A010
 * 3. 門市櫃位維護 - A011
 */
export const useA01 = ({ mode }) => {
	const [selectedTab, setSelectedTab] = useState(A01.Tabs.INFO);
	const auth = useContext(AuthContext);
	const { token } = auth;
	const crud = useContext(CrudContext);
	const itemIdRef = useRef();
	const moduleId = useMemo(() => {
		switch (mode) {
			case A01.Mode.NEW_PROD:
				return "A010";
			case A01.Mode.STORE:
				return "AA01";
			default:
				return "A01";
		}
	}, [mode]);

	const appModule = useAppModule({
		token,
		moduleId: moduleId,
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();
	const { clearParams } = useContext(AppFrameContext);
	const asyncRef = useRef({
		dirty: false
	});

	const {
		httpGetAsync,
		httpPostAsync,
		httpPutAsync,
		httpPatchAsync,
		httpDeleteAsync,
	} = useWebApi();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const API_URL = useMemo(() => {
		switch (mode) {
			case A01.Mode.NEW_PROD:
				return "v1/new-prods";
			default:
				return "v1/prods";
		}
	}, [mode]);

	const PROD = useMemo(() => {
		return mode === A01.Mode.NEW_PROD ? "新商品" : "商品";
	}, [mode])

	const listLoader = useInfiniteLoader({
		url: API_URL,
		bearer: token,
		initialFetchSize: 50,
		parans: {
			all: 1
		}
	});

	if (!mode) {
		throw `mode 未指定`;
	}

	const createTransRow = useCallback(
		() => ({
			dept: null,
			SCost: "",
		}),
		[]
	);

	const createComboRow = useCallback(
		() => ({
			prod: null,
			SProdQty: "",
		}),
		[]
	);

	//ProdTransGrid
	const transGridDisabled = useMemo(() => {
		return !crud.editing || mode === A01.Mode.STORE;
	}, [crud.editing, mode]);

	const transColumns = useMemo(
		() => [
			{
				...keyColumn(
					"dept",
					optionPickerColumn(DeptPickerComponentContainer, {
						name: "dept",
						disableOpenOnInput: true,
						hideControlsOnActive: true,
						forId: true,
						disableClearable: true,
						selectOnFocus: true,
						autoHighlight: true,
						slotProps: {
							paper: {
								sx: {
									width: 200,
								},
							},
						},
					})
				),
				title: "門市代碼",
				minWidth: 120,
				maxWidth: 120,
				disabled: transGridDisabled,
			},
			{
				...keyColumn(
					"SDept_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "門市名稱",
				disabled: true,
				grow: 2,
			},
			{
				...keyColumn(
					"SCost",
					createFloatColumn(2, {
						// enterToNext: true
					})
				),
				title: "調撥成本",
				minWidth: 110,
				maxWidth: 110,
				disabled: transGridDisabled,
			},
		],
		[transGridDisabled]
	);

	const transGrid = useDSG({
		gridId: "trans",
		keyColumn: "dept.DeptID",
		skipDisabled: true,
		createRow: createTransRow,
	});

	const transMeta = useDSGMeta({
		data: transGrid.gridData,
		columns: transColumns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	});

	//ProdComboGrid
	const comboGridDisabled = useMemo(() => {
		return !crud.editing || mode === A01.Mode.STORE;
	}, [crud.editing, mode]);

	const comboColumns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						placeholder: "組合商品",
						typeToSearchText: "請輸入商品編號或名稱進行搜尋",
						forId: true,
						disableClearable: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
					})
				),
				title: "商品編號",
				minWidth: 170,
				maxWidth: 170,
				disabled: comboGridDisabled,
			},
			{
				...keyColumn(
					"SProdData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "商品名稱",
				disabled: true,
				grow: 2,
			},
			{
				...keyColumn("SProdQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 90,
				maxWidth: 90,
				disabled: comboGridDisabled,
			},
		],
		[comboGridDisabled]
	);
	const comboGrid = useDSG({
		gridId: "combo",
		keyColumn: "prod.ProdID",
		createRow: createComboRow,
	});

	const comboMeta = useDSGMeta({
		data: comboGrid.gridData,
		columns: comboColumns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	});



	const loadItem = useCallback(
		async ({ id, refresh = false } = {}) => {
			const itemId = refresh ? itemIdRef.current : id;
			if (!itemId) {
				throw new Error("未指定 id");
			}
			if (!refresh) {
				itemIdRef.current = id;
				crud.startReading("讀取中...", { id });
			}
			try {
				const { status, payload, error } = await httpGetAsync({
					url: API_URL,
					data: {
						id: itemId,
					},
					bearer: token,
				});
				console.log("payload", payload);
				if (status.success) {
					asyncRef.current.dirty = false;

					const data = A01.transformForReading(payload.data[0]);

					transGrid.initGridData(data.trans);
					comboGrid.initGridData(data.combo);

					crud.doneReading({
						data: data,
					});
				} else {
					throw error ?? new Error("讀取失敗");
				}
			} catch (err) {
				if (err.status == 404) {
					crud.failReading({
						...err,
						message: `找不到${mode === A01.Mode.NEW_PROD ? "新" : ""}商品 ${id}`
					});
				} else {
					crud.failReading(err);
				}
			}
		},
		[comboGrid, crud, httpGetAsync, mode, token, transGrid, API_URL]
	);

	const confirmReturn = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
				if (asyncRef.current.dirty) {
					loadItem({ refresh: true });
				}
				asyncRef.current.dirty = false;
			},
		});
	}, [crud, dialogs, loadItem]);

	const cancelAction = useCallback(() => {
		crud.cancelAction();
		// 清除 query params
		clearParams();
	}, [clearParams, crud]);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			setSelectedTab(A01.Tabs.INFO);
			// crud.cancelAction();
			cancelAction();
			setSelectedItem(rowData);
			loadItem({ id: rowData.ProdID });
		},
		[cancelAction, loadItem]
	);

	const selectById = useCallback(
		async (id) => {
			setSelectedTab(A01.Tabs.INFO);
			// crud.cancelAction();
			// cancelAction();
			const item = {
				ProdID: id,
			};
			setSelectedItem(item);
			loadItem({ id });
		},
		[loadItem]
	);

	const confirmQuitCreating = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄新增?",
			onConfirm: () => {
				// crud.cancelAction();
				cancelAction();
			},
		});
	}, [cancelAction, dialogs]);

	const confirmDialogClose = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄編輯?",
			onConfirm: () => {
				// crud.cancelAction();
				cancelAction();
			},
		});
	}, [cancelAction, dialogs]);

	const handleDialogClose = useCallback(() => {
		// crud.cancelAction();
		cancelAction();
	}, [cancelAction]);

	const handleCreate = useCallback(
		async ({ data }) => {
			try {
				crud.startCreating();
				const { status, error } = await httpPostAsync({
					url: API_URL,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toastEx.success(
						`${mode === A01.Mode.NEW_PROD ? "新" : ""}商品「${data?.ProdData
						}」新增成功`
					);
					crud.doneCreating();
					crud.cancelReading();
					// 重新整理
					listLoader.loadList({ refresh: true });
				} else {
					if (error.code) {
						switch (error.code) {
							case 410:
								setSelectedTab(A01.Tabs.TRANS);
								break;
							case 420:
								setSelectedTab(A01.Tabs.COMBO);
								break;
							case 409:
								setSelectedTab(A01.Tabs.INFO);
								break;
							default:
							case 422:
								setSelectedTab(A01.Tabs.INFO);
								break;
						}
					}
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				crud.failCreating(err);
				console.error("handleCreate.failed", err);
				toastEx.error("新增失敗", err);
			}
		},
		[crud, httpPostAsync, listLoader, mode, token, API_URL]
	);

	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				// const oldId = crud.itemData?.ProdID;
				const { status, error } = await httpPutAsync({
					url: API_URL,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toastEx.success(
						`${mode === A01.Mode.NEW_PROD ? "新" : ""}商品「${data?.ProdData
						}」修改成功`
					);
					crud.doneUpdating();
					// crud.cancelReading();
					loadItem({ id: data?.ProdID });
					// 重新整理
					listLoader.loadList({
						refresh: true,
					});
				} else {
					throw error || new Error("修改發生未預期例外");
				}
			} catch (err) {
				crud.failUpdating(err);
				asyncRef.current.dirty = true;
				console.error("handleUpdate.failed", err);
				toastEx.error("修改失敗", err);
			}
		},
		[crud, httpPutAsync, API_URL, token, mode, loadItem, listLoader]
	);

	const onCounterSubmit = useCallback(
		async (data) => {
			console.log(`A01.onCounterSubmit()`, data);
			const processed = A01.transformForCounterSubmit(data);
			console.log(`processed`, processed);
			try {
				crud.startUpdating();
				const { status, error } = await httpPatchAsync({
					url: `v1/prods/counter`,
					data: processed,
					bearer: token,
				});
				if (status.success) {
					toastEx.success(`商品「${data?.ProdData}」已成功更新`);
					crud.doneUpdating();
					loadItem({ id: processed?.ProdID });
				} else {
					throw error || new Error("更新失敗");
				}
			} catch (err) {
				crud.failUpdating(err);
				console.error("onCounterSubmit.failed", err);
				toastEx.error("更新失敗", err);
			}
		},
		[crud, httpPatchAsync, loadItem, token]
	);

	const onCounterSubmitError = useCallback((err) => {
		console.error(`A01.onCounterSubmitError`, err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
		);
	}, []);

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log(`A01.onEditorSubmit()`, data);
			console.log(`transGrid.gridData`, transGrid.gridData);
			console.log(`comboGrid.gridData`, comboGrid.gridData);
			const processed = A01.transformForEditorSubmit(
				data,
				transGrid.gridData,
				comboGrid.gridData
			);
			console.log(`processed`, processed);
			if (crud.creating) {
				handleCreate({ data: processed });
			} else if (crud.updating) {
				handleUpdate({ data: processed });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[
			comboGrid.gridData,
			crud.creating,
			crud.updating,
			handleCreate,
			handleUpdate,
			transGrid.gridData,
		]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`A01.onSubmitError`, err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正標註錯誤的欄位後，再重新送出"
		);
	}, []);

	const resetGridData = useCallback(
		(data) => {
			transGrid.setGridData(data?.trans || [], {
				reset: true,
				commit: true,
			});
			comboGrid.setGridData(data?.combo || [], {
				reset: true,
				commit: true,
			});
		},
		[comboGrid, transGrid]
	);

	const handlePromptCreating = useCallback(
		(e) => {
			e?.stopPropagation();
			setSelectedTab(A01.Tabs.INFO);
			const data = {
				taxType: TaxTypes.findById("T"),
				trans: transGrid.fillRows({}),
				combo: comboGrid.fillRows({}),
			};
			crud.promptCreating({
				data,
			});
			transGrid.initGridData(data.trans);
			comboGrid.initGridData(data.combo);
		},
		[comboGrid, crud, transGrid]
	);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除商品「${crud.itemData?.ProdData}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url: API_URL,
						bearer: token,
						params: {
							id: crud.itemData?.ProdID
						},
					});
					// crud.cancelAction();
					cancelAction();
					if (status.success) {
						toastEx.success(
							`成功删除${PROD}${crud.itemData.ProdData}`
						);
						listLoader.loadList({
							refresh: true,
						});
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
	}, [API_URL, PROD, cancelAction, crud, dialogs, httpDeleteAsync, listLoader, token]);

	// PRINT
	const printAction = useAction();
	const printing = useMemo(() => {
		return !!printAction.state;
	}, [printAction.state]);

	const promptPrint = useCallback(() => {
		printAction.prompt();
	}, [printAction]);

	const cancelPrint = useCallback(() => {
		printAction.clear();
	}, [printAction]);

	// REVIEW
	const reviewAction = useAction();
	const reviewing = useMemo(() => {
		return !!reviewAction.state;
	}, [reviewAction.state]);

	const handleReview = useCallback(
		async ({ value }) => {
			console.log(`handleReview`, value);
			try {
				const { status, error } = await httpPatchAsync({
					url: `${API_URL}/reviewed`,
					data: {
						...crud.itemData,
						OfficialProdID: value,
					},
					bearer: token,
				});
				if (status.success) {
					reviewAction.clear();
					// crud.cancelAction();
					cancelAction();
					listLoader.loadList({
						refresh: true,
					});
					toastEx.success(
						`商品「${crud.itemData?.ProdData}」已覆核成功`
					);
				} else {
					throw error || new Error("發生未預期例外");
				}
			} catch (err) {
				toastEx.error("覆核失敗", err);
			}
		},
		[API_URL, cancelAction, crud.itemData, httpPatchAsync, listLoader, reviewAction, token]
	);

	const promptReview = useCallback(() => {
		dialogs.prompt({
			title: "確認覆核",
			label: "正式商品編號",
			message: "請輸入正式商品編號",
			onConfirm: handleReview,
			value: crud.itemData?.ProdID || "",
			confirmText: "通過",
		});
		reviewAction.prompt();
	}, [crud.itemData?.ProdID, dialogs, handleReview, reviewAction]);

	const cancelReview = useCallback(() => {
		reviewAction.cancel();
	}, [reviewAction]);

	const startReview = useCallback(() => {
		reviewAction.start();
	}, [reviewAction]);

	const finishReview = useCallback(() => {
		reviewAction.finish();
	}, [reviewAction]);

	const failReview = useCallback(() => {
		reviewAction.fail();
	}, [reviewAction]);

	// SEARCH
	const onSearchSubmit = useCallback(
		(payload) => {
			handlePopperClose();
			console.log(`onSearchSubmit`, payload);
			listLoader.loadList({
				params: A01.transformAsQueryParams(payload),
			});
		},
		[handlePopperClose, listLoader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error(`onSearchSubmitError`, err);
	}, []);

	const handleTabChange = useCallback((e, newValue) => {
		setSelectedTab(newValue);
	}, []);

	// TRANS GRID
	const handleGridDeptChange = useCallback(({ rowData }) => {
		return {
			...rowData,
			["SDept_N"]: rowData?.dept?.DeptName || "",
		};
	}, []);

	const handleTransGridChange = useCallback(
		(newValue, operations) => {
			const newGridData = [...newValue];
			let checkFailed = false;
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					console.log("dsg.UPDATE");
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const rowIndex = operation.fromRowIndex + i;
							const oldRowData = transGrid.gridData[rowIndex];
							let processedRowData = { ...rowData };
							// process UPDATE here
							if (
								rowData.dept?.DeptID !== oldRowData.dept?.DeptID
							) {
								processedRowData = handleGridDeptChange({
									rowData: processedRowData,
								});

								if (
									rowData.dept &&
									transGrid.isDuplicating(rowData, newValue)
								) {
									toastEx.error(
										`「${rowData.dept?.DeptName}」已存在, 請選擇其他門市`
									);
									setTimeout(() => {
										transMeta.setActiveCell({
											col: 0,
											row: rowIndex,
										});
									});
									checkFailed = true;
								}
							}
							newGridData[rowIndex] = processedRowData;
						});
				} else if (operation.type === "DELETE") {
					console.log("dsg.DELETE");
					checkFailed = transGrid.gridData
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.some((rowData, i) => {
							// process DELETE check here
							// if(xxxDisabled(rowData)){ return true }
							return false;
						});
				} else if (operation.type === "CREATE") {
					console.log("dsg.CREATE");
					// process CREATE here
					transMeta.toFirstColumn({ nextRow: true });
				}
			}
			if (!checkFailed) {
				transGrid.setGridData(newGridData);
			}
		},
		[handleGridDeptChange, transGrid, transMeta]
	);
	// const handleTransGridChange = useCallback(
	// 	(newValue, operations) => {
	// 		const operation = operations[0];
	// 		console.log("operation", operation);
	// 		console.log("newValue", newValue);

	// 		if (operation.type === "UPDATE") {
	// 			const rowIndex = operation.fromRowIndex;
	// 			const rowData = newValue[rowIndex];
	// 			const row = { rowIndex, rowData };
	// 			if (
	// 				rowData.dept &&
	// 				transGrid.isDuplicating(rowData, newValue)
	// 			) {
	// 				transGrid.spreadOnRow(
	// 					row.rowIndex,
	// 					{
	// 						dept: null,
	// 					},
	// 					{
	// 						data: newValue,
	// 					}
	// 				);
	// 				toastEx.error(
	// 					`「${rowData.dept?.DeptName}」已存在, 請選擇其他門市`
	// 				);
	// 				return;
	// 			}c
	// 		}
	// 		transGrid.propagateGridChange(newValue, operations);
	// 	},
	// 	[transGrid]
	// );

	// COMBO GRID
	const handleGridProdChange = useCallback(({ rowData }) => {
		const { prod } = rowData;
		return {
			...rowData,
			["SProdData"]: prod?.ProdData || "",
		};
	}, []);



	const handleComboGridChange = useCallback(
		(newValue, operations) => {
			const newGridData = [...newValue];
			let checkFailed = false;
			for (const operation of operations) {
				if (operation.type === "UPDATE") {
					console.log("dsg.UPDATE");
					newValue
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.forEach((rowData, i) => {
							const rowIndex = operation.fromRowIndex + i;
							const ogRowData = comboGrid.gridData[rowIndex];
							let processedRowData = { ...rowData };

							if (
								rowData.prod?.ProdID !== ogRowData.prod?.ProdID
							) {
								processedRowData = handleGridProdChange({
									rowData: processedRowData,
								});

								if (
									rowData.prod &&
									comboGrid.isDuplicating(rowData, newValue)
								) {
									toastEx.error(
										`「${rowData.prod?.ProdData}」已存在, 請選擇其他商品`
									);
									setTimeout(() => {
										comboMeta.setActiveCell({
											col: 0,
											row: rowIndex,
										});
									});
									checkFailed = true;
								}
							}
							newGridData[rowIndex] = processedRowData;
						});
				} else if (operation.type === "DELETE") {
					console.log("dsg.DELETE");
					checkFailed = comboGrid.gridData
						.slice(operation.fromRowIndex, operation.toRowIndex)
						.some((rowData, i) => {
							// process DELETE check here
							// if(xxxDisabled(rowData)){ return true }
							return false;
						});
				} else if (operation.type === "CREATE") {
					console.log("dsg.CREATE");
					// process CREATE here
					comboMeta.toFirstColumn({ nextRow: true });
				}
			}
			if (!checkFailed) {
				comboGrid.setGridData(newGridData);
			}
		},
		[comboGrid, comboMeta, handleGridProdChange]
	);

	// const handleComboGridChangeOld = useCallback(
	// 	(newValue, operations) => {
	// 		const operation = operations[0];
	// 		console.log("operation", operation);
	// 		console.log("newValue", newValue);

	// 		if (operation.type === "UPDATE") {
	// 			const rowIndex = operation.fromRowIndex;
	// 			const rowData = newValue[rowIndex];
	// 			const row = { rowIndex, rowData };
	// 			if (
	// 				rowData.prod &&
	// 				comboGrid.isDuplicating(rowData, newValue)
	// 			) {
	// 				comboGrid.spreadOnRow(
	// 					row.rowIndex,
	// 					{
	// 						dept: null,
	// 					},
	// 					{
	// 						data: newValue,
	// 					}
	// 				);
	// 				toastEx.error(
	// 					`「${rowData.prod?.ProdData}」已存在, 請選擇其他商品`
	// 				);
	// 				return;
	// 			}
	// 		}
	// 		comboGrid.propagateGridChange(newValue, operations);
	// 	},
	// 	[comboGrid]
	// );

	// const handleTransGridDeptBlur = useCallback(({cell}) => {
	// 	const {col, row} =  cell;
	// 	const rowData = transGrid.getRowDataByIndex(row);
	// 	switch (col) {
	// 		case 1: //門市
	// 			if (transGrid.isKeyDuplicated(rowData)) {
	// 				toastEx.error(`門市「${rowData.dept?.DeptName}」不可重複選擇`);
	// 				transGrid.spreadOnRow(row, newValue, {
	// 					dept: null,
	// 				});
	// 			}
	// 			console.log(`duplicated`);
	// 			break;
	// 		default:
	// 			break;
	// 	}

	// }, []);

	const handleReset = useCallback(
		({ reset }) =>
			() => {
				// handlePopperClose();
				// listLoader.loadList({
				// 	params: {},
				// });
				reset({
					lvId: "",
					lvBarcode: "",
					lvName: "",
					lvCatL: null,
					lvCatM: null,
					lvCatS: null,
					lvCounter: null,
					lvCmsType: null
				});
			},
		[]
	);



	const transTabDisabled = useMemo(() => {
		return crud.editing && mode === A01.Mode.STORE;
	}, [crud.editing, mode]);

	const comboTabDisabled = useMemo(() => {
		return crud.editing && mode === A01.Mode.STORE;
	}, [crud.editing, mode]);

	const handleInvDataFocused = useCallback(({ setValue, getValues }) => (e) => {
		console.log("handleInvDataFocused", e);
		if (!e.target.value) {
			const prodData = getValues("ProdData");
			setValue("InvData", prodData);
		}
	}, []);

	useInit(() => {
		crud.cancelAction();
	}, []);

	return {
		...listLoader,
		selectById,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,

		onSearchSubmit,
		onSearchSubmitError,
		mode,
		handleSelect,
		selectedItem,
		...crud,
		//override CRUD
		cancelAction: cancelAction,
		handleDialogClose,
		confirmDialogClose,
		confirmQuitCreating,
		onEditorSubmit,
		onEditorSubmitError,
		confirmReturn,
		resetGridData,
		// CRUD OVERRIDES
		handlePromptCreating,
		confirmDelete,
		// REVIEW
		reviewing,
		promptReview,
		cancelReview,
		startReview,
		finishReview,
		failReview,

		// ProdTransGrid
		transGrid,
		transMeta,
		// setTransGridRef: transGrid.setGridRef,
		// transGridData: transGrid.gridData,
		handleTransGridChange,
		transGridDisabled,
		// ProdComboGrid
		comboGrid,
		comboMeta,
		setComboGridRef: comboGrid.setGridRef,
		comboGridData: comboGrid.gridData,
		handleComboGridChange,
		comboGridDisabled,

		// Store
		onCounterSubmit,
		onCounterSubmitError,
		// module
		...appModule,
		// PRINT
		printing,
		promptPrint,
		cancelPrint,
		// TAB
		selectedTab,
		handleTabChange,
		setSelectedTab,
		handleReset,
		createTransRow,
		createComboRow,
		transTabDisabled,
		comboTabDisabled,
		...sideDrawer,
		handleInvDataFocused
	};
};
