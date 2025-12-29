/* eslint-disable no-mixed-spaces-and-tabs */
import { F01Context } from "@/modules/F01/F01Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import F01DialogEditToolbar from "./F01DialogEditToolbar";
import F01DialogViewToolbar from "./F01DialogViewToolbar";
import { AuthContext } from "@/contexts/auth/AuthContext";

export const F01DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const f01 = useContext(F01Context);
	const auth = useContext(AuthContext);
	const form = useFormContext();

	const handlePrint = form.handleSubmit(
		f01.onPrintSubmit,
		f01.onPrintSubmitError
	);

	const handleDebugPrint = form.handleSubmit(
		f01.onDebugPrint,
	);


	if (!f01.itemDataReady) {
		return false;
	}

	if (f01.editing) {
		return (
			<F01DialogEditToolbar
				onLoadProds={f01.promptImportProds}
				onSave={form.handleSubmit(
					f01.onEditorSubmit,
					f01.onEditorSubmitError
				)}
				onCancel={
					f01.updating
						? f01.confirmReturnReading
						: f01.confirmQuitCreating
				}
				loading={f01.editWorking}
				{...rest}
			/>
		);
	}

	return (
		<F01DialogViewToolbar
			onEdit={f01.canUpdate ? f01.promptUpdating : null}
			onDelete={f01.canDelete ? f01.confirmDelete : null}
			onPrint={f01.canPrint ? handlePrint : null}
			onDebugPrint={auth.debugEnabled ? handleDebugPrint : null}
			onSideDrawerOpen={f01.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

F01DialogToolbarContainer.displayName = "F01DialogToolbarContainer";

