/* eslint-disable no-mixed-spaces-and-tabs */
import { B011Context } from "@/contexts/B011/B011Context";
import { B031Context } from "@/contexts/B031/B031Context";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import B011DialogEditToolbar from "./B011DialogEditToolbar";
import B011DialogViewToolbar from "./B011DialogViewToolbar";
import { BContext } from "@/contexts/B/BContext";

export const B011DialogToolbarContainer = (props) => {
	const { forNew = false, ...rest } = props;
	const b = useContext(BContext);
	const b011 = useContext(b.forNew ? B031Context : B011Context);
	const form = useFormContext();
	// const handlePrint = form.handleSubmit(
	// 	b011.onPrintSubmit,
	// 	b011.onPrintSubmitError
	// );

	if (!b011.itemDataReady) {
		return false;
	}

	if (b011.editing) {
		return (
			<B011DialogEditToolbar
				onLoadProds={b011.creating ? b011.promptImportProds : null}
				onSave={form.handleSubmit(
					b011.onEditorSubmit,
					b011.onEditorSubmitError
				)}
				onCancel={
					b011.updating
						? b011.confirmReturnReading
						: b011.confirmQuitCreating
				}
				loading={b011.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<B011DialogViewToolbar
			onEdit={b011.canUpdate ? b011.promptUpdating : null}
			// onDelete={b011.canDelete ? b011.confirmDelete : null}
			// onPrint={b011.canPrint ? handlePrint : null}
			onSideDrawerOpen={b011.handleSideDrawerOpen}
			{...rest}
		/>
	);
};
B011DialogToolbarContainer.propTypes = {
	forNew: PropTypes.bool
}
B011DialogToolbarContainer.displayName = "B011DialogToolbarContainer";

