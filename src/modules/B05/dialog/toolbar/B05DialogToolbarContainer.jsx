/* eslint-disable no-mixed-spaces-and-tabs */
import { B05Context } from "@/modules/B05/B05Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import B05DialogEditToolbar from "./B05DialogEditToolbar";
import B05DialogViewToolbar from "./B05DialogViewToolbar";

export const B05DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const b05 = useContext(B05Context);
	const form = useFormContext();

	const handlePrint = form.handleSubmit(
		b05.onPrintSubmit,
		b05.onPrintSubmitError
	);

	if (!b05.itemDataReady) {
		return false;
	}

	if (b05.editing) {
		return (
			<B05DialogEditToolbar
				onLoadProds={b05.promptImportProds}
				onSave={form.handleSubmit(
					b05.onEditorSubmit,
					b05.onEditorSubmitError
				)}
				onCancel={
					b05.updating
						? b05.confirmReturnReading
						: b05.confirmQuitCreating
				}
				loading={b05.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<B05DialogViewToolbar
			onEdit={b05.canUpdate ? b05.promptUpdating : null}
			onDelete={b05.canDelete ? b05.confirmDelete : null}
			onPrint={b05.canPrint ? handlePrint : null}
			onSideDrawerOpen={b05.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

B05DialogToolbarContainer.displayName = "B05DialogToolbarContainer";
