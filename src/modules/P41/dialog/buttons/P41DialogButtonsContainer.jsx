/* eslint-disable no-mixed-spaces-and-tabs */
import { P41Context } from "@/modules/P41/P41Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import P41DialogEditButtons from "./P41DialogEditButtons";
import P41DialogViewButtons from "./P41DialogViewButtons";
import { useMemo } from "react";

export const P41DialogButtonsContainer = (props) => {
	const { ...rest } = props;
	const p41 = useContext(P41Context);
	const forms = useFormContext();

	const _onEdit = useMemo(() => {
		return p41.canUpdate
			? (!p41.itemData?.ComID ? p41.promptUpdating : null)
			: null;
	}, [p41.canUpdate, p41.itemData?.ComID, p41.promptUpdating])

	const _onDelete = useMemo(() => {
		return p41.canDelete
			? (!p41.itemData?.ComID ? p41.confirmDelete : null)
			: null
	}, [p41.canDelete, p41.confirmDelete, p41.itemData?.ComID])

	if (!p41.itemDataReady) {
		return false;
	}

	if (p41.editing) {
		return (
			<P41DialogEditButtons
				onSave={forms.handleSubmit(
					p41.onEditorSubmit,
					p41.onEditorSubmitError
				)}
				onCancel={
					p41.updating ? p41.confirmReturn : p41.confirmQuitCreating
				}
				loading={p41.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<P41DialogViewButtons
			onEdit={_onEdit}
			onDelete={_onDelete}
			onConvert={p41.gotoP42}
			onSideDrawerOpen={p41.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

P41DialogButtonsContainer.displayName = "P41DialogButtonsContainer";



