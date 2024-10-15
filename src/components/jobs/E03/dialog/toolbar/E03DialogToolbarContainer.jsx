/* eslint-disable no-mixed-spaces-and-tabs */
import { E03Context } from "@/contexts/E03/E03Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import E03DialogEditToolbar from "./E03DialogEditToolbar";
import E03DialogViewToolbar from "./E03DialogViewToolbar";
import { useMemo } from "react";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";

export const E03DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const e03 = useContext(E03Context);
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);
	const handlePrint = form.handleSubmit(
		e03.onPrintSubmit,
		e03.onPrintSubmitError
	);

	const onSave = useMemo(() => {
		return form.handleSubmit(
			e03.onEditorSubmit,
			e03.onEditorSubmitError
		)
	}, [e03, form])

	const onCancel = useMemo(() => {
		return e03.updating
			? e03.confirmReturnReading
			: e03.confirmQuitCreating
	}, [e03.confirmQuitCreating, e03.confirmReturnReading, e03.updating])

	const onEdit = useMemo(() => {
		return e03.canUpdate ? e03.handleCheckEditable : null
	}, [e03.canUpdate, e03.handleCheckEditable])

	if (!e03.itemDataReady) {
		return false;
	}

	if (e03.editing) {
		return (
			<E03DialogEditToolbar
				onSave={onSave}
				onCancel={onCancel}
				loading={e03.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<E03DialogViewToolbar
			onEdit={onEdit}
			onDelete={e03.canDelete ? e03.confirmDelete : null}
			onPrint={e03.canPrint ? handlePrint : null}
			onSideDrawerOpen={e03.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

E03DialogToolbarContainer.displayName = "E03DialogToolbarContainer";




