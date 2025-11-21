import CrudContext from "@/contexts/crud/CrudContext";
import toastEx from "@/shared-components/ToastEx/toastEx";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useInit } from "@/shared-hooks/useInit";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext, useState } from "react";
import { useSideDrawer } from "@/hooks/useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import P42 from "./P42.mjs";
import { useRef } from "react";
import { nanoid } from "nanoid";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useMemo } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import useAction from "@/shared-modules/ActionState/useAction";
import ConfigContext from "@/contexts/config/ConfigContext";
import useJotaReports from "@/hooks/useJotaReports";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import CmsGroupTypeContext from "@/components/CmsGroupTypePicker/CmsGroupTypeContext";

const BOOKING_ORDER_FIELDS = [
	"GrpName",
	"city",
	"area",
	"GrpType",
	"custType",
	"busComp",
	"CarData_N",
	"CarQty",
	"PugAmt",
	"CarNo",
	"DrvName",
	"DrvTel",
	"tourGroup",
	"TrvData_N",
	"tourGuide",
	"CndName",
	"CndTel",
	"employee",
	"Remark",
];

const newData = {
	SalDate: new Date(),
	CarQty: 1,
	ranges: [],
	commissions: [],
};

export const useP42 = () => {
	const config = useContext(ConfigContext);
	const itemIdRef = useRef();
	const tsRef = useRef();
	const crud = useContext(CrudContext);
	const { token, operator } = useContext(AuthContext);
	const appModule = useAppModule({
		token,
		moduleId: "P42",
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();
	const { clearParams } = useContext(AppFrameContext);
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApiAsync();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	// GRID
	const createRow = useCallback(
		() => ({
			Pkey: nanoid(),
			SCustID: "",
			ECustID: "",
		}),
		[]
	);

	const rangeGrid = useDSG({
		gridId: "ranges",
		keyColumn: "id",
		skipDisabled: true,
		createRow: createRow,
	});
	const gridDisabled = useMemo(() => {
		return !crud.editing;
	}, [crud.editing]);

	// GRID
	const createCmsRow = useCallback(
		() => ({
			Pkey: nanoid(),
			cmsType: null,
		}),
		[]
	);

	const cmsGrid = useDSG({
		gridId: "commissions",
		keyColumn: "id",
		skipDisabled: true,
		createRow: createCmsRow,
	});

	const listLoader = useInfiniteLoader({
		url: "v1/cms/entries",
		bearer: token,
		initialFetchSize: 50,
		params: {
			acc: 1,
		},
	});

	const { groupTypeAlias } = useContext(CmsGroupTypeContext);

	const loadItem = useCallback(
		async ({ id, refresh }) => {
			const _id = refresh ? itemIdRef.current : id;
			try {
				if (!_id) {
					throw new Error("未指定 id");
				}
				if (!refresh) {
					itemIdRef.current = id;
				}
				crud.startReading("讀取中...", {
					id,
					params: { supressLoading: refresh },
				});
				// const encodedId = encodeURIComponent(id);
				const { status, payload, error } = await httpGetAsync({
					url: `v1/cms/entries`,
					bearer: token,
					params: {
						id: _id,
					},
				});
				console.log("payload", payload);
				if (status.success) {
					tsRef.current = payload.CheckData.TimeVal;
					const data = P42.transformForReading(
						payload.data[0],
						groupTypeAlias
					);
					rangeGrid.initGridData(data.ranges, { fillRows: 8 });
					cmsGrid.initGridData(data.commissions, { fillRows: 8 });
					crud.finishedReading({
						data,
					});
					return data;
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				crud.failedReading(err);
			}
		},
		[cmsGrid, crud, groupTypeAlias, httpGetAsync, rangeGrid, token]
	);

	const createWithBookingOrder = useCallback(
		async ({ id }) => {
			try {
				// promptCreating();
				crud.promptCreating();
				crud.startReading("讀取中...");
				const { status, payload, error } = await httpGetAsync({
					url: "v1/cms/bookings",
					bearer: token,
					params: {
						id,
					},
				});
				if (status.success) {
					const collected = P42.transformForImport(payload.data[0]);
					const mappedData = P42.mapBookingFields(
						newData,
						collected,
						BOOKING_ORDER_FIELDS
					);
					mappedData["bookingOrder"] = {
						OrdID: id,
					};
					crud.finishedReading({
						data: {
							...mappedData,
						},
					});
					// 暫存上次讀取成功的訂貨單
					// prevOrdersRef.current = data.customerOrders;

					rangeGrid.initGridData(mappedData.ranges, {
						fillRows: 8,
					});
					cmsGrid.initGridData(mappedData.commissions, {
						fillRows: 8,
					});
					toastEx.info(`已帶入預約單 ${id}`);
				} else {
					throw error ?? new Error("未預期例外");
				}
			} catch (err) {
				crud.failedReading(err);
			}
		},
		[crud, httpGetAsync, token, rangeGrid, cmsGrid]
	);

	const cancelAction = useCallback(() => {
		crud.cancelAction();
		crud.setItemData(null);
		// 清除 query params
		clearParams();
	}, [clearParams, crud]);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			cancelAction();
			setSelectedItem(rowData);

			// crud.startReading("讀取中...", { id: rowData.ComID });
			loadItem({ id: rowData.ComID });
		},
		[cancelAction, loadItem]
	);

	const confirmReturn = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
				loadItem({ refresh: true });
			},
		});
	}, [crud, dialogs, loadItem]);

	const confirmDialogClose = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄編輯?",
			onConfirm: () => {
				cancelAction();
			},
		});
	}, [cancelAction, dialogs]);

	const confirmQuitCreating = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄新增?",
			onConfirm: () => {
				cancelAction();
			},
		});
	}, [cancelAction, dialogs]);

	const handleDialogClose = useCallback(() => {
		cancelAction();
	}, [cancelAction]);

	const handleSave = useCallback(
		async ({ data, creating }) => {
			const action = creating ? "新增" : "修改";
			try {
				if (creating) {
					crud.startCreating();
				} else {
					crud.startUpdating();
				}
				const httpMethod = creating ? httpPostAsync : httpPutAsync;
				const { status, error, payload } = await httpMethod({
					url: "v1/cms/entries",
					data: data,
					bearer: token,
				});

				if (status.success) {
					const responseData = payload.data[0];
					toastEx.success(
						`佣金單號 ${responseData?.ComID} ${action}成功`
					);
					if (creating) {
						crud.finishedCreating();
						crud.cancelReading();
						loadItem({ id: responseData?.ComID });
					} else {
						crud.finishedUpdating();
						loadItem({ refresh: true });
					}
					// 重新整理
					listLoader.loadList({ refresh: true });
					tsRef.current = payload.CheckData.TimeVal;
				} else {
					throw error || new Error(`${action}增發生未預期例外`);
				}
			} catch (err) {
				if (creating) {
					crud.failedCreating(err);
					console.error("handleCreate.failed", err);
				} else {
					crud.failedUpdating(err);
					console.error("handleUpdate.failed", err);
				}
				toastEx.error(`${action}失敗`, err);
			}
		},
		[crud, httpPostAsync, httpPutAsync, listLoader, loadItem, token]
	);

	// const handleUpdate = useCallback(
	// 	async ({ data }) => {
	// 		try {
	// 			crud.startUpdating();
	// 			// const oldId = crud.itemData?.ProdID;
	// 			const { status, error } = await httpPutAsync({
	// 				url: `v1/cms/entries`,
	// 				data: data,
	// 				bearer: token,
	// 			});

	// 			if (status.success) {
	// 				toastEx.success(
	// 					`佣金單號「${data?.ComID}」修改成功`
	// 				);
	// 				crud.finishedUpdating();
	// 				loadItem({ id: data?.ComID });
	// 				// 重新整理
	// 				listLoader.loadList({ refresh: true });
	// 			} else {
	// 				throw error || new Error("修改發生未預期例外");
	// 			}
	// 		} catch (err) {
	// 			crud.failedUpdating(err);
	// 			console.error("handleUpdate.failed", err);
	// 			toastEx.error("修改失敗", err);
	// 		}
	// 	},
	// 	[crud, httpPutAsync, loadItem, listLoader, token]
	// );

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log(`P42.onEditorSubmit()`, data);

			const processed = P42.transformForEditorSubmit(
				data,
				rangeGrid.gridData,
				cmsGrid.gridData
			);
			console.log(`processed`, processed);
			if (crud.creating || crud.updating) {
				handleSave({ data: processed, creating: crud.creating });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[
			cmsGrid.gridData,
			crud.creating,
			crud.updating,
			handleSave,
			rangeGrid.gridData,
		]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`P42.onSubmitError`, err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出",
			{
				position: "top-right",
			}
		);
	}, []);

	const handlePromptCreating = useCallback(
		(e) => {
			e?.stopPropagation();

			crud.promptCreating({
				data: newData,
			});
			rangeGrid.initGridData(newData.ranges, { fillRows: 8 });
			cmsGrid.initGridData(newData.commissions, { fillRows: 8 });
		},
		[cmsGrid, crud, rangeGrid]
	);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除佣金單 ${crud.itemData?.ComID}?`,
			confirmButtonProps: {
				color: "secondary",
				variant: "contained",
			},
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/cms/entries`,
						bearer: token,
						params: {
							id: crud.itemData?.ComID,
							ts: tsRef.current,
						},
					});
					if (status.success) {
						cancelAction();
						toastEx.success(
							`成功删除佣金單 ${crud.itemData?.ComID}`
						);
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
	}, [cancelAction, crud, dialogs, httpDeleteAsync, listLoader, token]);

	const onSearchSubmit = useCallback(
		(data) => {
			handlePopperClose();
			console.log(`onSearchSubmit`, data);
			// const q = data?.q;
			listLoader.loadList({
				params: P42.transformAsQueryParams(data),
				// reset: true,
			});
		},
		[handlePopperClose, listLoader]
	);

	const onSearchSubmitError = useCallback((err) => {
		console.error(`onSearchSubmitError`, err);
	}, []);

	const handleReset = useCallback(
		({ reset }) =>
			() => {
				reset({
					lvId: "",
					lvName: "",
					lvBank: null,
				});
			},
		[]
	);

	const handleBookingOrderChange = useCallback(
		({ form }) =>
			async (newBookingOrder) => {
				if (newBookingOrder) {
					try {
						const { status, payload, error } = await httpGetAsync({
							url: "v1/cms/bookings",
							bearer: token,
							params: {
								id: newBookingOrder.OrdID,
							},
						});
						if (status.success) {
							const collected = P42.transformForImport(
								payload.data[0]
							);
							console.log("collected", collected);
							BOOKING_ORDER_FIELDS.forEach((field) => {
								form.setValue(field, collected[field]);
							});
						} else {
							throw error || new Error("未預期例外");
						}
					} catch (err) {
						toastEx.error(
							`帶出預約單 ${newBookingOrder.OrdID} 發生錯誤`,
							err
						);
					}
				} else {
					// 清空?
					const currentValues = form.getValues();
					const clearedValues = {};
					BOOKING_ORDER_FIELDS.forEach((field) => {
						const value = currentValues[field];
						if (typeof value === "string") {
							form.setValue(field, "");
						} else if (typeof value === "object") {
							clearedValues[field] = null;
							form.setValue(field, null);
						}
					});
				}
			},
		[httpGetAsync, token]
	);

	const refreshAction = useAction();

	const onRefreshSubmit = useCallback(
		({ form }) =>
			async (data) => {
				try {
					refreshAction.start();
					const collected = P42.transformForEditorSubmit(
						data,
						rangeGrid.gridData,
						cmsGrid.gridData
					);
					const { status, payload, error } = await httpPostAsync({
						url: "v1/cms/entries/refresh",
						bearer: token,
						data: collected,
					});
					if (status.success) {
						const collected = P42.transformForReading(
							payload.data[0]
						);
						console.log("collected", collected);
						[
							"SalCount",
							"TotCms_N",
							"SalTotAmt",
							"TrvTotCms",
							"CndTotCms",
							"CndPay",
							"DrvTotCms",
							"DrvPay",
							"SalTotAmtC",
							"CalcType",
							"TotCmsC_N",
							"TrvTotCmsC",
							"CndTotCmsC",
							"DrvTotCmsC",
							"CarCmsC",
						].forEach((field) => {
							form.setValue(field, collected[field]);
						});
						cmsGrid.initGridData(collected.commissions, {
							fillRows: 8,
						});
						refreshAction.finish();
					} else {
						throw error || new Error("未預期例外");
					}
				} catch (err) {
					toastEx.error(`重新計算發生錯誤`, err);
					refreshAction.fail(err);
				}
			},
		[cmsGrid, httpPostAsync, rangeGrid.gridData, refreshAction, token]
	);

	const onRefreshSubmitError = useCallback((err) => {
		console.error(`P42.onRefreshSubmitError`, err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出",
			{
				position: "top-right",
			}
		);
	}, []);

	// CmsGrid
	const onUpdateCmsRow = useCallback(
		({ fromRowIndex, updateResult }) =>
			async (rowData, index) => {
				const rowIndex = fromRowIndex + index;
				updateResult.rowIndex = rowIndex;
				const oldRowData = cmsGrid.gridData[rowIndex];

				console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);
				let processedRowData = {
					...rowData,
				};
				let dirty = false;
				if (rowData.SPCAmt != oldRowData.SPCAmt) {
					updateResult.cols.push("SPCAmt");
					dirty = true;
				}
				if (dirty) {
					updateResult.rows++;
				}
				return processedRowData;
			},
		[cmsGrid.gridData]
	);

	const onCmsGridChanged = useCallback(
		({ gridData, formData, setValue, updateResult, prevGridData }) => {
			if (updateResult.rows > 0 && updateResult.cols.includes("SPCAmt")) {
				const totalSPCAmt = gridData.reduce((sum, item) => {
					return sum + (Number(item.SPCAmt) || 0);
				}, 0);
				console.log("totalSPCAmt", totalSPCAmt);
				setValue("SalTotAmtC", totalSPCAmt);
			}
		},
		[]
	);

	const handlePcSubtotalChange = useCallback(
		({ form }) =>
			() => {
				const values = form.getValues();
				["TrvTotCmsC", "CndTotCmsC", "DrvTotCmsC"].reduce(
					(sum, field) => {
						const catTotal = parseFloat(values[field]) || 0;
						return sum + catTotal;
					},
					0
				);
			},
		[]
	);

	const reportUrl = useMemo(() => {
		return `${config.REPORT_URL}/WebP42Rep.aspx`;
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
				JobName: "P42",
				ComID: crud.itemData?.ComID,
			};
			// postToBlank(
			console.log("data", data);
			reports.open(reportUrl, data);
		},
		[crud.itemData?.ComID, operator?.CurDeptID, reportUrl, reports]
	);

	const onPrintSubmitError = useCallback((err) => {
		console.error("onPrintSubmitError", err);
	}, []);

	useInit(() => {
		crud.cancelAction();
	}, []);

	return {
		...listLoader,
		...crud,
		//override CRUD.cancelAction
		cancelAction: cancelAction,
		onSearchSubmit,
		onSearchSubmitError,
		handleSelect,
		selectedItem,
		handleDialogClose,
		confirmDialogClose,
		confirmQuitCreating,
		onEditorSubmit,
		onEditorSubmitError,
		confirmReturn,
		// CRUD overrides
		handlePromptCreating,
		confirmDelete,
		...appModule,
		...sideDrawer,
		// Popper
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
		handleReset,
		// GRID
		rangeGrid,
		gridDisabled,
		createRow,
		cmsGrid,
		createCmsRow,
		onUpdateCmsRow,
		onCmsGridChanged,
		// 欄位互動
		handleBookingOrderChange,
		onRefreshSubmit,
		onRefreshSubmitError,
		refreshWorking: refreshAction.working,
		handlePcSubtotalChange,
		onPrintSubmit,
		onPrintSubmitError,
		// 帶入預約單
		createWithBookingOrder,
	};
};
