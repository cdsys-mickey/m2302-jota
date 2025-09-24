/* eslint-disable no-mixed-spaces-and-tabs */
import { C09Context } from "@/contexts/C09/C09Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C09DialogEditToolbar from "./C09DialogEditToolbar";
import C09DialogViewToolbar from "./C09DialogViewToolbar";
import { useMemo } from "react";

export const C09DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c09 = useContext(C09Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return c09.canDelete;
	}, [c09.canDelete]);

	const handlePrint = form.handleSubmit(
		c09.onPrintSubmit,
		c09.onPrintSubmitError
	);

	if (!c09.itemDataReady) {
		return false;
	}

	if (c09.editing) {
		return (
			<C09DialogEditToolbar
				onSave={form.handleSubmit(
					c09.onEditorSubmit,
					c09.onEditorSubmitError
				)}
				editWorking={c09.editWorking}
				onCancel={
					c09.updating
						? c09.confirmReturnReading
						: c09.confirmQuitCreating
				}

				{...rest}
			/>
		);
	}

	return (
		<C09DialogViewToolbar
			// onEdit={c09.canUpdate ? c09.promptUpdating : null}
			onEdit={c09.canUpdate ? c09.handleCheckEditable : null}
			onDelete={canDelete ? c09.confirmDelete : null}
			onPrint={c09.canPrint ? handlePrint : null}
			checkEditableWorking={c09.checkEditableWorking}
			onSideDrawerOpen={c09.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

C09DialogToolbarContainer.displayName = "C09DialogToolbarContainer";
