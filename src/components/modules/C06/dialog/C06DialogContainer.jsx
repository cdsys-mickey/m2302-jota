import { C06Context } from "@/contexts/C06/C06Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C06DialogForm from "./C06DialogForm";
import { C06DialogToolbarContainer } from "./toolbar/C06DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const C06DialogContainer = forwardRef((props, ref) => {
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

	const c06 = useContext(C06Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c06.creating) {
			return "建立訂貨單";
		} else if (c06.updating) {
			return "修改訂貨單";
		} else {
			return "訂貨單內容";
		}
	}, [c06.creating, c06.updating]);

	const handleClose = useMemo(() => {
		return c06.creating
			? c06.confirmQuitCreating
			: c06.updating
			? c06.confirmQuitUpdating
			: c06.reading
			? c06.cancelAction
			: null;
	}, [
		c06.cancelAction,
		c06.confirmQuitCreating,
		c06.confirmQuitUpdating,
		c06.creating,
		c06.reading,
		c06.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c06.onEditorSubmit,
		c06.onEditorSubmitError
	);

	useEffect(() => {
		if (c06.itemDataReady) {
			console.log("c06 form reset", c06.itemData);
			reset(c06.itemData);
		}
	}, [c06.itemData, c06.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C06DialogToolbarContainer}
				open={c06.itemViewOpen}
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
				<C06DialogForm
					onSubmit={handleSubmit}
					creating={c06.creating}
					editing={c06.editing}
					updating={c06.updating}
					readWorking={c06.readWorking}
					data={c06.itemData}
					itemDataReady={c06.itemDataReady}
					squaredFlagDisabled={c06.squaredFlagDisabled}
					handleSpDeptChanged={c06.handleSpDeptChanged({
						setValue: form.setValue,
						getValues: form.getValues,
					})}
					spDeptDisabled={c06.spDeptDisabled}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

C06DialogContainer.displayName = "C06DialogContainer";
