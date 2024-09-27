/* eslint-disable no-mixed-spaces-and-tabs */
import { E01Context } from "@/contexts/E01/E01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import E01DialogEditToolbar from "./E01DialogEditToolbar";
import E01DialogViewToolbar from "./E01DialogViewToolbar";

export const E01DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const e01 = useContext(E01Context);
	const form = useFormContext();
	const handlePrint = form.handleSubmit(
		e01.onPrintSubmit,
		e01.onPrintSubmitError
	);

	if (!e01.itemDataReady) {
		return false;
	}

	if (e01.editing) {
		return (
			<E01DialogEditToolbar
				onSave={form.handleSubmit(
					e01.onEditorSubmit,
					e01.onEditorSubmitError
				)}
				onCancel={
					e01.updating
						? e01.confirmReturnReading
						: e01.confirmQuitCreating
				}
				loading={e01.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<E01DialogViewToolbar
			onEdit={e01.canUpdate ? e01.promptUpdating : null}
			onDelete={e01.canDelete ? e01.confirmDelete : null}
			onPrint={e01.canPrint ? handlePrint : null}
			onSideDrawerOpen={e01.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

E01DialogToolbarContainer.displayName = "E01DialogToolbarContainer";


