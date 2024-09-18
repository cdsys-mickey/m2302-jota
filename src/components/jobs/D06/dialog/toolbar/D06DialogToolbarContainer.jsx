/* eslint-disable no-mixed-spaces-and-tabs */
import { D06Context } from "@/contexts/D06/D06Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import D06DialogEditToolbar from "./D06DialogEditToolbar";
import D06DialogViewToolbar from "./D06DialogViewToolbar";
import { useMemo } from "react";

export const D06DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const d06 = useContext(D06Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return d06.canDelete;
	}, [d06.canDelete]);

	const handlePrint = form.handleSubmit(
		d06.onPrintSubmit,
		d06.onPrintSubmitError
	);

	if (!d06.itemDataReady) {
		return false;
	}

	if (d06.editing) {
		return (
			<D06DialogEditToolbar
				onSave={form.handleSubmit(
					d06.onEditorSubmit,
					d06.onEditorSubmitError
				)}
				editWorking={d06.editWorking}
				onCancel={
					d06.updating
						? d06.confirmReturnReading
						: d06.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<D06DialogViewToolbar
			// onEdit={d06.canUpdate ? d06.promptUpdating : null}
			onEdit={d06.canUpdate ? d06.promptUpdating : null}
			onDelete={canDelete ? d06.confirmDelete : null}
			onPrint={d06.canPrint ? handlePrint : null}
			checkEditableWorking={d06.checkEditableWorking}
			onSideDrawerOpen={d06.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

D06DialogToolbarContainer.displayName = "D06DialogToolbarContainer";
