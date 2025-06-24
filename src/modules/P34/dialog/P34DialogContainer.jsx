import { P34Context } from "@/modules/P34/P34Context";
import Colors from "@/modules/Colors.mjs";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import P34DialogForm from "../form/P34DialogForm";
import { P34DialogButtonsContainer } from "./buttons/P34DialogButtonsContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import P34Drawer from "../P34Drawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";
import { useCallback } from "react";
import { keyColumn } from "react-datasheet-grid";
import { createCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";

export const P34DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {},
	});
	const { reset } = form;
	const p34 = useContext(P34Context);

	const _height = useMemo(() => {
		return height - 120
	}, [height])

	const readOnly = useMemo(() => {
		return p34.gridDisabled;
	}, [p34.gridDisabled])

	const columns = useMemo(
		() => [
			{
				...keyColumn("MDnCP", createFloatColumn(2)),
				title: "比較下限值(≧)",
				minWidth: 130,
				disabled: readOnly,
			},
			{
				...keyColumn("MUpCP", createFloatColumn(2)),
				title: "比較上限值(<)",
				minWidth: 130,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"MBonus",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "獎勵金(%)",
				disabled: readOnly,
				minWidth: 130,
				// maxWidth: 120,
			},
			{
				...keyColumn(
					"MFixP",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "定點值",
				minWidth: 70,
				maxWidth: 70,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: p34.grid.gridData,
		columns: columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: p34.grid
	});

	const handleLastField = useCallback(() => {
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [gridMeta]);

	const formMeta = useFormMeta(
		`
		CarID,
		CarData,
		AbbrID,
		city,
		area,
		Contact,
		Tel,
		Fax,
		Cel,
		Email,
		Postal,
		Addr,
		Uniform,
		InvTitle,
		bank,
		BankAcct,
		Remark,
		Assign,
		AsRemark
		`, {
		lastField: handleLastField
	}
	);



	const title = useMemo(() => {
		if (p34.creating) {
			return "新增";
		} else if (p34.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [p34.creating, p34.updating]);

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleCityChange = useCallback((newValue) => {
		form.setValue("area", newValue?.CtAreaID ? {
			CodeID: newValue.CtAreaID,
			CodeData: newValue.CtAreaData
		} : null)
	}, [form]);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(p34.onEditorSubmit, p34.onEditorSubmitError);
	}, [p34.onEditorSubmit, p34.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useEffect(() => {
		// if (p34.readState === ActionState.DONE && !!p34.itemData) {
		if (p34.itemDataReady) {
			console.log(`p34 form reset`, p34.itemData);
			reset(p34.itemData);
		}
	}, [p34.itemData, p34.itemDataReady, p34.readState, form, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={P34DialogButtonsContainer}
				open={p34.itemViewOpen}
				onClose={
					p34.editing ? p34.confirmDialogClose : p34.cancelAction
				}
				// onReturn={p34.updating ? p34.confirmReturn : null}
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
				<FormMetaProvider {...formMeta} gridMeta={gridMeta}>
					<P34DialogForm
						ref={ref}
						onSubmit={handleSubmit}
						creating={p34.creating}
						editing={p34.editing}
						updating={p34.updating}
						readWorking={p34.readWorking}
						readError={p34.readError}
						data={p34.itemData}
						itemDataReady={p34.itemDataReady}
						onCityChange={handleCityChange}
					/>
				</FormMetaProvider>
				<P34Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogExContainer>
		</FormProvider>
	);
});

P34DialogContainer.displayName = "P34DialogContainer";

