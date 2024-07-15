/* eslint-disable no-mixed-spaces-and-tabs */
import { D07Context } from "@/contexts/D07/D07Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import D07DialogEditToolbar from "./D07DialogEditToolbar";
import D07DialogViewToolbar from "./D07DialogViewToolbar";
import { useMemo } from "react";

export const D07DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const d07 = useContext(D07Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return d07.canDelete;
	}, [d07.canDelete]);

	const handlePrint = form.handleSubmit(
		d07.onPrintSubmit,
		d07.onPrintSubmitError
	);

	if (!d07.itemDataReady) {
		return false;
	}

	if (d07.editing) {
		return (
			<D07DialogEditToolbar
				onSave={form.handleSubmit(
					d07.onEditorSubmit,
					d07.onEditorSubmitError
				)}
				editWorking={d07.editWorking}
				onCancel={
					d07.updating
						? d07.confirmReturnReading
						: d07.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<D07DialogViewToolbar
			// onEdit={d07.canUpdate ? d07.promptUpdating : null}
			onEdit={d07.canUpdate ? d07.promptUpdating : null}
			onDelete={canDelete ? d07.confirmDelete : null}
			onPrint={d07.canPrint ? handlePrint : null}
			{...rest}
		/>
	);
};

D07DialogToolbarContainer.displayName = "D07DialogToolbarContainer";
