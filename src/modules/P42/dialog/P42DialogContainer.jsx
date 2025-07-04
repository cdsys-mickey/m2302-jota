import { P42Context } from "@/modules/P42/P42Context";
import Colors from "@/modules/Colors.mjs";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import P42DialogForm from "../form/P42DialogForm";
import { P42DialogButtonsContainer } from "./buttons/P42DialogButtonsContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import P42Drawer from "../P42Drawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P42DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const _height = useMemo(() => {
		return height - 120
	}, [height])

	const formMeta = useFormMeta(
		`
		FactID,
		FactData,
		AbbrName,
		Boss,
		Contact,
		Tel,
		Uniform,
		PayGroup,
		bank,
		BankAcct,
		CompAddr,
		CompTel,
		CompFax,
		TaxType,
		FactAddr,
		FactTel,
		FactFax,
		mainProd,
		remark
		`
	);

	const forms = useForm({
		defaultValues: {},
	});
	const { reset } = forms;
	const p42 = useContext(P42Context);

	const title = useMemo(() => {
		if (p42.creating) {
			return "新增";
		} else if (p42.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [p42.creating, p42.updating]);

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleSubmit = useMemo(() => {
		return forms.handleSubmit(p42.onEditorSubmit, p42.onEditorSubmitError);
	}, [p42.onEditorSubmit, p42.onEditorSubmitError, forms]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useEffect(() => {
		// if (p42.readState === ActionState.DONE && !!p42.itemData) {
		if (p42.itemDataReady) {
			console.log(`p42 form reset`, p42.itemData);
			reset(p42.itemData);
		}
	}, [p42.itemData, p42.itemDataReady, p42.readState, forms, reset]);

	return (
		<FormProvider {...forms}>
			<DialogExContainer
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={P42DialogButtonsContainer}
				open={p42.itemViewOpen}
				onClose={
					p42.editing ? p42.confirmDialogClose : p42.cancelAction
				}
				// onReturn={p42.updating ? p42.confirmReturn : null}
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
					<P42DialogForm
						ref={ref}
						onSubmit={handleSubmit}
						editing={p42.editing}
						updating={p42.updating}
						readWorking={p42.readWorking}
						readError={p42.readError}
						data={p42.itemData}
						itemDataReady={p42.itemDataReady}
					/>
				</FormMetaProvider>
				<P42Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogExContainer>
		</FormProvider>
	);
});

P42DialogContainer.displayName = "P42DialogContainer";



