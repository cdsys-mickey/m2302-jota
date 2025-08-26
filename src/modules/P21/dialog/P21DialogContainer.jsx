import { P21Context } from "@/modules/P21/P21Context";
import Colors from "@/modules/Colors.mjs";
import { DialogEx } from "@/shared-components";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import P21DialogForm from "../form/P21DialogForm";
import { P21DialogButtonsContainer } from "./buttons/P21DialogButtonsContainer";
import { FormMetaProvider } from "@/shared-components";
import P21Drawer from "../P21Drawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useCallback } from "react";

export const P21DialogContainer = forwardRef((props, ref) => {
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
	const p21 = useContext(P21Context);

	const title = useMemo(() => {
		if (p21.creating) {
			return "新增";
		} else if (p21.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [p21.creating, p21.updating]);

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleSubmit = useCallback(() => {
		if (p21.editing) {
			forms.handleSubmit(p21.onEditorSubmit, p21.onEditorSubmitError)();
		}
	}, [forms, p21.editing, p21.onEditorSubmit, p21.onEditorSubmitError]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useChangeTracking(() => {
		if (p21.itemDataReady) {
			console.log(`p21 form reset`, p21.itemData);
			reset(p21.itemData);
		}
	}, [p21.itemData, p21.itemDataReady]);

	return (
		<FormProvider {...forms}>
			<DialogEx
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={P21DialogButtonsContainer}
				open={p21.itemViewOpen}
				onClose={
					p21.editing ? p21.confirmDialogClose : p21.cancelAction
				}
				// onReturn={p21.updating ? p21.confirmReturn : null}
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
					<P21DialogForm
						ref={ref}
						onSubmit={handleSubmit}
						editing={p21.editing}
						updating={p21.updating}
						readWorking={p21.readWorking}
						readError={p21.readError}
						data={p21.itemData}
						itemDataReady={p21.itemDataReady}
					/>
				</FormMetaProvider>
				<P21Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogEx>
		</FormProvider>
	);
});

P21DialogContainer.displayName = "P21DialogContainer";


