/* eslint-disable no-mixed-spaces-and-tabs */
import { G08Context } from "@/modules/G08/G08Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import G08DialogEditButtons from "./G08DialogEditButtons";
import G08DialogViewButtons from "./G08DialogViewButtons";

export const G08DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const g08 = useContext(G08Context);
	const form = useFormContext();

	const handlePrint = form.handleSubmit(
		g08.onPrintSubmit,
		g08.onPrintSubmitError
	);

	// if (g08.readState !== ActionState.DONE) {
	if (!g08.itemDataReady) {
		return false;
	}

	if (g08.editing) {
		return (
			<G08DialogEditButtons
				onSave={form.handleSubmit(
					g08.onEditorSubmit,
					g08.onEditorSubmitError
				)}
				onCancel={
					g08.updating ? g08.confirmReturn : g08.confirmQuitCreating
				}
				loading={g08.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<G08DialogViewButtons
			onPrint={g08.canPrint ? handlePrint : null}
			onEdit={g08.canUpdate ? g08.promptUpdating : null}
			onDelete={g08.canDelete ? g08.confirmDelete : null}
			onSideDrawerOpen={g08.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

G08DialogButtonsContainer.displayName = "G08DialogButtonsContainer";


