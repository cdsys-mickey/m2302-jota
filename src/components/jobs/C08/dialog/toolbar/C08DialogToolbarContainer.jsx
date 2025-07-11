/* eslint-disable no-mixed-spaces-and-tabs */
import { C08Context } from "@/contexts/C08/C08Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C08DialogEditToolbar from "./C08DialogEditToolbar";
import C08DialogViewToolbar from "./C08DialogViewToolbar";
import { useMemo } from "react";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";

export const C08DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c08 = useContext(C08Context);
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	const onSave = useMemo(() => {
		return form.handleSubmit(
			c08.onEditorSubmit({ setValue: form.setValue, gridMeta: formMeta.gridMeta }),
			c08.onEditorSubmitError
		)
	}, [c08, form, formMeta.gridMeta]);

	const canDelete = useMemo(() => {
		return c08.canDelete;
	}, [c08.canDelete]);

	const handlePrint = form.handleSubmit(
		c08.onPrintSubmit,
		c08.onPrintSubmitError
	);

	if (!c08.itemDataReady) {
		return false;
	}

	if (c08.editing) {
		return (
			<C08DialogEditToolbar
				refreshWorking={c08.refreshWorking}
				onSave={onSave}
				editWorking={c08.editWorking}
				onCancel={
					c08.updating
						? c08.confirmReturnReading
						: c08.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<C08DialogViewToolbar
			// onEdit={c08.canUpdate ? c08.promptUpdating : null}
			onEdit={c08.canUpdate ? c08.handleCheckEditable : null}
			onDelete={canDelete ? c08.confirmDelete : null}
			onPrint={c08.canPrint ? handlePrint : null}
			checkEditableWorking={c08.checkEditableWorking}
			onSideDrawerOpen={c08.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

C08DialogToolbarContainer.displayName = "C08DialogToolbarContainer";
