/* eslint-disable no-mixed-spaces-and-tabs */
import { C01Context } from "@/contexts/C01/C01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C01DialogEditToolbar from "./C01DialogEditToolbar";
import C01DialogViewToolbar from "./C01DialogViewToolbar";
import { useMemo } from "react";

export const C01DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c01 = useContext(C01Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return c01.canDelete && !c01.itemData?.Checker_N;
	}, [c01.canDelete, c01.itemData?.Checker_N]);

	const handlePrint = form.handleSubmit(
		c01.onPrintSubmit,
		c01.onPrintSubmitError
	);

	if (!c01.itemDataReady) {
		return false;
	}

	if (c01.editing) {
		return (
			<C01DialogEditToolbar
				onSave={form.handleSubmit(
					c01.onEditorSubmit,
					c01.onEditorSubmitError
				)}
				onCancel={
					c01.updating
						? c01.confirmReturnReading
						: c01.confirmQuitCreating
				}
				loading={c01.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<C01DialogViewToolbar
			onEdit={c01.canUpdate ? c01.promptUpdating : null}
			onDelete={canDelete ? c01.confirmDelete : null}
			onTransform={c01.canManage ? c01.promptTransform : null}
			onPrint={c01.canPrint ? handlePrint : null}
			onSideDrawerOpen={c01.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

C01DialogToolbarContainer.displayName = "C01DialogToolbarContainer";
