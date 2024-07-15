import { D05Context } from "@/contexts/D05/D05Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D05DialogForm from "./D05DialogForm";
import { D05DialogToolbarContainer } from "./toolbar/D05DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const D05DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const d05 = useContext(D05Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d05.creating) {
			return "建立報廢單";
		} else if (d05.updating) {
			return "修改報廢單";
		} else {
			return "報廢單內容";
		}
	}, [d05.creating, d05.updating]);

	const handleClose = useMemo(() => {
		return d05.creating
			? d05.confirmQuitCreating
			: d05.updating
			? d05.confirmQuitUpdating
			: d05.reading
			? d05.cancelAction
			: null;
	}, [
		d05.cancelAction,
		d05.confirmQuitCreating,
		d05.confirmQuitUpdating,
		d05.creating,
		d05.reading,
		d05.updating,
	]);

	const handleSubmit = form.handleSubmit(
		d05.onEditorSubmit,
		d05.onEditorSubmitError
	);

	useEffect(() => {
		if (d05.itemDataReady) {
			console.log("d05 form reset", d05.itemData);
			reset(d05.itemData);
		}
	}, [d05.itemData, d05.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={D05DialogToolbarContainer}
				open={d05.itemViewOpen}
				onClose={handleClose}
				// onReturn={handleReturn}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: Colors.DIALOG_BG,
					},
				}}
				contentSx={[
					{
						minHeight: "30em",
						paddingTop: 0,
						// paddingLeft: 0,
						// paddingRight: 0,
					},
					scrollable.scroller,
				]}
				{...rest}>
				<D05DialogForm
					onSubmit={handleSubmit}
					creating={d05.creating}
					editing={d05.editing}
					updating={d05.updating}
					readWorking={d05.readWorking}
					readError={d05.readError}
					data={d05.itemData}
					itemDataReady={d05.itemDataReady}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

D05DialogContainer.displayName = "D05DialogContainer";
