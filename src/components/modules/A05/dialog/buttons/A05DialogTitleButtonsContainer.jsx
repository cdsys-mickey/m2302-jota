/* eslint-disable no-mixed-spaces-and-tabs */
import { A05Context } from "@/contexts/A05/A05Context";
import A05 from "@/modules/md-a05";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import ActionState from "../../../../../shared-constants/action-state";
import A05DialogTitleEditButtons from "./A05DialogTitleEditButtons";
import A05DialogTitleViewButtons from "./A05DialogTitleViewButtons";

export const A05DialogTitleButtonsContainer = (props) => {
	const { ...rest } = props;
	const a05 = useContext(A05Context);
	const forms = useFormContext();

	if (a05.readState !== ActionState.DONE) {
		return false;
	}

	if (a05.editing) {
		return (
			<A05DialogTitleEditButtons
				onSave={forms.handleSubmit(
					a05.onEditorSubmit,
					a05.onEditorSubmitError
				)}
				loading={a05.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<A05DialogTitleViewButtons
			onEdit={a05.updatePrompt}
			onDelete={a05.confirmDelete}
			{...rest}
		/>
	);
};

A05DialogTitleButtonsContainer.displayName = "A05DialogTitleButtonsContainer";
