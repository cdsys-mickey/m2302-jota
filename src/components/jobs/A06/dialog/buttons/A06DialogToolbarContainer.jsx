/* eslint-disable no-mixed-spaces-and-tabs */
import { A06Context } from "@/contexts/A06/A06Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import A06 from "@/modules/md-a06";
import A06DialogEditToolbar from "./A06DialogEditToolbar";
import A06DialogViewToolbar from "./A06DialogViewToolbar";

export const A06DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const a06 = useContext(A06Context);
	const forms = useFormContext();

	// if (a06.readState !== ActionState.DONE) {
	if (!a06.itemDataReady) {
		return false;
	}

	if (a06.editing) {
		return (
			<A06DialogEditToolbar
				onSave={forms.handleSubmit(
					a06.onEditorSubmit,
					a06.onEditorSubmitError
				)}
				onCancel={
					a06.updating ? a06.confirmReturn : a06.confirmQuitCreating
				}
				loading={a06.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<A06DialogViewToolbar
			onEdit={a06.canUpdate ? a06.promptUpdating : null}
			onDelete={a06.canDelete ? a06.confirmDelete : null}
			onReview={
				a06.canReview && a06.mode === A06.Mode.NEW_CUSTOMER
					? a06.promptReview
					: null
			}
			onSideDrawerOpen={a06.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

A06DialogToolbarContainer.displayName = "A06DialogToolbarContainer";
