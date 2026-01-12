import CrudContext from "@/contexts/crud/CrudContext";
import { toastEx } from "shared-components/toast-ex";
import G10 from "@/pages/jobs/G10/G10.mjs";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useWebApiAsync } from "@/shared-hooks";
import { useCallback, useContext, useState } from "react";
import { useAppModule } from "@/hooks/jobs/useAppModule";

export const useG10 = ({ token }) => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;

	const [state, setState] = useState({
		staging: false,
	});
	const { httpPostAsync } = useWebApiAsync();
	const appModule = useAppModule({
		token,
		moduleId: "G10",
	});
	const dialogs = useContext(DialogsContext);

	const grid = useDSG({
		gridId: "docs",
		keyColumn: "pkey",
		createRow: G10.createRow,
		initialLockRows: false,
	});

	const handleLoaded = useCallback((payload) => {
		const data = payload.data[0];
		setState((prev) => ({
			...prev,
			data,
		}));
	}, []);

	const load = useCallback(() => {
		grid.initGridData([], {
			fillRows: 15,
		});
	}, [grid]);

	const onUpdateRow = useCallback(
		({
				fromRowIndex,
				formData,
				newValue,
				setValue,
				gridMeta,
				updateResult,
			}) =>
			async (rowData, index) => {
				const rowIndex = fromRowIndex + index;
				const oldRowData = grid.gridData[rowIndex];
				updateResult.rowIndex = rowIndex;
				console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);
				let processedRowData = {
					...rowData,
				};
				// doc
				if (processedRowData.doc?.SDocID != oldRowData.doc?.SDocID) {
					console.log(
						`doc[${rowIndex}] changed`,
						processedRowData?.doc
					);
					processedRowData = {
						...processedRowData,
						DocType: processedRowData.doc?.DocType ?? "",
						DocDate_N: processedRowData.doc?.DocDate_N ?? "",
						CustID_N: processedRowData.doc?.CustID_N ?? "",
						CustName_N: processedRowData.doc?.CustName_N ?? "",
						Amt_N: processedRowData.doc?.Amt_N ?? "",
					};
					updateResult.rows++;
				}
				return processedRowData;
			},
		[grid.gridData]
	);

	const updateAmt = useCallback(({ setValue, gridData }) => {
		const subtotal = G10.getSubtotal(gridData);
		setValue("Amt", subtotal.toFixed(2));
	}, []);

	const onGridChanged = useCallback(
		({ gridData, formData, setValue, updateResult }) => {
			updateAmt({ setValue, gridData });
		},
		[updateAmt]
	);

	const onSubmit = useCallback(
		async (data) => {
			console.log("onSubmit", data);
			console.log("grid.gridData", grid.gridData);
			try {
				crud.startUpdating();
				const { status, error } = await httpPostAsync({
					url: "v1/sales/recv-account/write-off",
					bearer: token,
					data: G10.transformForSubmitting(data, grid.gridData),
				});
				if (status.success) {
					toastEx.success("沖銷已完成");
					crud.finishedUpdating();
					// grid.commitChanges();
					grid.initGridData([], {
						fillRows: 15,
					});
				} else {
					throw error ?? new Error("發生未預期例外");
				}
			} catch (err) {
				console.error("onSubmit.failed", err);
				// crud.failedUpdating();
				toastEx.error("沖銷失敗", err);
			} finally {
				crud.finishedUpdating();
			}
		},
		[crud, grid, httpPostAsync, token]
	);

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, []);

	return {
		...crud,
		...state,
		grid,
		...appModule,
		handleLoaded,
		onUpdateRow,
		onSubmit,
		onSubmitError,
		load,
		onGridChanged,
	};
};
