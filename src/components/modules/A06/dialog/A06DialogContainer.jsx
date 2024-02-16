import { A06Context } from "@/contexts/A06/A06Context";
import DialogEx from "@/shared-components/dialog/DialogEx";
import ActionState from "@/shared-constants/action-state";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import A06Form from "../form/A06Form";
import { A06DialogTitleButtonsContainer } from "./buttons/A06DialogTitleButtonsContainer";
import { useScrollable } from "../../../../shared-hooks/useScrollable";
import { DialogExContainer } from "../../../../shared-components/dialog/DialogExContainer";
import { useWindowSize } from "../../../../shared-hooks/useWindowSize";

export const A06DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});
	const forms = useForm({
		defaultValues: {},
	});
	const { reset } = forms;
	const a06 = useContext(A06Context);

	const title = useMemo(() => {
		if (a06.creating) {
			return "新增";
		} else if (a06.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [a06.creating, a06.updating]);

	useEffect(() => {
		// if (a06.readState === ActionState.DONE && !!a06.itemData) {
		if (a06.itemDataReady) {
			console.log(`a06 form reset`, a06.itemData);
			reset(a06.itemData);
		}
	}, [a06.itemData, a06.itemDataReady, a06.readState, reset]);

	return (
		<FormProvider {...forms}>
			<DialogExContainer
				title={title}
				ref={ref}
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={A06DialogTitleButtonsContainer}
				open={a06.itemViewOpen}
				onClose={
					a06.editing ? a06.confirmDialogClose : a06.cancelAction
				}
				onReturn={a06.updating ? a06.confirmReturn : null}
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
				<A06Form
					ref={ref}
					onSubmit={forms.handleSubmit(
						a06.onEditorSubmit,
						a06.onEditorSubmitError
					)}
					editing={a06.editing}
					updating={a06.updating}
					readWorking={a06.readWorking}
					data={a06.itemData}
					dataLoaded={a06.itemDataLoaded}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

A06DialogContainer.displayName = "A06DialogContainer";
