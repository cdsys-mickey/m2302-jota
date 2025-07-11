import { P42Context } from "@/modules/P42/P42Context";
import Colors from "@/modules/Colors.mjs";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import P42DialogForm from "../form/P42DialogForm";
import { P42DialogButtonsContainer } from "./buttons/P42DialogButtonsContainer";
import { FormMetaProvider } from "@/shared-components";
import P42Drawer from "../P42Drawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";
import { useCallback } from "react";

export const P42DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const _height = useMemo(() => {
		return height - 120
	}, [height])

	const formMeta = useFormMeta(
		`
		OrdID,
		OrdDate,
		ArrDate,
		ArrHM,
		CFlag,
		GrpName,
		city,
		area,
		GrpType,
		custType,
		busComp,
		CarData_N,
		CarQty,
		PugAmt,
		CarNo,
		DrvName,
		DrvTel,
		tourGroup,
		TrvData_N,
		tourGuide,
		CndName,
		CndTel,
		employee,
		Remark
		`
	);

	const form = useForm({
		defaultValues: {},
	});
	const { reset } = form;
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
		return form.handleSubmit(p42.onEditorSubmit, p42.onEditorSubmitError);
	}, [p42.onEditorSubmit, p42.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const handleCityChange = useCallback((newValue) => {
		form.setValue("area", newValue?.CtAreaID ? {
			CodeID: newValue.CtAreaID,
			CodeData: newValue.CtAreaData
		} : null)
	}, [form]);

	const handleBusCompChange = useCallback((newValue) => {
		form.setValue("CarData_N", newValue?.CarData ?? "");
	}, [form]);

	const handleTourGroupChange = useCallback((newValue) => {
		form.setValue("TrvData_N", newValue?.TrvData ?? "");
	}, [form]);

	const handleTourGuideChange = useCallback((newValue) => {
		form.setValue("CndName", newValue?.CndData ?? "")
	}, [form]);

	const comId = useWatch({
		name: "ComID",
		control: form.control
	})

	const cflag = useWatch({
		name: "CFlag",
		control: form.control
	})

	const cflagDisabled = useMemo(() => {
		return comId && cflag;
	}, [cflag, comId])

	// const city = useWatch({
	// 	name: "city",
	// 	control: form.control
	// })

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "CFlag":
					return cflagDisabled;
				case "area":
					// return !city;
					return true;
				default:
					return false;
			}
		},
		[cflagDisabled]
	);

	useEffect(() => {
		// if (p42.readState === ActionState.DONE && !!p42.itemData) {
		if (p42.itemDataReady) {
			console.log(`p42 form reset`, p42.itemData);
			reset(p42.itemData);
		}
	}, [p42.itemData, p42.itemDataReady, p42.readState, form, reset]);

	return (
		<FormProvider {...form}>
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
				<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
					<P42DialogForm
						ref={ref}
						onSubmit={handleSubmit}
						editing={p42.editing}
						updating={p42.updating}
						readWorking={p42.readWorking}
						readError={p42.readError}
						data={p42.itemData}
						itemDataReady={p42.itemDataReady}
						onCityChange={handleCityChange}
						onBusCompChange={handleBusCompChange}
						onTourGroupChange={handleTourGroupChange}
						onTourGuideChange={handleTourGuideChange}
						cflagDisabled={cflagDisabled}
					/>
				</FormMetaProvider>
				<P42Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogExContainer>
		</FormProvider>
	);
});

P42DialogContainer.displayName = "P42DialogContainer";




