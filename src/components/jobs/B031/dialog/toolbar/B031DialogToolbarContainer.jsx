/* eslint-disable no-mixed-spaces-and-tabs */
import { B031Context } from "@/contexts/B031/B031Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import B031DialogEditToolbar from "./B031DialogEditToolbar";
import B031DialogViewToolbar from "./B031DialogViewToolbar";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";

export const B031DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const b031 = useContext(B031Context);
	const form = useFormContext();
	const handlePrint = form.handleSubmit(
		b031.onPrintSubmit,
		b031.onPrintSubmitError
	);

	if (!b031.itemDataReady) {
		return false;
	}

	if (b031.editing) {
		return (
			<B031DialogEditToolbar
				onLoadProds={b031.creating ? b031.promptImportProds : null}
				onSave={form.handleSubmit(
					b031.onEditorSubmit,
					b031.onEditorSubmitError
				)}
				onCancel={
					b031.updating
						? b031.confirmReturnReading
						: b031.confirmQuitCreating
				}
				loading={b031.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<B031DialogViewToolbar
			onEdit={b031.canUpdate ? b031.promptUpdating : null}
			onDelete={b031.canDelete ? b031.confirmDelete : null}
			onPrint={b031.canPrint ? handlePrint : null}
			onSideDrawerOpen={b031.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

B031DialogToolbarContainer.displayName = "B031DialogToolbarContainer";


