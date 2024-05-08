import { C03Context } from "@/contexts/C03/C03Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import C03DialogForm from "./C03DialogForm";
import { useEffect } from "react";
import { C03DialogToolbarContainer } from "./toolbar/C03DialogToolbarContainer";

export const C03DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const c03 = useContext(C03Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c03.creating) {
			return "建立採購單";
		} else if (c03.updating) {
			return "修改採購單";
		} else {
			return "採購單內容";
		}
	}, [c03.creating, c03.updating]);

	const handleClose = useMemo(() => {
		return c03.creating
			? c03.confirmQuitCreating
			: c03.updating
			? c03.confirmQuitUpdating
			: c03.reading
			? c03.cancelAction
			: null;
	}, [
		c03.cancelAction,
		c03.confirmQuitCreating,
		c03.confirmQuitUpdating,
		c03.creating,
		c03.reading,
		c03.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c03.onEditorSubmit,
		c03.onEditorSubmitError
	);

	useEffect(() => {
		if (c03.itemDataReady) {
			console.log("c03 form reset", c03.itemData);
			reset(c03.itemData);
		}
	}, [c03.itemData, c03.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={C03DialogToolbarContainer}
				open={c03.itemViewOpen}
				onClose={handleClose}
				// onReturn={handleReturn}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: "rgb(241 241 241)",
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
				<form onSubmit={handleSubmit}>
					<C03DialogForm
						creating={c03.creating}
						editing={c03.editing}
						updating={c03.updating}
						readWorking={c03.readWorking}
						readError={c03.readError}
						data={c03.itemData}
						itemDataReady={c03.itemDataReady}
						onSubmit={handleSubmit}
						handleSupplierChange={c03.handleSupplierChange({
							setValue: form.setValue,
						})}
					/>
				</form>
			</DialogExContainer>
		</FormProvider>
	);
});

C03DialogContainer.displayName = "C03DialogContainer";
