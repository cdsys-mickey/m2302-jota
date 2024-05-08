import { A20Context } from "@/contexts/A20/A20Context";
import DialogEx from "@/shared-components/dialog/DialogEx";
import ActionState from "@/shared-constants/action-state";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import A20Form from "../form/A20Form";
import { A20DialogButtonsContainer } from "./buttons/A20DialogButtonsContainer";
import { useScrollable } from "../../../../shared-hooks/useScrollable";
import { useWindowSize } from "../../../../shared-hooks/useWindowSize";
import { DialogExContainer } from "../../../../shared-components/dialog/DialogExContainer";

export const A20DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const forms = useForm({
		defaultValues: {},
	});
	const { reset } = forms;
	const a20 = useContext(A20Context);
	const { height } = useWindowSize();

	const title = useMemo(() => {
		if (a20.creating) {
			return "新增";
		} else if (a20.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [a20.creating, a20.updating]);
	const scrollable = useScrollable({
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
		height: height - 100,
	});

	useEffect(() => {
		if (a20.itemDataReady) {
			console.log(`a20 form reset`, a20.itemData);
			reset(a20.itemData);
		}
	}, [a20.itemData, a20.itemDataReady, a20.readState, reset]);

	return (
		<FormProvider {...forms}>
			<DialogExContainer
				title={title}
				ref={ref}
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={A20DialogButtonsContainer}
				open={a20.itemViewOpen}
				onClose={
					a20.editing ? a20.confirmDialogClose : a20.cancelAction
				}
				// onReturn={a20.updating ? a20.confirmReturn : null}
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
				<A20Form
					ref={ref}
					onSubmit={forms.handleSubmit(
						a20.onEditorSubmit,
						a20.onEditorSubmitError
					)}
					editing={a20.editing}
					updating={a20.updating}
					readWorking={a20.readWorking}
					data={a20.itemData}
					itemDataReady={a20.itemDataReady}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

A20DialogContainer.displayName = "A20DialogContainer";
