/* eslint-disable no-mixed-spaces-and-tabs */
import { A20Context } from "@/contexts/A20/A20Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import A20DialogEditButtons from "./A20DialogEditButtons";
import A20DialogViewButtons from "./A20DialogViewButtons";

export const A20DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const a20 = useContext(A20Context);
	const forms = useFormContext();

	// if (a20.readState !== ActionState.DONE) {
	if (!a20.itemDataReady) {
		return false;
	}

	if (a20.editing) {
		return (
			<A20DialogEditButtons
				onSave={forms.handleSubmit(
					a20.onEditorSubmit,
					a20.onEditorSubmitError
				)}
				onCancel={
					a20.updating ? a20.confirmReturn : a20.confirmQuitCreating
				}
				loading={a20.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<A20DialogViewButtons
			onEdit={a20.canUpdate ? a20.promptUpdating : null}
			onDelete={a20.canDelete ? a20.confirmDelete : null}
			{...rest}
		/>
	);
};

A20DialogButtonsContainer.displayName = "A20DialogButtonsContainer";
