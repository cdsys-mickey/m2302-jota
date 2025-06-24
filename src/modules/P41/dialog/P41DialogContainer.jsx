import { P41Context } from "@/modules/P41/P41Context";
import Colors from "@/modules/Colors.mjs";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import P41DialogForm from "../form/P41DialogForm";
import { P41DialogButtonsContainer } from "./buttons/P41DialogButtonsContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import P41Drawer from "../P41Drawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P41DialogContainer = forwardRef((props, ref) => {
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
	const p41 = useContext(P41Context);

	const title = useMemo(() => {
		if (p41.creating) {
			return "新增";
		} else if (p41.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [p41.creating, p41.updating]);

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleSubmit = useMemo(() => {
		return forms.handleSubmit(p41.onEditorSubmit, p41.onEditorSubmitError);
	}, [p41.onEditorSubmit, p41.onEditorSubmitError, forms]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useEffect(() => {
		// if (p41.readState === ActionState.DONE && !!p41.itemData) {
		if (p41.itemDataReady) {
			console.log(`p41 form reset`, p41.itemData);
			reset(p41.itemData);
		}
	}, [p41.itemData, p41.itemDataReady, p41.readState, forms, reset]);

	return (
		<FormProvider {...forms}>
			<DialogExContainer
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={P41DialogButtonsContainer}
				open={p41.itemViewOpen}
				onClose={
					p41.editing ? p41.confirmDialogClose : p41.cancelAction
				}
				// onReturn={p41.updating ? p41.confirmReturn : null}
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
					<P41DialogForm
						ref={ref}
						onSubmit={handleSubmit}
						editing={p41.editing}
						updating={p41.updating}
						readWorking={p41.readWorking}
						readError={p41.readError}
						data={p41.itemData}
						itemDataReady={p41.itemDataReady}
					/>
				</FormMetaProvider>
				<P41Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogExContainer>
		</FormProvider>
	);
});

P41DialogContainer.displayName = "P41DialogContainer";



