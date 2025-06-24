/* eslint-disable no-mixed-spaces-and-tabs */
import { P35Context } from "@/modules/P35/P35Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import P35DialogEditButtons from "./P35DialogEditButtons";
import P35DialogViewButtons from "./P35DialogViewButtons";

export const P35DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const p35 = useContext(P35Context);
	const forms = useFormContext();

	// if (p35.readState !== ActionState.DONE) {
	if (!p35.itemDataReady) {
		return false;
	}

	if (p35.editing) {
		return (
			<P35DialogEditButtons
				onSave={forms.handleSubmit(
					p35.onEditorSubmit,
					p35.onEditorSubmitError
				)}
				onCancel={
					p35.updating ? p35.confirmReturn : p35.confirmQuitCreating
				}
				loading={p35.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<P35DialogViewButtons
			onEdit={p35.canUpdate ? p35.promptUpdating : null}
			onDelete={p35.canDelete ? p35.confirmDelete : null}
			onSideDrawerOpen={p35.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

P35DialogButtonsContainer.displayName = "P35DialogButtonsContainer";


