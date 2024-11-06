/* eslint-disable no-mixed-spaces-and-tabs */
import { B012Context } from "@/contexts/B012/B012Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import B012DialogEditToolbar from "./B012DialogEditToolbar";
import B012DialogViewToolbar from "./B012DialogViewToolbar";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";
import { BContext } from "@/contexts/B/BContext";
import { B032Context } from "@/contexts/B032/B032Context";

export const B012DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const b = useContext(BContext);
	const b012 = useContext(b.forNew ? B032Context : B012Context);
	const form = useFormContext();
	// const handlePrint = form.handleSubmit(
	// 	b012.onPrintSubmit,
	// 	b012.onPrintSubmitError
	// );

	if (!b012.itemDataReady) {
		return false;
	}

	if (b012.editing) {
		return (
			<B012DialogEditToolbar
				onImportCusts={b012.creating ? b012.promptImportCusts : null}
				onSave={form.handleSubmit(
					b012.onEditorSubmit,
					b012.onEditorSubmitError
				)}
				onCancel={
					b012.updating
						? b012.confirmReturnReading
						: b012.confirmQuitCreating
				}
				loading={b012.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<B012DialogViewToolbar
			onEdit={b012.canUpdate ? b012.promptUpdating : null}
			onDelete={b012.canDelete ? b012.confirmDelete : null}
			// onPrint={b012.canPrint ? handlePrint : null}
			onSideDrawerOpen={b012.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

B012DialogToolbarContainer.displayName = "B012DialogToolbarContainer";


