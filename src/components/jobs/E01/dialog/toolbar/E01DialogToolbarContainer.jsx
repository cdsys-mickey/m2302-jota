/* eslint-disable no-mixed-spaces-and-tabs */
import { E01Context } from "@/contexts/E01/E01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import E01DialogEditToolbar from "./E01DialogEditToolbar";
import E01DialogViewToolbar from "./E01DialogViewToolbar";
import { useMemo } from "react";

export const E01DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const e01 = useContext(E01Context);
	const form = useFormContext();
	const handlePrint = form.handleSubmit(
		e01.onPrintSubmit,
		e01.onPrintSubmitError
	);

	const onSave = useMemo(() => {
		return form.handleSubmit(
			e01.onEditorSubmit,
			e01.onEditorSubmitError
		)
	}, [e01.onEditorSubmit, e01.onEditorSubmitError, form])

	const onCancel = useMemo(() => {
		return e01.updating
			? e01.confirmReturnReading
			: e01.confirmQuitCreating
	}, [e01.confirmQuitCreating, e01.confirmReturnReading, e01.updating])

	const onEdit = useMemo(() => {
		return e01.canUpdate ? e01.promptUpdating : null
	}, [e01.canUpdate, e01.promptUpdating])

	if (!e01.itemDataReady) {
		return false;
	}

	if (e01.editing) {
		return (
			<E01DialogEditToolbar
				onSave={onSave}
				onCancel={onCancel}
				loading={e01.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<E01DialogViewToolbar
			onEdit={onEdit}
			onDelete={e01.canDelete ? e01.confirmDelete : null}
			onPrint={e01.canPrint ? handlePrint : null}
			onSideDrawerOpen={e01.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

E01DialogToolbarContainer.displayName = "E01DialogToolbarContainer";


