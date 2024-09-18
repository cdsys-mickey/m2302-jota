/* eslint-disable no-mixed-spaces-and-tabs */
import { B04Context } from "@/contexts/B04/B04Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import B04DialogEditToolbar from "./B04DialogEditToolbar";
import B04DialogViewToolbar from "./B04DialogViewToolbar";

export const B04DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const b04 = useContext(B04Context);
	const form = useFormContext();

	const handlePrint = form.handleSubmit(
		b04.onPrintSubmit,
		b04.onPrintSubmitError
	);

	if (!b04.itemDataReady) {
		return false;
	}

	if (b04.editing) {
		return (
			<B04DialogEditToolbar
				onLoadProds={b04.promptImportProds}
				onSave={form.handleSubmit(
					b04.onEditorSubmit,
					b04.onEditorSubmitError
				)}
				onCancel={
					b04.updating
						? b04.confirmReturnReading
						: b04.confirmQuitCreating
				}
				loading={b04.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<B04DialogViewToolbar
			onEdit={b04.canUpdate ? b04.promptUpdating : null}
			onDelete={b04.canDelete ? b04.confirmDelete : null}
			onPrint={b04.canPrint ? handlePrint : null}
			onSideDrawerOpen={b04.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

B04DialogToolbarContainer.displayName = "B04DialogToolbarContainer";



