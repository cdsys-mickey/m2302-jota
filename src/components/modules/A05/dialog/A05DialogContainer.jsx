import { A05Context } from "@/contexts/A05/A05Context";
import DialogEx from "@/shared-components/dialog/DialogEx";
import ActionState from "@/shared-constants/action-state";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import A05Form from "../form/A05Form";
import { A05DialogButtonsContainer } from "./buttons/A05DialogButtonsContainer";
import { useScrollable } from "../../../../shared-hooks/useScrollable";
import { DialogExContainer } from "../../../../shared-components/dialog/DialogExContainer";
import { useWindowSize } from "../../../../shared-hooks/useWindowSize";

export const A05DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const forms = useForm({
		defaultValues: {},
	});
	const { reset } = forms;
	const a05 = useContext(A05Context);

	const title = useMemo(() => {
		if (a05.creating) {
			return "新增";
		} else if (a05.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [a05.creating, a05.updating]);
	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	useEffect(() => {
		// if (a05.readState === ActionState.DONE && !!a05.itemData) {
		if (a05.itemDataReady) {
			console.log(`a05 form reset`, a05.itemData);
			reset(a05.itemData);
		}
	}, [a05.itemData, a05.itemDataReady, a05.readState, forms, reset]);

	return (
		<FormProvider {...forms}>
			<DialogExContainer
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={A05DialogButtonsContainer}
				open={a05.itemViewOpen}
				onClose={
					a05.editing ? a05.confirmDialogClose : a05.cancelAction
				}
				// onReturn={a05.updating ? a05.confirmReturn : null}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: "rgb(241 241 241)",
					},
				}}
				contentSx={[
					{
						minHeight: "30em",
					},
					scrollable.scroller,
				]}
				{...rest}>
				<A05Form
					ref={ref}
					onSubmit={forms.handleSubmit(
						a05.onEditorSubmit,
						a05.onEditorSubmitError
					)}
					editing={a05.editing}
					updating={a05.updating}
					readWorking={a05.readWorking}
					data={a05.itemData}
					dataLoaded={a05.itemDataLoaded}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

A05DialogContainer.displayName = "A05DialogContainer";