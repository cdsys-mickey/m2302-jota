import { P36Context } from "@/modules/P36/P36Context";
import Colors from "@/modules/Colors.mjs";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import P36DialogForm from "../form/P36DialogForm";
import { P36DialogButtonsContainer } from "./buttons/P36DialogButtonsContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import P36Drawer from "../P36Drawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P36DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const _height = useMemo(() => {
		return height - 120
	}, [height])

	const formMeta = useFormMeta(
		`
		CndID,
		CndData,
		AbbrID,
		LicNo,
		IDNo,
		BDay,
		Cel,
		Email,
		Postal,
		Addr,
		Remark,
		Assign,
		AsRemark,
		Bound,
		`
	);

	const forms = useForm({
		defaultValues: {},
	});
	const { reset } = forms;
	const p36 = useContext(P36Context);

	const title = useMemo(() => {
		if (p36.creating) {
			return "新增";
		} else if (p36.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [p36.creating, p36.updating]);

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleSubmit = useMemo(() => {
		return forms.handleSubmit(p36.onEditorSubmit, p36.onEditorSubmitError);
	}, [p36.onEditorSubmit, p36.onEditorSubmitError, forms]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useEffect(() => {
		// if (p36.readState === ActionState.DONE && !!p36.itemData) {
		if (p36.itemDataReady) {
			console.log(`p36 form reset`, p36.itemData);
			reset(p36.itemData);
		}
	}, [p36.itemData, p36.itemDataReady, p36.readState, forms, reset]);

	return (
		<FormProvider {...forms}>
			<DialogExContainer
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={P36DialogButtonsContainer}
				open={p36.itemViewOpen}
				onClose={
					p36.editing ? p36.confirmDialogClose : p36.cancelAction
				}
				// onReturn={p36.updating ? p36.confirmReturn : null}
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
				<FormMetaProvider {...formMeta}>
					<P36DialogForm
						ref={ref}
						onSubmit={handleSubmit}
						editing={p36.editing}
						updating={p36.updating}
						readWorking={p36.readWorking}
						readError={p36.readError}
						data={p36.itemData}
						itemDataReady={p36.itemDataReady}
					/>
				</FormMetaProvider>
				<P36Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogExContainer>
		</FormProvider>
	);
});

P36DialogContainer.displayName = "P36DialogContainer";



