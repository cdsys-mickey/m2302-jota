/* eslint-disable no-mixed-spaces-and-tabs */
import { P36Context } from "@/modules/P36/P36Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import P36DialogEditButtons from "./P36DialogEditButtons";
import P36DialogViewButtons from "./P36DialogViewButtons";

export const P36DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const p36 = useContext(P36Context);
	const forms = useFormContext();

	// if (p36.readState !== ActionState.DONE) {
	if (!p36.itemDataReady) {
		return false;
	}

	if (p36.editing) {
		return (
			<P36DialogEditButtons
				onSave={forms.handleSubmit(
					p36.onEditorSubmit,
					p36.onEditorSubmitError
				)}
				onCancel={
					p36.updating ? p36.confirmReturn : p36.confirmQuitCreating
				}
				loading={p36.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<P36DialogViewButtons
			onEdit={p36.canUpdate ? p36.promptUpdating : null}
			onDelete={p36.canDelete ? p36.confirmDelete : null}
			onSideDrawerOpen={p36.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

P36DialogButtonsContainer.displayName = "P36DialogButtonsContainer";



