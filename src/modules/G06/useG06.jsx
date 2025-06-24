import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "@/helpers/toastEx";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useInfiniteLoader } from "@/shared-hooks/useInfiniteLoader";
import { useInit } from "@/shared-hooks/useInit";
import { useToggle } from "@/shared-hooks/useToggle";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useState } from "react";
import { useSideDrawer } from "@/hooks/useSideDrawer";
import { useAppModule } from "@/hooks/jobs/useAppModule";
import G06 from "./G06.mjs";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useMemo } from "react";
import { useRef } from "react";
import Forms from "@/shared-modules/Forms.mjs";

export const useG06 = ({ token }) => {
	const itemIdRef = useRef();
	const crud = useContext(CrudContext);
	const appModule = useAppModule({
		token,
		moduleId: "G06",
	});
	// 側邊欄
	const sideDrawer = useSideDrawer();
	const { httpGetAsync, httpPostAsync, httpPutAsync, httpDeleteAsync } =
		useWebApi();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);
	const asyncRef = useRef({
		// 前期餘額
		PreAmt: 0,
		// 本期應收
		RcvAmt: 0,
		// 本期收款
		CollAmt: 0,
		// 本期餘額
		RemAmt: 0,
		// 本期收現
		CashAmt: 0,
		// 本期折讓
		DnsAmt: 0,
		// 本期收票
		ChkAmt: 0,

		// 收沖差額
		// 單據沖銷
		CutAmt: 0,
		DiffAmt: 0,
		dirty: false
	})

	const [
		popperOpen,
		handlePopperToggle,
		handlePopperOpen,
		handlePopperClose,
	] = useToggle(false);

	const listLoader = useInfiniteLoader({
		url: "v1/sales/recv-account/rcpt-records",
		bearer: token,
		initialFetchSize: 50,
		params: {
			opts: 1
		}
	});

	const createCashRow = useCallback(() => ({
		RcvDate: null,
		CashAmt: "",
		DnsAmt: "",
	}), []);
	const createChkRow = useCallback(() => ({
		ChkAmt: "",
		BankID: null,
		BankAcct: "",
		ChkAcc: "",
		DueDate: null,
		IssueDate: null,
	}), []);

	const createDocRow = useCallback(() => ({
		DocType: null,
		DocID: "",
		DocDate: null,
		SalAmt: "",
		RetAmt: "",
		AdjAmt: "",
		PreNotes: "",
		WoNotes: "",
	}), []);

	const cashGrid = useDSG({
		gridId: "cash",
		keyColumn: "dept.DeptID",
		skipDisabled: true,
		createRow: createCashRow,
	});
	const cashGridDisabled = useMemo(() => {
		return !crud.editing;
	}, [crud.editing]);

	const chkGrid = useDSG({
		gridId: "chk",
		keyColumn: "dept.DeptID",
		skipDisabled: true,
		createRow: createChkRow,
	});
	const chkGridDisabled = useMemo(() => {
		return !crud.editing;
	}, [crud.editing]);


	const onUpdateDocRow = useCallback(({ fromRowIndex, formData, oldValue, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		updateResult.rowIndex = rowIndex;

		const oldRowData = oldValue[rowIndex];
		console.log(`開始處理 Doc 第 ${rowIndex + 1} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
		let dirty = false;
		// prod
		if (processedRowData.WoNotes !== oldRowData.WoNotes) {
			updateResult.cols.push("WoNotes")
			dirty = true;
		}

		if (dirty) {
			updateResult.rows++;
		}
		return processedRowData;
	}, []);

	const syncNumbers = useCallback(({ setValue, received = true, remaining = true, diff = true }) => {

		//"本期收款" = "收現金額" + "折讓金額" + "票據金額"
		asyncRef.current.CollAmt = asyncRef.current.CashAmt + asyncRef.current.DnsAmt + asyncRef.current.ChkAmt;
		if (received) {
			setValue("CollAmt", Forms.formatMoney(asyncRef.current.CollAmt, 2));
		}

		//"本期餘額" = "前期餘額" + "本期應收" - "本期收款"
		asyncRef.current.RemAmt = asyncRef.current.PreAmt + asyncRef.current.RcvAmt - asyncRef.current.CollAmt;
		if (remaining) {
			setValue("RemAmt", Forms.formatMoney(asyncRef.current.RemAmt, 2));
		}

		//"收沖差額" = "本期收款" - "單據沖銷"
		asyncRef.current.DiffAmt = asyncRef.current.CollAmt - asyncRef.current.CutAmt;
		if (diff) {
			setValue("DiffAmt", Forms.formatMoney(asyncRef.current.DiffAmt, 2));
		}
	}, []);

	const onDocGridChanged = useCallback(({ gridData, setValue, updateResult }) => {
		console.log("onDocGridChanged", gridData);
		//
		if (updateResult.cols.includes("WoNotes")) {
			console.log("before reduce", gridData);
			const totals = gridData.reduce((acc, row) => ({
				CutAmt: acc.CutAmt + (row.WoNotes ? (
					row.DocID?.DocType == 1 ? Number(row.SalAmt) :
						row.DocID?.DocType == 2 ? 0 - Number(row.RetAmt) :
							row.DocID?.DocType == 3 ? Number(row.AdjAmt) : 0
				) : 0),
			}), { CutAmt: 0 });

			console.log("totals", totals);
			asyncRef.current.CutAmt = totals.CutAmt ?? 0;
			setValue("CutAmt", Forms.formatMoney(asyncRef.current.CutAmt, 2));

			//"收沖差額" = "本期收款" - "單據沖銷"
			// asyncRef.current.DiffAmt = asyncRef.current.CollAmt - asyncRef.current.CutAmt;
			// setValue("DiffAmt", Forms.formatMoney(asyncRef.current.DiffAmt, 2));
			syncNumbers({ setValue, received: false, remaining: false });
		}
	}, [syncNumbers]);

	const docGrid = useDSG({
		gridId: "doc",
		keyColumn: "dept.DeptID",
		skipDisabled: true,
		createRow: createDocRow,
		onUpdateRow: onUpdateDocRow,
		onGridChanged: onDocGridChanged
	});

	const docGridDisabled = useMemo(() => {
		return !crud.editing;
	}, [crud.editing]);

	const loadItem = useCallback(
		async ({ id, refresh = false }) => {
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
					url: `v1/sales/recv-account/rcpt-records`,
					bearer: token,
					params: {
						id: itemId
					},
				});
				console.log("payload", payload);
				if (status.success) {
					const data = G06.transformForReading(payload.data[0]);
					cashGrid.initGridData(data.cashGridData);
					chkGrid.initGridData(data.chkGridData);
					docGrid.initGridData(data.docGridData);
					asyncRef.current = {
						PreAmt: data.PreAmt,
						RcvAmt: data.RcvAmt,
						CollAmt: data.CollAmt,
						RemAmt: data.RemAmt,
						CashAmt: data.CashAmt,
						DnsAmt: data.DnsAmt,
						ChkAmt: data.ChkAmt,
						CutAmt: data.CutAmt,
						DiffAmt: data.DiffAmt,
						dirty: false
					}
					crud.doneReading({
						data,
					});
				} else {
					throw error || new Error("讀取失敗");
				}
			} catch (err) {
				crud.failReading(err);
			}
		},
		[cashGrid, chkGrid, crud, docGrid, httpGetAsync, token]
	);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			setSelectedItem(rowData);
			const id = G06.buildId(rowData);
			crud.startReading("讀取中...", { id });
			loadItem({ id });
		},
		[crud, loadItem]
	);

	const confirmReturn = useCallback(() => {
		dialogs.confirm({
			message: "確認要結束編輯?",
			onConfirm: () => {
				crud.cancelUpdating();
				loadItem({ refresh: true });
				asyncRef.current.dirty = false;
			},
		});
	}, [crud, dialogs, loadItem]);

	const confirmDialogClose = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄編輯?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const confirmQuitCreating = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄新增?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const handleDialogClose = useCallback(() => {
		crud.cancelAction();
	}, [crud]);

	// const handleSave = useCallback(
	// 	async ({ data }) => {
	// 		try {
	// 			crud.creating ? crud.startCreating() : crud.startUpdating();
	// 			const httpMethod = crud.creating ? httpPostAsync : httpPutAsync;
	// 			const { status, error } = await httpMethod({
	// 				url: "v1/sales/recv-account/rcpt-records",
	// 				data: data,
	// 				bearer: token,
	// 			});

	// 			if (status.success) {
	// 				toastEx.success(
	// 					`收款單「${G06.buildName(data)}」${crud.creating ? "新增" : "修改"}成功`
	// 				);
	// 				crud.doneCreating();
	// 				crud.cancelReading();
	// 				// 重新整理
	// 				listLoader.loadList({ refresh: true });
	// 			} else {
	// 				throw error || new Error(`${crud.creating ? "新增" : "修改"}發生未預期例外`);
	// 			}
	// 		} catch (err) {
	// 			crud.failCreating(err);
	// 			console.error("handleCreate.failed", err);
	// 			toastEx.error("新增失敗", err);
	// 		}
	// 	},
	// 	[crud, httpPostAsync, httpPutAsync, listLoader, token]
	// );

	const handleUpdate = useCallback(
		async ({ data }) => {
			try {
				crud.startUpdating();
				// const oldId = crud.itemData?.ProdID;
				const { status, error } = await httpPutAsync({
					url: `v1/sales/recv-account/rcpt-records`,
					data: data,
					bearer: token,
				});

				if (status.success) {
					toastEx.success(
						`收款單「${data?.AccYM}第${data?.Stage}期-${data.CustData_N}」更新成功`
					);
					crud.doneUpdating();
					loadItem({ id: data?.LogID });
					// 重新整理
					listLoader.loadList({ refresh: true });
				} else {
					throw error || new Error("更新發生未預期例外");
				}
			} catch (err) {
				crud.failUpdating(err);
				asyncRef.current.dirty = true;
				console.error("handleUpdate.failed", err);
				toastEx.error("更新失敗", err);
			}
		},
		[crud, httpPutAsync, loadItem, listLoader, token]
	);

	const onEditorSubmit = useCallback(
		async (data) => {
			console.log(`G06.onEditorSubmit()`, data);

			const processed = G06.transformForEditorSubmit(data, cashGrid.gridData, chkGrid.gridData, docGrid.gridData);
			console.log(`processed`, processed);
			if (crud.updating) {
				handleUpdate({ data: processed });
			} else {
				console.error("UNKNOWN SUBMIT TYPE");
			}
		},
		[cashGrid.gridData, chkGrid.gridData, crud.updating, docGrid.gridData, handleUpdate]
	);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`G06.onSubmitError`, err);
		toastEx.error(
			"資料驗證失敗, 請檢查並修正未填寫的必填欄位(*)後，再重新送出"
			, {
				position: "top-right"
			});
	}, []);

	const handlePromptCreating = useCallback(
		(e) => {
			e?.stopPropagation();
			const data = {
				trans: [],
				combo: [],
			};
			crud.promptCreating({
				data,
			});
		},
		[crud]
	);

	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認删除收款單「${G06.buildName(crud.itemData)}」?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(crud.itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/sales/recv-account/rcpt-records`,
						bearer: token,
						params: {
							id: crud.itemData?.LogID
						}
					});
					if (status.success) {
						crud.cancelAction();
						toastEx.success(
							`成功删除收款單 ${G06.buildName(crud.itemData)}`
						);
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
	}, [crud, dialogs, httpDeleteAsync, listLoader, token]);

	const onSearchSubmit = useCallback(
		(data) => {
			handlePopperClose();
			console.log(`onSearchSubmit`, data);
			// const q = data?.q;
			listLoader.loadList({
				params: G06.transformAsQueryParams(data),
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
					lvBank: null
				});
			},
		[]
	);

	useInit(() => {
		crud.cancelAction();
	}, []);

	const onUpdateCashRow = useCallback(({ fromRowIndex, formData, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		updateResult.rowIndex = rowIndex;

		const oldRowData = cashGrid.gridData[rowIndex];
		console.log(`開始處理 Cash 第 ${rowIndex + 1} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
		let dirty = false;
		// prod
		if (processedRowData.CashAmt !== oldRowData.CashAmt) {
			updateResult.cols.push("CashAmt")
			dirty = true;
		}

		if (processedRowData.DnsAmt !== oldRowData.DnsAmt) {
			updateResult.cols.push("DnsAmt")
			dirty = true;
		}
		if (dirty) {
			updateResult.rows++;
		}
		return processedRowData;
	}, [cashGrid.gridData]);



	const onCashGridChanged = useCallback(({ gridData, setValue, updateResult }) => {
		console.log("onGridChanged", gridData);

		if (updateResult.cols.includes("CashAmt") || updateResult.cols.includes("DnsAmt") || updateResult.type === "DELETE") {
			console.log("before reduce", gridData);
			const totals = gridData.reduce((acc, row) => ({
				CashAmt: acc.CashAmt + Number(row.CashAmt),
				DnsAmt: acc.DnsAmt + Number(row.DnsAmt)
			}), { CashAmt: 0, DnsAmt: 0 });
			asyncRef.current.CashAmt = totals.CashAmt ?? 0;
			setValue("CashAmt", asyncRef.current.CashAmt);
			asyncRef.current.DnsAmt = totals.DnsAmt ?? 0;
			setValue("DnsAmt", asyncRef.current.DnsAmt);

			syncNumbers({ setValue });
		}
	}, [syncNumbers]);

	const onUpdateChkRow = useCallback(({ fromRowIndex, formData, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		updateResult.rowIndex = rowIndex;

		const oldRowData = chkGrid.gridData[rowIndex];
		console.log(`開始處理 Chk 第 ${rowIndex + 1} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
		let dirty = false;
		// prod
		if (processedRowData.ChkAmt !== oldRowData.ChkAmt) {
			updateResult.cols.push("ChkAmt")
			dirty = true;
		}

		if (dirty) {
			updateResult.rows++;
		}
		return processedRowData;
	}, [chkGrid.gridData]);

	const onChkGridChanged = useCallback(({ gridData, setValue, updateResult }) => {
		console.log("onGridChanged", gridData);

		if (updateResult.cols.includes("ChkAmt") || updateResult.type === "DELETE") {
			console.log("before reduce", gridData);
			const totals = gridData.reduce((acc, row) => ({
				ChkAmt: acc.ChkAmt + Number(row.ChkAmt),
			}), { ChkAmt: 0 });
			asyncRef.current.ChkAmt = totals.ChkAmt ?? 0;
			setValue("ChkAmt", Forms.formatMoney(asyncRef.current.ChkAmt, 2));

			// //"本期收款" = "收現金額" + "折讓金額" + "票據金額"
			// const result = asyncRef.current.CashAmt + asyncRef.current.DnsAmt + asyncRef.current.ChkAmt;
			// setValue("CollAmt", Forms.formatMoney(result, 2));
			syncNumbers({ setValue });
		}
	}, [syncNumbers]);




	return {
		...listLoader,
		...crud,
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
		// CASH
		cashGrid,
		cashGridDisabled,
		createCashRow,
		onUpdateCashRow,
		onCashGridChanged,
		// CHK
		chkGrid,
		chkGridDisabled,
		createChkRow,
		onUpdateChkRow,
		onChkGridChanged,
		// DOC
		docGrid,
		docGridDisabled,
		createDocRow,
		onUpdateDocRow,
		onDocGridChanged
	};
};

