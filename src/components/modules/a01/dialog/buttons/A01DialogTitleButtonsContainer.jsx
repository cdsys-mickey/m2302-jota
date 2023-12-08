import { forwardRef, useContext } from "react";
import { A01Context } from "@/contexts/a01/A01Context";
import A01DialogTitleEditButtons from "./A01DialogTitleEditButtons";
import A01DialogTitleViewButtons from "./A01DialogTitleViewButtons";
import ActionState from "../../../../../shared-constants/action-state";
import { useFormContext } from "react-hook-form";
import A01 from "@/modules/md-a01";

export const A01DialogTitleButtonsContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const a01 = useContext(A01Context);
	const forms = useFormContext();

	if (a01.editing) {
		return (
			<A01DialogTitleEditButtons
				onSave={forms.handleSubmit(
					a01.onEditorSubmit,
					a01.onEditorSubmitError
				)}
				loading={a01.createWorking || a01.updateWorking}
				ref={ref}
				{...rest}
			/>
		);
	}

	if (a01.readState !== ActionState.DONE) {
		return false;
	}

	return (
		<A01DialogTitleViewButtons
			ref={ref}
			onEdit={a01.updatePrompt}
			onDelete={a01.confirmDelete}
			onReview={a01.mode === A01.Mode.NEW_PROD ? a01.reviewPrompt : null}
			{...rest}
		/>
	);
});

A01DialogTitleButtonsContainer.displayName = "A01DialogTitleButtonsContainer";
