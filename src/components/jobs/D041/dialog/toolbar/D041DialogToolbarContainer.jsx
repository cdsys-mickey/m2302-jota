/* eslint-disable no-mixed-spaces-and-tabs */
import { D041Context } from "@/contexts/D041/D041Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import D041DialogEditToolbar from "./D041DialogEditToolbar";
import D041DialogViewToolbar from "./D041DialogViewToolbar";
import { useMemo } from "react";

export const D041DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const d041 = useContext(D041Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return d041.canDelete;
	}, [d041.canDelete]);

	const handlePrint = form.handleSubmit(
		d041.onPrintSubmit,
		d041.onPrintSubmitError
	);

	if (!d041.itemDataReady) {
		return false;
	}

	if (d041.editing) {
		return (
			<D041DialogEditToolbar
				onSave={form.handleSubmit(
					d041.onEditorSubmit,
					d041.onEditorSubmitError
				)}
				editWorking={d041.editWorking}
				onCancel={
					d041.updating
						? d041.confirmReturnReading
						: d041.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<D041DialogViewToolbar
			// onEdit={d041.canUpdate ? d041.promptUpdating : null}
			onEdit={d041.canUpdate ? d041.handleCheckEditable : null}
			onDelete={canDelete ? d041.confirmDelete : null}
			onPrint={d041.canPrint ? handlePrint : null}
			checkEditableWorking={d041.checkEditableWorking}
			onSideDrawerOpen={d041.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

D041DialogToolbarContainer.displayName = "D041DialogToolbarContainer";


