/* eslint-disable no-mixed-spaces-and-tabs */
import { F03Context } from "@/contexts/F03/F03Context";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import F03DialogEditToolbar from "./F03DialogEditToolbar";
import F03DialogViewToolbar from "./F03DialogViewToolbar";
import { useMemo } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";

export const F03DialogToolbarContainer = (props) => {
	const { ...rest } = props;
	const auth = useContext(AuthContext);
	const f03 = useContext(F03Context);
	const form = useFormContext();

	const canDelete = useMemo(() => {
		return f03.canDelete;
	}, [f03.canDelete]);

	const handlePrint = form.handleSubmit(
		f03.onPrintSubmit,
		f03.onPrintSubmitError
	);

	const handleDebugPrint = form.handleSubmit(
		f03.onDebugPrint,
	);


	if (!f03.itemDataReady) {
		return false;
	}

	if (f03.editing) {
		return (
			<F03DialogEditToolbar
				onSave={form.handleSubmit(
					f03.onEditorSubmit,
					f03.onEditorSubmitError
				)}
				editWorking={f03.editWorking}
				onCancel={
					f03.updating
						? f03.confirmReturnReading
						: f03.confirmQuitCreating
				}
				{...rest}
			/>
		);
	}

	return (
		<F03DialogViewToolbar
			// onEdit={f03.canUpdate ? f03.promptUpdating : null}
			onEdit={f03.canUpdate ? f03.promptUpdating : null}
			onDelete={canDelete ? f03.confirmDelete : null}
			onPrint={f03.canPrint ? handlePrint : null}
			onDebugPrint={auth.debugEnabled ? handleDebugPrint : null}
			onSideDrawerOpen={f03.handleSideDrawerOpen}
			{...rest}
		/>
	);
};

F03DialogToolbarContainer.displayName = "F03DialogToolbarContainer";

