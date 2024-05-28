import { B05Context } from "@/contexts/B05/B05Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import B05DialogForm from "./B05DialogForm";
import { useEffect } from "react";
import { B05DialogToolbarContainer } from "./toolbar/B05DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const B05DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext({
		defaultValues: {
			quotes: [],
		},
	});
	const { reset } = form;

	const b05 = useContext(B05Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (b05.creating) {
			return "建立詢價單";
		} else if (b05.updating) {
			return "修改詢價單";
		} else {
			return "詢價單內容";
		}
	}, [b05.creating, b05.updating]);

	const handleClose = useMemo(() => {
		return b05.creating
			? b05.confirmQuitCreating
			: b05.updating
			? b05.confirmQuitUpdating
			: b05.reading
			? b05.cancelAction
			: null;
	}, [
		b05.cancelAction,
		b05.confirmQuitCreating,
		b05.confirmQuitUpdating,
		b05.creating,
		b05.reading,
		b05.updating,
	]);

	const handleSubmit = form.handleSubmit(
		b05.onEditorSubmit,
		b05.onEditorSubmitError
	);

	useEffect(() => {
		if (b05.itemDataReady) {
			console.log("b05 form reset", b05.itemData);
			reset(b05.itemData);
		}
	}, [b05.itemData, b05.itemDataReady, reset]);

	return (
		<DialogExContainer
			ref={ref}
			title={memoisedTitle}
			// fullScreen
			responsive
			fullWidth
			maxWidth="md"
			TitleButtonsComponent={B05DialogToolbarContainer}
			open={b05.itemViewOpen}
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
			<FormProvider {...form}>
				<form onSubmit={handleSubmit}>
					<B05DialogForm
						creating={b05.creating}
						editing={b05.editing}
						updating={b05.updating}
						readWorking={b05.readWorking}
						data={b05.itemData}
						itemDataReady={b05.itemDataReady}
						onSubmit={handleSubmit}
					/>
				</form>
			</FormProvider>
		</DialogExContainer>
	);
});

B05DialogContainer.displayName = "B05DialogContainer";
