import { D07Context } from "@/contexts/D07/D07Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D07DialogForm from "./D07DialogForm";
import { D07DialogToolbarContainer } from "./toolbar/D07DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const D07DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const d07 = useContext(D07Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d07.creating) {
			return "建立試算單";
		} else if (d07.updating) {
			return "修改試算單";
		} else {
			return "試算單內容";
		}
	}, [d07.creating, d07.updating]);

	const handleClose = useMemo(() => {
		return d07.creating
			? d07.confirmQuitCreating
			: d07.updating
			? d07.confirmQuitUpdating
			: d07.reading
			? d07.cancelAction
			: null;
	}, [
		d07.cancelAction,
		d07.confirmQuitCreating,
		d07.confirmQuitUpdating,
		d07.creating,
		d07.reading,
		d07.updating,
	]);

	const handleSubmit = form.handleSubmit(
		d07.onEditorSubmit,
		d07.onEditorSubmitError
	);

	useEffect(() => {
		if (d07.itemDataReady) {
			console.log("d07 form reset", d07.itemData);
			reset(d07.itemData);
		}
	}, [d07.itemData, d07.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={D07DialogToolbarContainer}
				open={d07.itemViewOpen}
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
				<D07DialogForm
					onSubmit={handleSubmit}
					creating={d07.creating}
					editing={d07.editing}
					updating={d07.updating}
					readWorking={d07.readWorking}
					readError={d07.readError}
					data={d07.itemData}
					itemDataReady={d07.itemDataReady}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

D07DialogContainer.displayName = "D07DialogContainer";
