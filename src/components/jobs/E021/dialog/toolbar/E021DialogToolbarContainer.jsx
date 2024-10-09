/* eslint-disable no-mixed-spaces-and-tabs */
import { E021Context } from "@/contexts/E021/E021Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import E021DialogEditToolbar from "./E021DialogEditToolbar";
import E021DialogViewToolbar from "./E021DialogViewToolbar";
import { useMemo } from "react";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

export const E021DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const e021 = useContext(E021Context);
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);
	const handlePrint = form.handleSubmit(
		e021.onPrintSubmit,
		e021.onPrintSubmitError
	);

	const onSave = useMemo(() => {
		return form.handleSubmit(
			e021.onEditorSubmit({ setValue: form.setValue, gridMeta: formMeta.gridMeta }),
			e021.onEditorSubmitError
		)
	}, [e021, form, formMeta.gridMeta])

	const onCancel = useMemo(() => {
		return e021.updating
			? e021.confirmReturnReading
			: e021.confirmQuitCreating
	}, [e021.confirmQuitCreating, e021.confirmReturnReading, e021.updating])

	const onEdit = useMemo(() => {
		return e021.canUpdate ? e021.promptUpdating : null
	}, [e021.canUpdate, e021.promptUpdating])

	if (!e021.itemDataReady) {
		return false;
	}

	if (e021.editing) {
		return (
			<E021DialogEditToolbar
				onSave={onSave}
				onCancel={onCancel}
				loading={e021.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<E021DialogViewToolbar
			onEdit={onEdit}
			onDelete={e021.canDelete ? e021.confirmDelete : null}
			onPrint={e021.canPrint ? handlePrint : null}
			onSideDrawerOpen={e021.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

E021DialogToolbarContainer.displayName = "E021DialogToolbarContainer";



