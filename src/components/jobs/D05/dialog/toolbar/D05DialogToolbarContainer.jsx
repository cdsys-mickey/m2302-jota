/* eslint-disable no-mixed-spaces-and-tabs */
import { D05Context } from "@/contexts/D05/D05Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import D05DialogEditToolbar from "./D05DialogEditToolbar";
import D05DialogViewToolbar from "./D05DialogViewToolbar";
import { useMemo } from "react";

export const D05DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const d05 = useContext(D05Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return d05.canDelete;
	}, [d05.canDelete]);

	const handlePrint = form.handleSubmit(
		d05.onPrintSubmit,
		d05.onPrintSubmitError
	);

	if (!d05.itemDataReady) {
		return false;
	}

	if (d05.editing) {
		return (
			<D05DialogEditToolbar
				onSave={form.handleSubmit(
					d05.onEditorSubmit,
					d05.onEditorSubmitError
				)}
				editWorking={d05.editWorking}
				onCancel={
					d05.updating
						? d05.confirmReturnReading
						: d05.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<D05DialogViewToolbar
			// onEdit={d05.canUpdate ? d05.promptUpdating : null}
			onEdit={d05.canUpdate ? d05.handleCheckEditable : null}
			onDelete={canDelete ? d05.confirmDelete : null}
			onPrint={d05.canPrint ? handlePrint : null}
			checkEditableWorking={d05.checkEditableWorking}
			{...rest}
		/>
	);
};

D05DialogToolbarContainer.displayName = "D05DialogToolbarContainer";
