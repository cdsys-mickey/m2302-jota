/* eslint-disable no-mixed-spaces-and-tabs */
import { C03Context } from "@/contexts/C03/C03Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C03DialogEditToolbar from "./C03DialogEditToolbar";
import C03DialogViewToolbar from "./C03DialogViewToolbar";
import { useMemo } from "react";

export const C03DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c03 = useContext(C03Context);
	const form = useFormContext();

	const canReview = useMemo(() => {
		return c03.canReview && !c03.itemData?.Checker_N;
	}, [c03.canReview, c03.itemData?.Checker_N]);

	const canReject = useMemo(() => {
		return (
			c03.canReject &&
			!!c03.itemData?.Checker_N &&
			c03.itemData?.squared?.id !== "*"
		);
	}, [c03.canReject, c03.itemData?.Checker_N, c03.itemData?.squared?.id]);

	const canEdit = useMemo(() => {
		return c03.canUpdate && !c03.itemData?.Checker_N;
	}, [c03.canUpdate, c03.itemData?.Checker_N]);

	const canDelete = useMemo(() => {
		return c03.canDelete && !c03.itemData?.Checker_N;
	}, [c03.canDelete, c03.itemData?.Checker_N]);

	const handlePrint = form.handleSubmit(
		c03.onPrintSubmit,
		c03.onPrintSubmitError
	);

	if (!c03.itemDataReady) {
		return false;
	}

	if (c03.editing) {
		return (
			<C03DialogEditToolbar
				onSave={form.handleSubmit(
					c03.onEditorSubmit,
					c03.onEditorSubmitError
				)}
				onCancel={
					c03.updating
						? c03.confirmReturnReading
						: c03.confirmQuitCreating
				}
				loading={c03.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<C03DialogViewToolbar
			onEdit={canEdit ? c03.promptUpdating : null}
			onDelete={canDelete ? c03.confirmDelete : null}
			onReview={canReview ? c03.promptReview : null}
			onReject={canReject ? c03.promptReject : null}
			onPrint={c03.canPrint ? handlePrint : null}
			{...rest}
		/>
	);
};

C03DialogToolbarContainer.displayName = "C03DialogToolbarContainer";
