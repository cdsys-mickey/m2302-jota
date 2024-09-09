/* eslint-disable no-mixed-spaces-and-tabs */
import { C05Context } from "@/contexts/C05/C05Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C05DialogEditToolbar from "./C05DialogEditToolbar";
import C05DialogViewToolbar from "./C05DialogViewToolbar";
import { useMemo } from "react";

export const C05DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c05 = useContext(C05Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return c05.canDelete;
	}, [c05.canDelete]);

	const handlePrint = form.handleSubmit(
		c05.onPrintSubmit,
		c05.onPrintSubmitError
	);

	if (!c05.itemDataReady) {
		return false;
	}

	if (c05.editing) {
		return (
			<C05DialogEditToolbar
				onRefresh={c05.handleRefresh({
					setValue: form.setValue,
					getValues: form.getValues,
				})}
				refreshWorking={c05.refreshWorking}
				onSave={form.handleSubmit(
					c05.onEditorSubmit,
					c05.onEditorSubmitError
				)}
				editWorking={c05.editWorking}
				onCancel={
					c05.updating
						? c05.confirmReturnReading
						: c05.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<C05DialogViewToolbar
			// onEdit={c05.canUpdate ? c05.promptUpdating : null}
			onEdit={c05.canUpdate ? c05.handleCheckEditable : null}
			onDelete={canDelete ? c05.confirmDelete : null}
			onPrint={c05.canPrint ? handlePrint : null}
			checkEditableWorking={c05.checkEditableWorking}
			onSideDrawerOpen={c05.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

C05DialogToolbarContainer.displayName = "C05DialogToolbarContainer";
