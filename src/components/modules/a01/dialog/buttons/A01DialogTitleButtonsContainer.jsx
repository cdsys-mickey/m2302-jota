/* eslint-disable no-mixed-spaces-and-tabs */
import { forwardRef, useContext } from "react";
import { A01Context } from "@/contexts/A01/A01Context";
import A01DialogTitleEditButtons from "./A01DialogTitleEditButtons";
import A01DialogTitleViewButtons from "./A01DialogTitleViewButtons";
import ActionState from "../../../../../shared-constants/action-state";
import { useFormContext } from "react-hook-form";
import A01 from "@/modules/md-a01";

export const A01DialogTitleButtonsContainer = (props) => {
	const { ...rest } = props;
	const a01 = useContext(A01Context);
	const forms = useFormContext();

	// if (a01.readState !== ActionState.DONE) {
	if (!a01.itemDataReady) {
		return false;
	}

	if (a01.editing) {
		return (
			<A01DialogTitleEditButtons
				onSave={
					a01.mode === A01.Mode.STORE
						? forms.handleSubmit(
								a01.onCounterSubmit,
								a01.onCounterSubmitError
						  )
						: forms.handleSubmit(
								a01.onEditorSubmit,
								a01.onEditorSubmitError
						  )
				}
				loading={a01.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<A01DialogTitleViewButtons
			onEdit={a01.canUpdate ? a01.promptUpdating : null}
			onDelete={a01.canDelete ? a01.confirmDelete : null}
			onReview={
				a01.mode === A01.Mode.NEW_PROD && a01.canReview
					? a01.promptReview
					: null
			}
			{...rest}
		/>
	);
};

A01DialogTitleButtonsContainer.displayName = "A01DialogTitleButtonsContainer";
