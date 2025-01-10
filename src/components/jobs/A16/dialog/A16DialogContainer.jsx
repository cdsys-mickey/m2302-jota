import { A16Context } from "@/contexts/A16/A16Context";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import A16Drawer from "../A16Drawer";
import A16DialogForm from "./A16DialogForm";
import { A16DialogButtonsContainer } from "./buttons/A16DialogButtonsContainer";

export const A16DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const forms = useForm({
		defaultValues: {},
	});
	const { reset } = forms;
	const a16 = useContext(A16Context);

	const title = useMemo(() => {
		if (a16.creating) {
			return "新增門市";
		} else if (a16.updating) {
			return "修改門市";
		} else {
			return "門市內容";
		}
	}, [a16.creating, a16.updating]);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const onSubmit = useMemo(() => {
		return forms.handleSubmit(a16.onEditorSubmit, a16.onEditorSubmitError);
	}, [a16.onEditorSubmit, a16.onEditorSubmitError, forms]);

	useEffect(() => {
		// if (a16.readState === ActionState.DONE && !!a16.itemData) {
		if (a16.itemDataReady) {
			console.log(`a16 form reset`, a16.itemData);
			reset(a16.itemData);
		}
	}, [a16.itemData, a16.itemDataReady, a16.readState, forms, reset]);

	return (
		<FormProvider {...forms}>
			<DialogExContainer
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="sm"
				TitleButtonsComponent={A16DialogButtonsContainer}
				open={a16.itemViewOpen}
				onClose={
					a16.editing ? a16.confirmDialogClose : a16.cancelAction
				}
				// onReturn={a16.updating ? a16.confirmReturn : null}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: Colors.DIALOG_BG,
					},
				}}
				contentSx={[
					{
						minHeight: "30em",
					},
					scrollable.scroller,
				]}
				{...rest}>
				<FormMetaProvider {...a16.formMeta}>
					<A16DialogForm
						ref={ref}
						onSubmit={onSubmit}
						editing={a16.editing}
						updating={a16.updating}
						readWorking={a16.readWorking}
						readError={a16.readError}
						data={a16.itemData}
						itemDataReady={a16.itemDataReady}
					/>
				</FormMetaProvider>
				<A16Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogExContainer>
		</FormProvider>
	);
});

A16DialogContainer.displayName = "A16DialogContainer";

