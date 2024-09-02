/* eslint-disable no-mixed-spaces-and-tabs */
import { C02Context } from "@/contexts/C02/C02Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import C02DialogEditToolbar from "./C02DialogEditToolbar";
import C02DialogViewToolbar from "./C02DialogViewToolbar";
import { useMemo } from "react";

export const C02DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const c02 = useContext(C02Context);
	const form = useFormContext();

	const canEdit = useMemo(() => {
		return c02.canUpdate && !c02.itemData?.Checker_N;
	}, [c02.canUpdate, c02.itemData?.Checker_N]);

	const canReview = useMemo(() => {
		return c02.canReview && !c02.itemData?.Checker_N;
	}, [c02.canReview, c02.itemData?.Checker_N]);

	const canReject = useMemo(() => {
		return c02.canReject && !!c02.itemData?.Checker_N;
	}, [c02.canReject, c02.itemData?.Checker_N]);

	const canDelete = useMemo(() => {
		return c02.canDelete && !c02.itemData?.Checker_N;
	}, [c02.canDelete, c02.itemData?.Checker_N]);

	const handlePrint = form.handleSubmit(
		c02.onPrintSubmit,
		c02.onPrintSubmitError
	);

	if (!c02.itemDataReady) {
		return false;
	}

	if (c02.editing) {
		return (
			<C02DialogEditToolbar
				onSave={form.handleSubmit(
					c02.onEditorSubmit,
					c02.onEditorSubmitError
				)}
				onCancel={
					c02.updating
						? c02.confirmReturnReading
						: c02.confirmQuitCreating
				}
				loading={c02.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<C02DialogViewToolbar
			onEdit={canEdit ? c02.promptUpdating : null}
			onDelete={canDelete ? c02.confirmDelete : null}
			// 移到 C02ReviewButtonContainer
			// onReview={canReview ? c02.promptReview : null}
			onReject={canReject ? c02.promptReject : null}
			onPrint={c02.canPrint ? handlePrint : null}
			onSideDrawerOpen={c02.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

C02DialogToolbarContainer.displayName = "C02DialogToolbarContainer";
