/* eslint-disable no-mixed-spaces-and-tabs */
import { G02Context } from "@/modules/G02/G02Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import G02DialogEditToolbar from "./G02DialogEditToolbar";
import G02DialogViewToolbar from "./G02DialogViewToolbar";

export const G02DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const g02 = useContext(G02Context);
	const form = useFormContext();

	const handlePrint = form.handleSubmit(
		g02.onPrintSubmit,
		g02.onPrintSubmitError
	);

	if (!g02.itemDataReady) {
		return false;
	}

	if (g02.editing) {
		return (
			<G02DialogEditToolbar
				onLoadProds={g02.promptImportProds}
				onSave={form.handleSubmit(
					g02.onEditorSubmit,
					g02.onEditorSubmitError
				)}
				onCancel={
					g02.updating
						? g02.confirmReturnReading
						: g02.confirmQuitCreating
				}
				loading={g02.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<G02DialogViewToolbar
			onEdit={g02.canUpdate ? g02.promptUpdating : null}
			onDelete={g02.canDelete ? g02.confirmDelete : null}
			onPrint={g02.canPrint ? handlePrint : null}
			onSideDrawerOpen={g02.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

G02DialogToolbarContainer.displayName = "G02DialogToolbarContainer";

