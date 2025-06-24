import { P35Context } from "@/modules/P35/P35Context";
import Colors from "@/modules/Colors.mjs";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import P35DialogForm from "../form/P35DialogForm";
import { P35DialogButtonsContainer } from "./buttons/P35DialogButtonsContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import P35Drawer from "../P35Drawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";
import { useCallback } from "react";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import CmsTypePickerCell from "@/components/CmsTypePicker/CmsTypePickerCell";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";

export const P35DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {},
	});
	const { reset } = form;
	const p35 = useContext(P35Context);

	const _height = useMemo(() => {
		return height - 110
	}, [height])

	const readOnly = useMemo(() => {
		return p35.gridDisabled;
	}, [p35.gridDisabled])

	const columns = useMemo(
		() => [
			{
				...keyColumn("cmsType",
					optionPickerColumn(CmsTypePickerCell, {
						name: "cmsType",
					})
				),
				title: "佣金類別",
				// minWidth: 130,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"STrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "旅行社佣金(%)",
				disabled: readOnly,
				minWidth: 130,
				maxWidth: 130,
			},
			{
				...keyColumn(
					"SCndCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "導遊佣金(%)",
				disabled: readOnly,
				minWidth: 130,
				maxWidth: 130,
			},
			{
				...keyColumn(
					"SDrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "司機佣金(%)",
				disabled: readOnly,
				minWidth: 130,
				maxWidth: 130,
			},
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: p35.grid.gridData,
		columns: columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: p35.grid
	});

	const handleLastField = useCallback(() => {
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [gridMeta]);

	const formMeta = useFormMeta(
		`
		guideAmt,
		guideAmtMultipliedByBus,
		driverAmt,
		driverAmtMultipliedByBus,
		TrvID,
		TrvData,
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
		AsRemark,
		Bonus1,
		Bonus11,
		CmsDn,
		clearOnSite1,
		clearOnSite2,
		clearOnSite3,
		`, {
		lastField: handleLastField
	}
	);



	const title = useMemo(() => {
		if (p35.creating) {
			return "新增";
		} else if (p35.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [p35.creating, p35.updating]);

	const scrollable = useScrollable({
		maxHeight: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(p35.onEditorSubmit, p35.onEditorSubmitError);
	}, [form, p35.onEditorSubmit, p35.onEditorSubmitError]);

	const handleCityChange = useCallback((newValue) => {
		form.setValue("area", newValue?.CtAreaID ? {
			CodeID: newValue.CtAreaID,
			CodeData: newValue.CtAreaData
		} : null)
	}, [form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useEffect(() => {
		// if (p35.readState === ActionState.DONE && !!p35.itemData) {
		if (p35.itemDataReady) {
			console.log(`p35 form reset`, p35.itemData);
			reset(p35.itemData);
		}
	}, [p35.itemData, p35.itemDataReady, p35.readState, form, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={P35DialogButtonsContainer}
				open={p35.itemViewOpen}
				onClose={
					p35.editing ? p35.confirmDialogClose : p35.cancelAction
				}
				// onReturn={p35.updating ? p35.confirmReturn : null}
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
					<P35DialogForm
						ref={ref}
						onSubmit={handleSubmit}
						editing={p35.editing}
						updating={p35.updating}
						readWorking={p35.readWorking}
						readError={p35.readError}
						data={p35.itemData}
						itemDataReady={p35.itemDataReady}
						onCityChange={handleCityChange}
					/>
				</FormMetaProvider>
				<P35Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogExContainer>
		</FormProvider>
	);
});

P35DialogContainer.displayName = "P35DialogContainer";


