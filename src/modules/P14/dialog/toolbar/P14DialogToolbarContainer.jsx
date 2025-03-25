/* eslint-disable no-mixed-spaces-and-tabs */
import { P14Context } from "@/modules/P14/P14Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import P14DialogEditToolbar from "./P14DialogEditToolbar";
import P14DialogViewToolbar from "./P14DialogViewToolbar";

export const P14DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const p14 = useContext(P14Context);
	const form = useFormContext();

	const handlePrint = form.handleSubmit(
		p14.onPrintSubmit,
		p14.onPrintSubmitError
	);

	if (!p14.itemDataReady) {
		return false;
	}

	if (p14.editing) {
		return (
			<P14DialogEditToolbar
				onLoadProds={p14.promptImportProds}
				onSave={form.handleSubmit(
					p14.onEditorSubmit,
					p14.onEditorSubmitError
				)}
				onCancel={
					p14.updating
						? p14.confirmReturnReading
						: p14.confirmQuitCreating
				}
				loading={p14.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<P14DialogViewToolbar
			onEdit={p14.canUpdate ? p14.promptUpdating : null}
			onDelete={p14.canDelete ? p14.confirmDelete : null}
			onPrint={p14.canPrint ? handlePrint : null}
			onSideDrawerOpen={p14.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

P14DialogToolbarContainer.displayName = "P14DialogToolbarContainer";


