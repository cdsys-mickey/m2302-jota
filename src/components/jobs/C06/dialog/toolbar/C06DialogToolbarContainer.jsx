/* eslint-disable no-mixed-spaces-and-tabs */
import { C06Context } from "@/contexts/C06/C06Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C06DialogEditToolbar from "./C06DialogEditToolbar";
import C06DialogViewToolbar from "./C06DialogViewToolbar";
import { useMemo } from "react";

export const C06DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c06 = useContext(C06Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return c06.canDelete;
	}, [c06.canDelete]);

	const handlePrint = form.handleSubmit(
		c06.onPrintSubmit,
		c06.onPrintSubmitError
	);

	if (!c06.itemDataReady) {
		return false;
	}

	if (c06.editing) {
		return (
			<C06DialogEditToolbar
				onRefresh={c06.handleRefresh({
					setValue: form.setValue,
					getValues: form.getValues,
				})}
				refreshWorking={c06.refreshWorking}
				onSave={form.handleSubmit(
					c06.onEditorSubmit,
					c06.onEditorSubmitError
				)}
				editWorking={c06.editWorking}
				onCancel={
					c06.updating
						? c06.confirmReturnReading
						: c06.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<C06DialogViewToolbar
			onEdit={c06.canUpdate ? c06.promptUpdating : null}
			onDelete={c06.canDelete ? c06.confirmDelete : null}
			onPrint={c06.canPrint ? handlePrint : null}
			onSideDrawerOpen={c06.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

C06DialogToolbarContainer.displayName = "C06DialogToolbarContainer";
