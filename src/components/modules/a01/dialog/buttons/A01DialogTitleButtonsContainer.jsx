import { forwardRef, useContext } from "react";
import { A01Context } from "@/contexts/a01/A01Context";
import A01DialogTitleEditButtons from "./A01DialogTitleEditButtons";
import A01DialogTitleViewButtons from "./A01DialogTitleViewButtons";
import ActionState from "../../../../../shared-constants/action-state";
import { useFormContext } from "react-hook-form";

export const A01DialogTitleButtonsContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const a01 = useContext(A01Context);
	const forms = useFormContext();

	if (a01.editing) {
		return (
			<A01DialogTitleEditButtons
				onClick={forms.handleSubmit(
					a01.onEditorSubmit,
					a01.onEditorSubmitError
				)}
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
			onEdit={a01.promptUpdate}
			onDelete={a01.promptDelete}
			{...rest}
		/>
	);
});

A01DialogTitleButtonsContainer.displayName = "A01DialogTitleButtonsContainer";
