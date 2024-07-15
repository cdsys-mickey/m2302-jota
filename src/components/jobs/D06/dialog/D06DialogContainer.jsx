import { D06Context } from "@/contexts/D06/D06Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D06DialogForm from "./D06DialogForm";
import { D06DialogToolbarContainer } from "./toolbar/D06DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const D06DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const d06 = useContext(D06Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d06.creating) {
			return "建立結餘單";
		} else if (d06.updating) {
			return "修改結餘單";
		} else {
			return "結餘單內容";
		}
	}, [d06.creating, d06.updating]);

	const handleClose = useMemo(() => {
		return d06.creating
			? d06.confirmQuitCreating
			: d06.updating
			? d06.confirmQuitUpdating
			: d06.reading
			? d06.cancelAction
			: null;
	}, [
		d06.cancelAction,
		d06.confirmQuitCreating,
		d06.confirmQuitUpdating,
		d06.creating,
		d06.reading,
		d06.updating,
	]);

	const handleSubmit = form.handleSubmit(
		d06.onEditorSubmit,
		d06.onEditorSubmitError
	);

	useEffect(() => {
		if (d06.itemDataReady) {
			console.log("d06 form reset", d06.itemData);
			reset(d06.itemData);
		}
	}, [d06.itemData, d06.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={D06DialogToolbarContainer}
				open={d06.itemViewOpen}
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
				<D06DialogForm
					onSubmit={handleSubmit}
					creating={d06.creating}
					editing={d06.editing}
					updating={d06.updating}
					readWorking={d06.readWorking}
					readError={d06.readError}
					data={d06.itemData}
					itemDataReady={d06.itemDataReady}
					handleRemDateChanged={d06.handleRemDateChanged({
						setValue: form.setValue,
					})}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

D06DialogContainer.displayName = "D06DialogContainer";
