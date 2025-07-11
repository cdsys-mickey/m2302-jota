/* eslint-disable no-mixed-spaces-and-tabs */
import { B032Context } from "@/contexts/B032/B032Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import B032DialogEditToolbar from "./B032DialogEditToolbar";
import B032DialogViewToolbar from "./B032DialogViewToolbar";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import { useMemo } from "react";
import { B012Context } from "@/contexts/B012/B012Context";
import { BContext } from "@/contexts/B/BContext";

export const B032DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const b = useContext(BContext);
	const b032 = useContext(b.forNew ? B032Context : B012Context);
	const form = useFormContext();
	const handlePrint = form.handleSubmit(
		b032.onPrintSubmit,
		b032.onPrintSubmitError
	);

	if (!b032.itemDataReady) {
		return false;
	}

	if (b032.editing) {
		return (
			<B032DialogEditToolbar
				onImportCusts={b032.creating ? b032.promptImportCusts : null}
				onSave={form.handleSubmit(
					b032.onEditorSubmit,
					b032.onEditorSubmitError
				)}
				onCancel={
					b032.updating
						? b032.confirmReturnReading
						: b032.confirmQuitCreating
				}
				loading={b032.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<B032DialogViewToolbar
			onEdit={b032.canUpdate ? b032.promptUpdating : null}
			onDelete={b032.canDelete ? b032.confirmDelete : null}
			onPrint={b032.canPrint ? handlePrint : null}
			onSideDrawerOpen={b032.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

B032DialogToolbarContainer.displayName = "B032DialogToolbarContainer";



