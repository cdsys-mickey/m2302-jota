import { C08Context } from "@/contexts/C08/C08Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C08DialogForm from "./C08DialogForm";
import { C08DialogToolbarContainer } from "./toolbar/C08DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const C08DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;
	const txiDept = useWatch({
		name: "txiDept",
		control: form.control,
	});

	const c08 = useContext(C08Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c08.creating) {
			return "建立撥出單";
		} else if (c08.updating) {
			return "修改撥出單";
		} else {
			return "撥出單內容";
		}
	}, [c08.creating, c08.updating]);

	const handleClose = useMemo(() => {
		return c08.creating
			? c08.confirmQuitCreating
			: c08.updating
			? c08.confirmQuitUpdating
			: c08.reading
			? c08.cancelAction
			: null;
	}, [
		c08.cancelAction,
		c08.confirmQuitCreating,
		c08.confirmQuitUpdating,
		c08.creating,
		c08.reading,
		c08.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c08.onEditorSubmit,
		c08.onEditorSubmitError
	);

	useEffect(() => {
		if (c08.itemDataReady) {
			console.log("c08 form reset", c08.itemData);
			reset(c08.itemData);
		}
	}, [c08.itemData, c08.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C08DialogToolbarContainer}
				open={c08.itemViewOpen}
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
				<C08DialogForm
					onSubmit={handleSubmit}
					creating={c08.creating}
					editing={c08.editing}
					updating={c08.updating}
					readWorking={c08.readWorking}
					data={c08.itemData}
					itemDataReady={c08.itemDataReady}
					handleDepOrdersChanged={c08.handleDepOrdersChanged({
						setValue: form.setValue,
						getValues: form.getValues,
					})}
					handleTxiDeptChanged={c08.handleTxiDeptChanged({
						setValue: form.setValue,
						getValues: form.getValues,
					})}
					txiDept={txiDept}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

C08DialogContainer.displayName = "C08DialogContainer";
