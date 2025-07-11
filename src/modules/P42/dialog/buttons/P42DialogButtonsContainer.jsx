/* eslint-disable no-mixed-spaces-and-tabs */
import { P42Context } from "@/modules/P42/P42Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import P42DialogEditButtons from "./P42DialogEditButtons";
import P42DialogViewButtons from "./P42DialogViewButtons";

export const P42DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const p42 = useContext(P42Context);
	const forms = useFormContext();

	// if (p42.readState !== ActionState.DONE) {
	if (!p42.itemDataReady) {
		return false;
	}

	if (p42.editing) {
		return (
			<P42DialogEditButtons
				onSave={forms.handleSubmit(
					p42.onEditorSubmit,
					p42.onEditorSubmitError
				)}
				onCancel={
					p42.updating ? p42.confirmReturn : p42.confirmQuitCreating
				}
				loading={p42.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<P42DialogViewButtons
			onEdit={p42.canUpdate ? p42.promptUpdating : null}
			onDelete={p42.canDelete ? p42.confirmDelete : null}
			onSideDrawerOpen={p42.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

P42DialogButtonsContainer.displayName = "P42DialogButtonsContainer";




