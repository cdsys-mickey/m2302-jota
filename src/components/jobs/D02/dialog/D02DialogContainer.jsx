import { D02Context } from "@/contexts/D02/D02Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D02DialogForm from "./D02DialogForm";
import { D02DialogToolbarContainer } from "./toolbar/D02DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const D02DialogContainer = forwardRef((props, ref) => {
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

	const d02 = useContext(D02Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d02.creating) {
			return "建立退料單";
		} else if (d02.updating) {
			return "修改退料單";
		} else {
			return "退料單內容";
		}
	}, [d02.creating, d02.updating]);

	const handleClose = useMemo(() => {
		return d02.creating
			? d02.confirmQuitCreating
			: d02.updating
			? d02.confirmQuitUpdating
			: d02.reading
			? d02.cancelAction
			: null;
	}, [
		d02.cancelAction,
		d02.confirmQuitCreating,
		d02.confirmQuitUpdating,
		d02.creating,
		d02.reading,
		d02.updating,
	]);

	const handleSubmit = form.handleSubmit(
		d02.onEditorSubmit,
		d02.onEditorSubmitError
	);

	useEffect(() => {
		if (d02.itemDataReady) {
			console.log("d02 form reset", d02.itemData);
			reset(d02.itemData);
		}
	}, [d02.itemData, d02.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={D02DialogToolbarContainer}
				open={d02.itemViewOpen}
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
				<D02DialogForm
					onSubmit={handleSubmit}
					creating={d02.creating}
					editing={d02.editing}
					updating={d02.updating}
					readWorking={d02.readWorking}
					readError={d02.readError}
					data={d02.itemData}
					itemDataReady={d02.itemDataReady}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

D02DialogContainer.displayName = "D02DialogContainer";
