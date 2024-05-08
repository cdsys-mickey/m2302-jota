/* eslint-disable no-mixed-spaces-and-tabs */
import { C04Context } from "@/contexts/C04/C04Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C04DialogEditToolbar from "./C04DialogEditToolbar";
import C04DialogViewToolbar from "./C04DialogViewToolbar";
import { useMemo } from "react";

export const C04DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(C04Context);
	const form = useFormContext();

	const canReview = useMemo(() => {
		return c04.canReview && !c04.itemData?.Checker_N;
	}, [c04.canReview, c04.itemData?.Checker_N]);

	const canReject = useMemo(() => {
		return c04.canReject && !!c04.itemData?.Checker_N;
	}, [c04.canReject, c04.itemData?.Checker_N]);

	const canDelete = useMemo(() => {
		return c04.canDelete && !c04.itemData?.Checker_N;
	}, [c04.canDelete, c04.itemData?.Checker_N]);

	const handlePrint = form.handleSubmit(
		c04.onPrintSubmit,
		c04.onPrintSubmitError
	);

	if (!c04.itemDataReady) {
		return false;
	}

	if (c04.editing) {
		return (
			<C04DialogEditToolbar
				onSave={form.handleSubmit(
					c04.onEditorSubmit,
					c04.onEditorSubmitError
				)}
				onCancel={
					c04.updating
						? c04.confirmReturnReading
						: c04.confirmQuitCreating
				}
				loading={c04.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<C04DialogViewToolbar
			onEdit={c04.canUpdate ? c04.promptUpdating : null}
			onDelete={canDelete ? c04.confirmDelete : null}
			onReview={canReview ? c04.promptReview : null}
			onReject={canReject ? c04.promptReject : null}
			onPrint={c04.canPrint ? handlePrint : null}
			{...rest}
		/>
	);
};

C04DialogToolbarContainer.displayName = "C04DialogToolbarContainer";
