import { C09Context } from "@/contexts/C09/C09Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C09DialogForm from "./C09DialogForm";
import { C09DialogToolbarContainer } from "./toolbar/C09DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const C09DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const c09 = useContext(C09Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c09.creating) {
			return "建立撥入單";
		} else if (c09.updating) {
			return "修改撥入單";
		} else {
			return "撥入單內容";
		}
	}, [c09.creating, c09.updating]);

	const handleClose = useMemo(() => {
		return c09.creating
			? c09.confirmQuitCreating
			: c09.updating
			? c09.confirmQuitUpdating
			: c09.reading
			? c09.cancelAction
			: null;
	}, [
		c09.cancelAction,
		c09.confirmQuitCreating,
		c09.confirmQuitUpdating,
		c09.creating,
		c09.reading,
		c09.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c09.onEditorSubmit,
		c09.onEditorSubmitError
	);

	useEffect(() => {
		if (c09.itemDataReady) {
			console.log("c09 form reset", c09.itemData);
			reset(c09.itemData);
		}
	}, [c09.itemData, c09.itemDataReady, reset]);

	// const txoDeptDisabled = useMemo(() => {
	// 	return !!txoOrder;
	// }, [txoOrder]);

	const txoOrder = useWatch({
		name: "txoOrder",
		control: form.control,
	});

	const remarkDisabled = useMemo(() => {
		return !!txoOrder;
	}, [txoOrder]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C09DialogToolbarContainer}
				open={c09.itemViewOpen}
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
				<C09DialogForm
					onSubmit={handleSubmit}
					creating={c09.creating}
					editing={c09.editing}
					updating={c09.updating}
					readWorking={c09.readWorking}
					readError={c09.readError}
					data={c09.itemData}
					itemDataReady={c09.itemDataReady}
					handleTxoOrdersChanged={c09.handleTxoOrdersChanged({
						setValue: form.setValue,
						getValues: form.getValues,
					})}
					handleTxoDeptChanged={c09.handleTxoDeptChanged({
						setValue: form.setValue,
						getValues: form.getValues,
					})}
					// txoDeptDisabled={txoDeptDisabled}
					remarkDisabled={remarkDisabled}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

C09DialogContainer.displayName = "C09DialogContainer";
