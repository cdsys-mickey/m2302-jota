/* eslint-disable no-mixed-spaces-and-tabs */
import { C08Context } from "@/contexts/C08/C08Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C08DialogEditToolbar from "./C08DialogEditToolbar";
import C08DialogViewToolbar from "./C08DialogViewToolbar";
import { useMemo } from "react";

export const C08DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c08 = useContext(C08Context);
	const form = useFormContext();

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
				onSave={form.handleSubmit(
					c08.onEditorSubmit,
					c08.onEditorSubmitError
				)}
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
