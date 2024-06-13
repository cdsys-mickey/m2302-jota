import { C02Context } from "@/contexts/C02/C02Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import C02DialogForm from "./C02DialogForm";
import { useEffect } from "react";
import { C02DialogToolbarContainer } from "./toolbar/C02DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const C02DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const c02 = useContext(C02Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c02.creating) {
			return "建立請購單";
		} else if (c02.updating) {
			return "修改請購單";
		} else {
			return "請購單內容";
		}
	}, [c02.creating, c02.updating]);

	const handleClose = useMemo(() => {
		return c02.creating
			? c02.confirmQuitCreating
			: c02.updating
			? c02.confirmQuitUpdating
			: c02.reading
			? c02.cancelAction
			: null;
	}, [
		c02.cancelAction,
		c02.confirmQuitCreating,
		c02.confirmQuitUpdating,
		c02.creating,
		c02.reading,
		c02.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c02.onEditorSubmit,
		c02.onEditorSubmitError
	);

	useEffect(() => {
		if (c02.itemDataReady) {
			console.log("c02 form reset", c02.itemData);
			reset(c02.itemData);
		}
	}, [c02.itemData, c02.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C02DialogToolbarContainer}
				open={c02.itemViewOpen}
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
				<form onSubmit={handleSubmit}>
					<C02DialogForm
						creating={c02.creating}
						editing={c02.editing}
						updating={c02.updating}
						readWorking={c02.readWorking}
						readError={c02.readError}
						data={c02.itemData}
						itemDataReady={c02.itemDataReady}
						onSubmit={handleSubmit}
					/>
				</form>
			</DialogExContainer>
		</FormProvider>
	);
});

C02DialogContainer.displayName = "C02DialogContainer";
