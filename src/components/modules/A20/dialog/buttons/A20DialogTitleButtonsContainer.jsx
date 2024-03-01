/* eslint-disable no-mixed-spaces-and-tabs */
import { A20Context } from "@/contexts/A20/A20Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import ActionState from "../../../../../shared-constants/action-state";
import A20DialogTitleEditButtons from "./A20DialogTitleEditButtons";
import A20DialogTitleViewButtons from "./A20DialogTitleViewButtons";

export const A20DialogTitleButtonsContainer = (props) => {
	const { ...rest } = props;
	const a20 = useContext(A20Context);
	const forms = useFormContext();

	// if (a20.readState !== ActionState.DONE) {
	if (!a20.itemDataReady) {
		return false;
	}

	if (a20.editing) {
		return (
			<A20DialogTitleEditButtons
				onSave={forms.handleSubmit(
					a20.onEditorSubmit,
					a20.onEditorSubmitError
				)}
				loading={a20.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<A20DialogTitleViewButtons
			onEdit={a20.canUpdate ? a20.promptUpdating : null}
			onDelete={a20.canDelete ? a20.confirmDelete : null}
			{...rest}
		/>
	);
};

A20DialogTitleButtonsContainer.displayName = "A20DialogTitleButtonsContainer";
