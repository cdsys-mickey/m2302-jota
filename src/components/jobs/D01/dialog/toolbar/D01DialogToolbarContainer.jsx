/* eslint-disable no-mixed-spaces-and-tabs */
import { D01Context } from "@/contexts/D01/D01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import D01DialogEditToolbar from "./D01DialogEditToolbar";
import D01DialogViewToolbar from "./D01DialogViewToolbar";
import { useMemo } from "react";

export const D01DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const d01 = useContext(D01Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return d01.canDelete;
	}, [d01.canDelete]);

	const handlePrint = form.handleSubmit(
		d01.onPrintSubmit,
		d01.onPrintSubmitError
	);

	if (!d01.itemDataReady) {
		return false;
	}

	if (d01.editing) {
		return (
			<D01DialogEditToolbar
				onSave={form.handleSubmit(
					d01.onEditorSubmit,
					d01.onEditorSubmitError
				)}
				editWorking={d01.editWorking}
				onCancel={
					d01.updating
						? d01.confirmReturnReading
						: d01.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<D01DialogViewToolbar
			// onEdit={d01.canUpdate ? d01.promptUpdating : null}
			onEdit={d01.canUpdate ? d01.handleCheckEditable : null}
			onDelete={canDelete ? d01.confirmDelete : null}
			onPrint={d01.canPrint ? handlePrint : null}
			checkEditableWorking={d01.checkEditableWorking}
			{...rest}
		/>
	);
};

D01DialogToolbarContainer.displayName = "D01DialogToolbarContainer";