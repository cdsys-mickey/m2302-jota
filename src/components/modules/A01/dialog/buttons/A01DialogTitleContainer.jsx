/* eslint-disable no-mixed-spaces-and-tabs */
import { A01Context } from "@/contexts/A01/A01Context";
import A01 from "@/modules/md-a01";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import A01DialogEditToolbar from "./A01DialogEditToolbar";
import A01DialogTitleViewButtons from "./A01DialogViewToolbar";

export const A01DialogTitleContainer = (props) => {
	const { ...rest } = props;
	const a01 = useContext(A01Context);
	const forms = useFormContext();

	// if (a01.readState !== ActionState.DONE) {
	if (!a01.itemDataReady) {
		return false;
	}

	if (a01.editing) {
		return (
			<A01DialogEditToolbar
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
				onCancel={
					a01.updating ? a01.confirmReturn : a01.confirmQuitCreating
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

A01DialogTitleContainer.displayName = "A01DialogTitleContainer";
