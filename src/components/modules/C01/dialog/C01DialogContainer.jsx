import { C01Context } from "@/contexts/C01/C01Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import C01DialogForm from "./C01DialogForm";
import { useEffect } from "react";
import { C01DialogToolbarContainer } from "./toolbar/C01DialogToolbarContainer";

export const C01DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const c01 = useContext(C01Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c01.creating) {
			return "建立請購單";
		} else if (c01.updating) {
			return "修改請購單採購";
		} else {
			return "請購單採購內容";
		}
	}, [c01.creating, c01.updating]);

	const handleClose = useMemo(() => {
		return c01.creating
			? c01.confirmQuitCreating
			: c01.updating
			? c01.confirmQuitUpdating
			: c01.reading
			? c01.cancelAction
			: null;
	}, [
		c01.cancelAction,
		c01.confirmQuitCreating,
		c01.confirmQuitUpdating,
		c01.creating,
		c01.reading,
		c01.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c01.onEditorSubmit,
		c01.onEditorSubmitError
	);

	useEffect(() => {
		if (c01.itemDataReady) {
			console.log("c01 form reset", c01.itemData);
			reset(c01.itemData);
		}
	}, [c01.itemData, c01.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C01DialogToolbarContainer}
				open={c01.itemViewOpen}
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
					<C01DialogForm
						creating={c01.creating}
						editing={c01.editing}
						updating={c01.updating}
						readWorking={c01.readWorking}
						readError={c01.readError}
						data={c01.itemData}
						itemDataReady={c01.itemDataReady}
						onSubmit={handleSubmit}
					/>
				</form>
			</DialogExContainer>
		</FormProvider>
	);
});

C01DialogContainer.displayName = "C01DialogContainer";
