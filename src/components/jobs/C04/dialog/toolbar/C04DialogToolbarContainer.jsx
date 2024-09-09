/* eslint-disable no-mixed-spaces-and-tabs */
import { C04Context } from "@/contexts/C04/C04Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C04DialogEditToolbar from "./C04DialogEditToolbar";
import C04DialogViewToolbar from "./C04DialogViewToolbar";
import { useMemo } from "react";

export const C04DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(C04Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return c04.canDelete;
	}, [c04.canDelete]);

	const handlePrint = form.handleSubmit(
		c04.onPrintSubmit,
		c04.onPrintSubmitError
	);

	if (!c04.itemDataReady) {
		return false;
	}

	if (c04.editing) {
		return (
			<C04DialogEditToolbar
				onRefresh={c04.handleRefresh({
					setValue: form.setValue,
					getValues: form.getValues,
				})}
				refreshWorking={c04.refreshWorking}
				onSave={form.handleSubmit(
					c04.onEditorSubmit,
					c04.onEditorSubmitError
				)}
				editWorking={c04.editWorking}
				onCancel={
					c04.updating
						? c04.confirmReturnReading
						: c04.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<C04DialogViewToolbar
			// onEdit={c04.canUpdate ? c04.promptUpdating : null}
			onEdit={c04.canUpdate ? c04.handleCheckEditable : null}
			onDelete={canDelete ? c04.confirmDelete : null}
			onPrint={c04.canPrint ? handlePrint : null}
			checkEditableWorking={c04.checkEditableWorking}
			onSideDrawerOpen={c04.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

C04DialogToolbarContainer.displayName = "C04DialogToolbarContainer";
