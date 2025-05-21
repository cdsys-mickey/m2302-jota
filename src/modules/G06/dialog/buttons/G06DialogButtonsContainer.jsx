/* eslint-disable no-mixed-spaces-and-tabs */
import { G06Context } from "@/modules/G06/G06Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import G06DialogEditButtons from "./G06DialogEditButtons";
import G06DialogViewButtons from "./G06DialogViewButtons";

export const G06DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const g06 = useContext(G06Context);
	const forms = useFormContext();

	// if (g06.readState !== ActionState.DONE) {
	if (!g06.itemDataReady) {
		return false;
	}

	if (g06.editing) {
		return (
			<G06DialogEditButtons
				onSave={forms.handleSubmit(
					g06.onEditorSubmit,
					g06.onEditorSubmitError
				)}
				onCancel={
					g06.updating ? g06.confirmReturn : g06.confirmQuitCreating
				}
				loading={g06.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<G06DialogViewButtons
			onEdit={g06.canUpdate ? g06.promptUpdating : null}
			onDelete={g06.canDelete ? g06.confirmDelete : null}
			onSideDrawerOpen={g06.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

G06DialogButtonsContainer.displayName = "G06DialogButtonsContainer";

