/* eslint-disable no-mixed-spaces-and-tabs */
import { B05Context } from "@/contexts/B05/B05Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import B05DialogEditToolbar from "./B05DialogEditToolbar";
import B05DialogTitleViewButtons from "./B05DialogViewToolbar";

export const B05DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const b05 = useContext(B05Context);
	const forms = useFormContext();

	if (!b05.itemDataReady) {
		return false;
	}

	if (b05.editing) {
		return (
			<B05DialogEditToolbar
				onLoadProds={b05.promptImportProds}
				onSave={forms.handleSubmit(
					b05.onEditorSubmit,
					b05.onEditorSubmitError
				)}
				onCancel={
					b05.updating
						? b05.confirmReturnReading
						: b05.confirmQuitCreating
				}
				loading={b05.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<B05DialogTitleViewButtons
			onEdit={b05.canUpdate ? b05.promptUpdating : null}
			onDelete={b05.canDelete ? b05.confirmDelete : null}
			{...rest}
		/>
	);
};

B05DialogToolbarContainer.displayName = "B05DialogToolbarContainer";
