import { D01Context } from "@/contexts/D01/D01Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D01DialogForm from "./D01DialogForm";
import { D01DialogToolbarContainer } from "./toolbar/D01DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const D01DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;
	const supplier = useWatch({
		name: "supplier",
		control: form.control,
	});

	const d01 = useContext(D01Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d01.creating) {
			return "建立領料單";
		} else if (d01.updating) {
			return "修改領料單";
		} else {
			return "領料單內容";
		}
	}, [d01.creating, d01.updating]);

	const handleClose = useMemo(() => {
		return d01.creating
			? d01.confirmQuitCreating
			: d01.updating
			? d01.confirmQuitUpdating
			: d01.reading
			? d01.cancelAction
			: null;
	}, [
		d01.cancelAction,
		d01.confirmQuitCreating,
		d01.confirmQuitUpdating,
		d01.creating,
		d01.reading,
		d01.updating,
	]);

	const handleSubmit = form.handleSubmit(
		d01.onEditorSubmit,
		d01.onEditorSubmitError
	);

	useEffect(() => {
		if (d01.itemDataReady) {
			console.log("d01 form reset", d01.itemData);
			reset(d01.itemData);
		}
	}, [d01.itemData, d01.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={D01DialogToolbarContainer}
				open={d01.itemViewOpen}
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
				<D01DialogForm
					onSubmit={handleSubmit}
					creating={d01.creating}
					editing={d01.editing}
					updating={d01.updating}
					readWorking={d01.readWorking}
					readError={d01.readError}
					data={d01.itemData}
					itemDataReady={d01.itemDataReady}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

D01DialogContainer.displayName = "D01DialogContainer";
