/* eslint-disable no-mixed-spaces-and-tabs */
import { P21Context } from "@/modules/P21/P21Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import P21DialogEditButtons from "./P21DialogEditButtons";
import P21DialogViewButtons from "./P21DialogViewButtons";

export const P21DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const p21 = useContext(P21Context);
	const forms = useFormContext();

	// if (p21.readState !== ActionState.DONE) {
	if (!p21.itemDataReady) {
		return false;
	}

	if (p21.editing) {
		return (
			<P21DialogEditButtons
				onSave={forms.handleSubmit(
					p21.onEditorSubmit,
					p21.onEditorSubmitError
				)}
				onCancel={
					p21.updating ? p21.confirmReturn : p21.confirmQuitCreating
				}
				loading={p21.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<P21DialogViewButtons
			onEdit={p21.canUpdate ? p21.promptUpdating : null}
			onDelete={p21.canDelete ? p21.confirmDelete : null}
			onSideDrawerOpen={p21.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

P21DialogButtonsContainer.displayName = "P21DialogButtonsContainer";


