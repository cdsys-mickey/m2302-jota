/* eslint-disable no-mixed-spaces-and-tabs */
import { A06Context } from "@/contexts/A06/A06Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import ActionState from "../../../../../shared-constants/action-state";
import A06DialogTitleEditButtons from "./A06DialogTitleEditButtons";
import A06DialogTitleViewButtons from "./A06DialogTitleViewButtons";
import A06 from "../../../../../modules/md-a06";

export const A06DialogTitleButtonsContainer = (props) => {
	const { ...rest } = props;
	const a06 = useContext(A06Context);
	const forms = useFormContext();

	// if (a06.readState !== ActionState.DONE) {
	if (!a06.itemDataReady) {
		return false;
	}

	if (a06.editing) {
		return (
			<A06DialogTitleEditButtons
				onSave={forms.handleSubmit(
					a06.onEditorSubmit,
					a06.onEditorSubmitError
				)}
				loading={a06.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<A06DialogTitleViewButtons
			onEdit={a06.promptUpdating}
			onDelete={a06.confirmDelete}
			onReview={
				a06.mode === A06.Mode.NEW_CUSTOMER ? a06.promptReview : null
			}
			{...rest}
		/>
	);
};

A06DialogTitleButtonsContainer.displayName = "A06DialogTitleButtonsContainer";
