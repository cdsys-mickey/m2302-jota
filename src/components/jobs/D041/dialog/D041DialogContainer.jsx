import { D041Context } from "@/contexts/D041/D041Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D041DialogForm from "./D041DialogForm";
import { D041DialogToolbarContainer } from "./toolbar/D041DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const D041DialogContainer = forwardRef((props, ref) => {
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

	const d041 = useContext(D041Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d041.creating) {
			return "建立入庫單";
		} else if (d041.updating) {
			return "修改入庫單";
		} else {
			return "入庫單內容";
		}
	}, [d041.creating, d041.updating]);

	const handleClose = useMemo(() => {
		return d041.creating
			? d041.confirmQuitCreating
			: d041.updating
			? d041.confirmQuitUpdating
			: d041.reading
			? d041.cancelAction
			: null;
	}, [
		d041.cancelAction,
		d041.confirmQuitCreating,
		d041.confirmQuitUpdating,
		d041.creating,
		d041.reading,
		d041.updating,
	]);

	const handleSubmit = form.handleSubmit(
		d041.onEditorSubmit,
		d041.onEditorSubmitError
	);

	useEffect(() => {
		if (d041.itemDataReady) {
			console.log("d041 form reset", d041.itemData);
			reset(d041.itemData);
		}
	}, [d041.itemData, d041.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={D041DialogToolbarContainer}
				open={d041.itemViewOpen}
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
				<D041DialogForm
					onSubmit={handleSubmit}
					creating={d041.creating}
					editing={d041.editing}
					updating={d041.updating}
					readWorking={d041.readWorking}
					readError={d041.readError}
					data={d041.itemData}
					itemDataReady={d041.itemDataReady}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

D041DialogContainer.displayName = "D041DialogContainer";
