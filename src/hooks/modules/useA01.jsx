import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useMemo, useState } from "react";
import CrudContext from "../../contexts/crud/CrudContext";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import A01 from "../../modules/md-a01";

export const useA01 = ({ token }) => {
	const crud = useContext(CrudContext);
	const { httpGetAsync } = useWebApi();
	const [selectedItem, setSelectedItem] = useState();
	const dialogs = useContext(DialogsContext);

	const confirmReturn = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄編輯?",
			onConfirm: () => {
				crud.cancelUpdate();
			},
		});
	}, [crud, dialogs]);

	const handleSelect = useCallback(
		async (e, rowData) => {
			e?.stopPropagation();
			crud.cancelAction();
			crud.startRead(rowData, "讀取中...");
			try {
				setSelectedItem(rowData);
				const { status, payload, error } = await httpGetAsync({
					url: `v1/prods/${rowData.ProdID}`,
					bearer: token,
				});
				console.debug("payload", payload);
				if (status.success) {
					crud.finishRead(A01.processForRead(payload));
				} else {
					throw error || "讀取失敗";
				}
			} catch (err) {
				crud.failRead(err);
			}
		},
		[crud, httpGetAsync, token]
	);

	const dialogOpen = useMemo(() => {
		return crud.reading || crud.creating || crud.updating;
	}, [crud.creating, crud.reading, crud.updating]);

	const confirmDialogClose = useCallback(() => {
		dialogs.confirm({
			message: "確認要放棄編輯?",
			onConfirm: () => {
				crud.cancelAction();
			},
		});
	}, [crud, dialogs]);

	const handleDialogClose = useCallback(() => {
		crud.cancelAction();
	}, [crud]);

	const onEditorSubmit = useCallback((data) => {
		console.debug(`A01.onSubmit()`, data);
		const processed = A01.processForEditorSubmit(data);
		console.debug(`processed`, processed);
	}, []);

	const onEditorSubmitError = useCallback((err) => {
		console.error(`A01.onSubmitError`, err);
	}, []);

	return {
		...crud,
		handleSelect,
		selectedItem,
		handleDialogClose,
		confirmDialogClose,
		dialogOpen,
		onEditorSubmit,
		onEditorSubmitError,
		confirmReturn,
	};
};
