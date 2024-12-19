import CrudContext from "@/contexts/crud/CrudContext";
import F02 from "@/modules/md-f02";
import { DialogsContext } from "@/shared-contexts/dialog/DialogsContext";
import { useDSG } from "@/shared-hooks/dsg/useDSG";
import { useWebApi } from "@/shared-hooks/useWebApi";
import Errors from "@/shared-modules/sd-errors";
import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useAppModule } from "./useAppModule";

export const useF02 = ({ token }) => {
	const crud = useContext(CrudContext);
	const { itemData } = crud;

	const [state, setState] = useState({
		staging: false
	});
	const {
		httpGetAsync,
		httpPutAsync,
		httpDeleteAsync,
	} = useWebApi();
	const appModule = useAppModule({
		token,
		moduleId: "F02",
	});
	const dialogs = useContext(DialogsContext);

	const grid = useDSG({
		gridId: "prods",
		keyColumn: "pkey",
		createRow: F02.createRow
	});

	const handleLoaded = useCallback((payload) => {
		const data = payload.data[0];
		setState(prev => ({
			...prev,
			data
		}));
	}, []);

	// READ
	const load = useCallback(
		async ({ refresh = false } = {}) => {
			try {
				if (!refresh) {
					crud.startLoading("讀取中...");
					grid.setGridLoading(true);
				}
				const { status, payload, error } = await httpGetAsync({
					url: "v1/inv/taking/staging",
					bearer: token,
				});
				if (status.success) {
					const data = F02.transformForReading(payload.data[0]);
					console.log("data", data);
					crud.doneLoading({
						data: data,
					});
					setState(prev => ({
						...prev,
						staging: data.prods?.length > 0
					}))
					grid.initGridData(data.prods, {
						fillRows: 15
					});
					grid.handleLock();
				} else {
					throw error || new Error("未預期例外");
				}
			} catch (err) {
				crud.failLoading(err);
			} finally {
				grid.setGridLoading(false);
			}
		},
		[crud, httpGetAsync, grid, token]
	);

	//DELETE
	const confirmDelete = useCallback(() => {
		dialogs.confirm({
			message: `確認要删除目前電腦帳?`,
			onConfirm: async () => {
				try {
					crud.startDeleting(itemData);
					const { status, error } = await httpDeleteAsync({
						url: `v1/inv/taking/staging`,
						bearer: token,
					});
					// 關閉對話框
					crud.cancelAction();
					if (status.success) {
						toast.success(`成功删除目前電腦帳`);
						load();
					} else {
						throw error || `發生未預期例外`;
					}
				} catch (err) {
					crud.failDeleting(err);
					console.error("confirmDelete.failed", err);
					toast.error(Errors.getMessage("刪除目前電腦帳失敗", err), {
						position: "top-right"
					});
				}
			},
		});
	}, [crud, dialogs, httpDeleteAsync, itemData, load, token]);

	const onUpdateRow = useCallback(({ fromRowIndex, formData, newValue, setValue, gridMeta, updateResult }) => async (rowData, index) => {
		const rowIndex = fromRowIndex + index;
		const oldRowData = grid.gridData[rowIndex];
		updateResult.rowIndex = rowIndex;
		console.log(`開始處理第 ${rowIndex + 1} 列...`, rowData);
		let processedRowData = {
			...rowData,
		};
		// listing
		if (processedRowData.listing?.PhyID != oldRowData.listing?.PhyID) {
			console.log(
				`listing[${rowIndex}] changed`,
				processedRowData?.listing
			);
			processedRowData = ({
				...processedRowData,
				PhyData: processedRowData.listing?.PhyData || ""
			});
		}
		return processedRowData;
	}, [grid.gridData]);

	const onSubmit = useCallback(async (data) => {
		console.log("onSubmit", data);
		console.log("grid.gridData", grid.gridData)
		try {
			crud.startUpdating();
			const { status, error } = await httpPutAsync({
				url: "v1/inv/taking/staging",
				bearer: token,
				data: F02.transformForSubmitting(data, grid.gridData)
			})
			if (status.success) {
				toast.success("電腦帳已形成，請繼續盤點作業");
				crud.doneUpdating();
				grid.commitChanges();
				load();
			} else {
				throw error || new Error("未預期例外");
			}
		} catch (err) {
			console.error("onSubmit.failed", err);
			// crud.failUpdating();
			toast.error(Errors.getMessage("產生電腦帳失敗", err), {
				position: "top-right"
			});
		} finally {
			crud.doneUpdating();
		}

	}, [crud, grid, httpPutAsync, load, token])

	const onSubmitError = useCallback((err) => {
		console.error("onSubmitError", err);
	}, [])

	return {
		...crud,
		...state,
		grid,
		...appModule,
		handleLoaded,
		onUpdateRow,
		load,
		onSubmit,
		onSubmitError,
		confirmDelete
	};
};
