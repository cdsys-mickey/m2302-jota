/* eslint-disable no-mixed-spaces-and-tabs */
import { A05Context } from "@/contexts/A05/A05Context";
import A05 from "@/modules/md-a05";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import ActionState from "../../../../../shared-constants/action-state";
import A05DialogEditButtons from "./A05DialogEditButtons";
import A05DialogViewButtons from "./A05DialogViewButtons";

export const A05DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const a05 = useContext(A05Context);
	const forms = useFormContext();

	// if (a05.readState !== ActionState.DONE) {
	if (!a05.itemDataReady) {
		return false;
	}

	if (a05.editing) {
		return (
			<A05DialogEditButtons
				onSave={forms.handleSubmit(
					a05.onEditorSubmit,
					a05.onEditorSubmitError
				)}
				onCancel={
					a05.updating ? a05.confirmReturn : a05.confirmQuitCreating
				}
				loading={a05.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<A05DialogViewButtons
			onEdit={a05.canUpdate ? a05.promptUpdating : null}
			onDelete={a05.canDelete ? a05.confirmDelete : null}
			{...rest}
		/>
	);
};

A05DialogButtonsContainer.displayName = "A05DialogButtonsContainer";
