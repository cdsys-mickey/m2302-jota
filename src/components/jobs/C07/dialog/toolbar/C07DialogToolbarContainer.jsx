/* eslint-disable no-mixed-spaces-and-tabs */
import { C07Context } from "@/contexts/C07/C07Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C07DialogEditToolbar from "./C07DialogEditToolbar";
import C07DialogViewToolbar from "./C07DialogViewToolbar";
import { useMemo } from "react";

export const C07DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c07 = useContext(C07Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return c07.canDelete;
	}, [c07.canDelete]);

	const handlePrint = form.handleSubmit(
		c07.onPrintSubmit,
		c07.onPrintSubmitError
	);

	if (!c07.itemDataReady) {
		return false;
	}

	// if (c07.editing) {
	// 	return (
	// 		<C07DialogEditToolbar
	// 			onRefresh={c07.handleRefresh({
	// 				setValue: form.setValue,
	// 				getValues: form.getValues,
	// 			})}
	// 			refreshWorking={c07.refreshWorking}
	// 			onSave={form.handleSubmit(
	// 				c07.onEditorSubmit,
	// 				c07.onEditorSubmitError
	// 			)}
	// 			editWorking={c07.editWorking}
	// 			onCancel={
	// 				c07.updating
	// 					? c07.confirmReturnReading
	// 					: c07.confirmQuitCreating
	// 			}
	// 			{...rest}
	// 		/>
	// 	);
	// }

	return (
		<C07DialogViewToolbar
			// onEdit={c07.canUpdate ? c07.promptUpdating : null}
			// onEdit={c07.canUpdate ? c07.handleCheckEditable : null}
			// onDelete={canDelete ? c07.confirmDelete : null}
			onPrint={c07.canPrint ? handlePrint : null}
			// checkEditableWorking={c07.checkEditableWorking}
			{...rest}
		/>
	);
};

C07DialogToolbarContainer.displayName = "C07DialogToolbarContainer";
