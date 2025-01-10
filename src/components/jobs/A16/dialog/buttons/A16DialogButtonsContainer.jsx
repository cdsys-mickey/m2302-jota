/* eslint-disable no-mixed-spaces-and-tabs */
import { A16Context } from "@/contexts/A16/A16Context";
import A16 from "@/modules/md-a16";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import ActionState from "../../../../../shared-constants/action-state";
import A16DialogEditButtons from "./A16DialogEditButtons";
import A16DialogViewButtons from "./A16DialogViewButtons";

export const A16DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const a16 = useContext(A16Context);
	const forms = useFormContext();

	// if (a16.readState !== ActionState.DONE) {
	if (!a16.itemDataReady) {
		return false;
	}

	if (a16.editing) {
		return (
			<A16DialogEditButtons
				onSave={forms.handleSubmit(
					a16.onEditorSubmit,
					a16.onEditorSubmitError
				)}
				onCancel={
					a16.updating ? a16.confirmReturn : a16.confirmQuitCreating
				}
				loading={a16.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<A16DialogViewButtons
			onEdit={a16.canUpdate ? a16.promptUpdating : null}
			onDelete={a16.canDelete ? a16.confirmDelete : null}
			onSideDrawerOpen={a16.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

A16DialogButtonsContainer.displayName = "A16DialogButtonsContainer";

