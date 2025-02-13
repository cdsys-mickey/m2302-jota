import { A06Context } from "@/contexts/A06/A06Context";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import A06DialogForm from "../form/A06DialogForm";
import { A06DialogToolbarContainer } from "./buttons/A06DialogToolbarContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import A06DrawerContainer from "../A06DrawerContainer";

export const A06DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const _height = useMemo(() => {
		return height - 120
	}, [height])

	const scrollable = useScrollable({
		maxHeight: _height,
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

	const onSubmit = useMemo(() => {
		return forms.handleSubmit(
			a06.onEditorSubmit,
			a06.onEditorSubmitError
		)
	}, [a06.onEditorSubmit, a06.onEditorSubmitError, forms]);

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
				TitleButtonsComponent={A06DialogToolbarContainer}
				open={a06.itemViewOpen}
				onClose={
					a06.editing ? a06.confirmDialogClose : a06.cancelAction
				}
				// onReturn={a06.updating ? a06.confirmReturn : null}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: Colors.DIALOG_BG,
					},
				}}
				contentSx={[
					// {
					// 	minHeight: "30em",
					// },
					scrollable.scroller,
				]}
				{...rest}>
				<FormMetaProvider {...a06.formMeta}>
					<A06DialogForm
						ref={ref}
						onSubmit={onSubmit}
						editing={a06.editing}
						updating={a06.updating}
						readWorking={a06.readWorking}
						readError={a06.readError}
						data={a06.itemData}
						itemDataReady={a06.itemDataReady}
					/>
				</FormMetaProvider>
				<A06DrawerContainer />
			</DialogExContainer>
		</FormProvider>
	);
});

A06DialogContainer.displayName = "A06DialogContainer";
