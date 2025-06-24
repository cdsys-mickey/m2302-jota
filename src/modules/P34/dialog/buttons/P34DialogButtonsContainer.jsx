/* eslint-disable no-mixed-spaces-and-tabs */
import { P34Context } from "@/modules/P34/P34Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import P34DialogEditButtons from "./P34DialogEditButtons";
import P34DialogViewButtons from "./P34DialogViewButtons";

export const P34DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const p34 = useContext(P34Context);
	const forms = useFormContext();

	// if (p34.readState !== ActionState.DONE) {
	if (!p34.itemDataReady) {
		return false;
	}

	if (p34.editing) {
		return (
			<P34DialogEditButtons
				onSave={forms.handleSubmit(
					p34.onEditorSubmit,
					p34.onEditorSubmitError
				)}
				onCancel={
					p34.updating ? p34.confirmReturn : p34.confirmQuitCreating
				}
				loading={p34.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<P34DialogViewButtons
			onEdit={p34.canUpdate ? p34.promptUpdating : null}
			onDelete={p34.canDelete ? p34.confirmDelete : null}
			onSideDrawerOpen={p34.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

P34DialogButtonsContainer.displayName = "P34DialogButtonsContainer";

