/* eslint-disable no-mixed-spaces-and-tabs */
import { B02Context } from "@/contexts/B02/B02Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import B02DialogEditToolbar from "./B02DialogEditToolbar";
import B02DialogViewToolbar from "./B02DialogViewToolbar";
import { BContext } from "@/contexts/B/BContext";
import { B04Context } from "@/contexts/B04/B04Context";

export const B02DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const b = useContext(BContext);
	const b02 = useContext(b.forNew ? B04Context : B02Context);
	const form = useFormContext();

	const handlePrint = form.handleSubmit(
		b02.onPrintSubmit,
		b02.onPrintSubmitError
	);

	if (!b02.itemDataReady) {
		return false;
	}

	if (b02.editing) {
		return (
			<B02DialogEditToolbar
				onLoadProds={b02.promptImportProds}
				onSave={form.handleSubmit(
					b02.onEditorSubmit,
					b02.onEditorSubmitError
				)}
				onCancel={
					b02.updating
						? b02.confirmReturnReading
						: b02.confirmQuitCreating
				}
				loading={b02.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<B02DialogViewToolbar
			onEdit={b02.canUpdate ? b02.promptUpdating : null}
			onDelete={b02.canDelete ? b02.confirmDelete : null}
			onPrint={b02.canPrint ? handlePrint : null}
			onSideDrawerOpen={b02.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

B02DialogToolbarContainer.displayName = "B02DialogToolbarContainer";


