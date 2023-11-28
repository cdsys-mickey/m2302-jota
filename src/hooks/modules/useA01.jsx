import { useWebApi } from "@/shared-hooks/useWebApi";
import { useCallback, useContext, useMemo, useState } from "react";
import CrudContext from "../../contexts/crud/CrudContext";

export const useA01 = ({ token }) => {
	const crud = useContext(CrudContext);
	const { httpGetAsync } = useWebApi();
	const [selectedItem, setSelectedItem] = useState();

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
				if (status.success) {
					crud.finishRead(payload);
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

	const handleDialogClose = useCallback(() => {
		crud.cancelAction();
	}, [crud]);

	const onSubmit = useCallback((data) => {
		console.debug(`A01.onSubmit()`, data);
	}, []);

	const onSubmitError = useCallback((err) => {
		console.error(`A01.onSubmitError`, err);
	}, []);

	return {
		...crud,
		handleSelect,
		selectedItem,
		handleDialogClose,
		dialogOpen,
		onSubmit,
		onSubmitError,
	};
};
