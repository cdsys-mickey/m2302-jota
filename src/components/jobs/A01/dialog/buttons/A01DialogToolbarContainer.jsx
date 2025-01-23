/* eslint-disable no-mixed-spaces-and-tabs */
import { A01Context } from "@/contexts/A01/A01Context";
import A01 from "@/modules/md-a01";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import A01DialogEditToolbar from "./A01DialogEditToolbar";
import A01DialogViewToolbar from "./A01DialogViewToolbar";
import { useMemo } from "react";

export const A01DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const a01 = useContext(A01Context);
	const forms = useFormContext();

	const editLabel = useMemo(() => {
		switch (a01.mode) {
			case A01.Mode.STORE:
				return "調整櫃位/安全存量";
			default:
				return "編輯";
		}
	}, [a01.mode]);

	const handleEdit = useMemo(() => {
		switch (a01.mode) {
			case A01.Mode.STORE:
				return a01.selectedTab === A01.Tabs.INFO
					? a01.canUpdate
						? a01.promptUpdating
						: null
					: null;
			default:
				return a01.canUpdate ? a01.promptUpdating : null;
		}
	}, [a01.canUpdate, a01.mode, a01.promptUpdating, a01.selectedTab]);

	const handleDelete = useMemo(() => {
		switch (a01.mode) {
			case A01.Mode.STORE:
				return null;
			default:
				return a01.canDelete ? a01.confirmDelete : null;
		}
	}, [a01.canDelete, a01.confirmDelete, a01.mode]);

	const handleReview = useMemo(() => {
		return a01.mode === A01.Mode.NEW_PROD && a01.canReview
			? a01.promptReview
			: null;
	}, [a01.canReview, a01.mode, a01.promptReview]);

	const handleSave = useMemo(() => {
		return a01.mode === A01.Mode.STORE
			? forms.handleSubmit(a01.onCounterSubmit, a01.onCounterSubmitError)
			: forms.handleSubmit(a01.onEditorSubmit, a01.onEditorSubmitError);
	}, [
		a01.mode,
		a01.onCounterSubmit,
		a01.onCounterSubmitError,
		a01.onEditorSubmit,
		a01.onEditorSubmitError,
		forms,
	]);

	const handleCancel = useMemo(() => {
		return a01.updating ? a01.confirmReturn : a01.confirmQuitCreating;
	}, [a01.confirmQuitCreating, a01.confirmReturn, a01.updating]);

	if (!a01.itemDataReady) {
		return false;
	}

	if (a01.editing) {
		return (
			<A01DialogEditToolbar
				onSave={handleSave}
				onCancel={handleCancel}
				loading={a01.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<A01DialogViewToolbar
			onEdit={handleEdit}
			onDelete={handleDelete}
			onReview={handleReview}
			editLabel={editLabel}
			onSideDrawerOpen={a01.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

A01DialogToolbarContainer.displayName = "A01DialogToolbarContainer";
