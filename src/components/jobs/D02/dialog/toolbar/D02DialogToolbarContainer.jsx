/* eslint-disable no-mixed-spaces-and-tabs */
import { D02Context } from "@/contexts/D02/D02Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import D02DialogEditToolbar from "./D02DialogEditToolbar";
import D02DialogViewToolbar from "./D02DialogViewToolbar";
import { useMemo } from "react";

export const D02DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const d02 = useContext(D02Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return d02.canDelete;
	}, [d02.canDelete]);

	const handlePrint = form.handleSubmit(
		d02.onPrintSubmit,
		d02.onPrintSubmitError
	);

	if (!d02.itemDataReady) {
		return false;
	}

	if (d02.editing) {
		return (
			<D02DialogEditToolbar
				onSave={form.handleSubmit(
					d02.onEditorSubmit,
					d02.onEditorSubmitError
				)}
				editWorking={d02.editWorking}
				onCancel={
					d02.updating
						? d02.confirmReturnReading
						: d02.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<D02DialogViewToolbar
			// onEdit={d02.canUpdate ? d02.handleCheckEditable : null}
			onEdit={d02.canUpdate ? d02.handleCheckEditableWithCheck : null}
			// onDelete={canDelete ? d02.confirmDelete : null}
			onDelete={canDelete ? d02.confirmDeleteWithCheck : null}
			onPrint={d02.canPrint ? handlePrint : null}
			checkEditableWorking={d02.checkEditableWorking}
			onSideDrawerOpen={d02.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

D02DialogToolbarContainer.displayName = "D02DialogToolbarContainer";

