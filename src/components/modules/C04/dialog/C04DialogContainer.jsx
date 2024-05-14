import { C04Context } from "@/contexts/C04/C04Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import C04DialogForm from "./C04DialogForm";
import { C04DialogToolbarContainer } from "./toolbar/C04DialogToolbarContainer";

export const C04DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const c04 = useContext(C04Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c04.creating) {
			return "建立進貨單";
		} else if (c04.updating) {
			return "修改進貨單";
		} else {
			return "進貨單內容";
		}
	}, [c04.creating, c04.updating]);

	const handleClose = useMemo(() => {
		return c04.creating
			? c04.confirmQuitCreating
			: c04.updating
			? c04.confirmQuitUpdating
			: c04.reading
			? c04.cancelAction
			: null;
	}, [
		c04.cancelAction,
		c04.confirmQuitCreating,
		c04.confirmQuitUpdating,
		c04.creating,
		c04.reading,
		c04.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c04.onEditorSubmit,
		c04.onEditorSubmitError
	);

	useEffect(() => {
		if (c04.itemDataReady) {
			console.log("c04 form reset", c04.itemData);
			reset(c04.itemData);
		}
	}, [c04.itemData, c04.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C04DialogToolbarContainer}
				open={c04.itemViewOpen}
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
					<C04DialogForm
						creating={c04.creating}
						editing={c04.editing}
						updating={c04.updating}
						readWorking={c04.readWorking}
						data={c04.itemData}
						itemDataReady={c04.itemDataReady}
						onSubmit={handleSubmit}
						handleSupplierChanged={c04.handleSupplierChanged}
					/>
				</form>
			</DialogExContainer>
		</FormProvider>
	);
});

C04DialogContainer.displayName = "C04DialogContainer";
