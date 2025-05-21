import { A16Context } from "@/modules/A16/A16Context";
import Colors from "@/modules/Colors.mjs";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import MuiStyles from "@/shared-modules/MuiStyles";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import A16Drawer from "../A16Drawer";
import A16DialogForm from "./A16DialogForm";
import { A16DialogButtonsContainer } from "./buttons/A16DialogButtonsContainer";
import { useHotkeys } from "react-hotkeys-hook";

export const A16DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const _height = useMemo(() => {
		return height - 120
	}, [height])
	const form = useForm({
		defaultValues: {},
	});
	const { reset, setValue } = form;
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
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(a16.onEditorSubmit, a16.onEditorSubmitError);
	}, [a16.onEditorSubmit, a16.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useEffect(() => {
		// if (a16.readState === ActionState.DONE && !!a16.itemData) {
		if (a16.itemDataReady) {
			console.log(`a16 form reset`, a16.itemData);
			reset(a16.itemData);
		}
	}, [a16.itemData, a16.itemDataReady, reset]);

	const headOfficeValue = useWatch({
		name: "headOffice",
		control: form.control
	})

	const flagshipValue = useWatch({
		name: "flagship",
		control: form.control
	})

	useEffect(() => {
		if (headOfficeValue) {
			setValue("flagship", false);
		}
	}, [headOfficeValue, setValue]);

	useEffect(() => {
		if (flagshipValue) {
			setValue("headOffice", false);
		}
	}, [flagshipValue, setValue]);

	return (
		<FormProvider {...form}>
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
					scrollable.scroller,
				]}
				{...rest}>
				<FormMetaProvider {...a16.formMeta}>
					<A16DialogForm
						ref={ref}
						onSubmit={handleSubmit}
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

