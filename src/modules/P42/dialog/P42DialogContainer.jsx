import CmsTypePickerCell from "@/components/CmsTypePicker/CmsTypePickerCell";
import Colors from "@/modules/Colors.mjs";
import { P42Context } from "@/modules/P42/P42Context";
import { FormMetaProvider } from "@/shared-components";
import { DialogEx } from "@/shared-components";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import MuiStyles from "@/shared-modules/MuiStyles";
import { forwardRef, useCallback, useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { useFormContext, useWatch } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P42DialogForm from "../form/P42DialogForm";
import P42Drawer from "../P42Drawer";
import { P42DialogButtonsContainer } from "./buttons/P42DialogButtonsContainer";
import { useMediaQuery } from "@mui/system";

export const P42DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const xlOrDown = useMediaQuery((theme) => theme.breakpoints.down('xl'));
	const form = useFormContext();
	const { reset } = form;
	const p42 = useContext(P42Context);
	const _height = useMemo(() => {
		return height - 40
	}, [height])

	const readOnly = useMemo(() => {
		return p42.gridDisabled;
	}, [p42.gridDisabled])

	const rangeColumns = useMemo(
		() => [
			{
				...keyColumn(
					"SCustID",
					createTextColumnEx({
						// alignRight: true
					})
				),
				title: "起",
				// disabled: readOnly,
				minWidth: 100,
				// maxWidth: 120,
			},
			{
				...keyColumn(
					"ECustID",
					createTextColumnEx({
						// alignRight: true
					})
				),
				title: "迄",
				// disabled: readOnly,
				minWidth: 100,
				// maxWidth: 120,
			},
		],
		[]
	);

	const rangeGridMeta = useDSGMeta({
		columns: rangeColumns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: p42.rangeGrid
	});

	const cmsColumns = useMemo(
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
					"SSalAmt",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "消費總額",
				disabled: readOnly,
				minWidth: 150,
				maxWidth: 150,
				grow: 1
			},
			{
				...keyColumn(
					"STrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "旅行社佣金",
				disabled: readOnly,
				minWidth: 150,
				maxWidth: 150,
			},
			{
				...keyColumn(
					"SCndCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "導遊佣金",
				disabled: readOnly,
				minWidth: 150,
				maxWidth: 150,
			},
			{
				...keyColumn(
					"SDrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "司機佣金",
				disabled: readOnly,
				minWidth: 150,
				maxWidth: 150,
			},
			{
				...keyColumn(
					"SPCAmt",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "PC總額",
				disabled: readOnly,
				minWidth: 150,
				maxWidth: 150,
			},
		],
		[readOnly]
	);

	const cmsGridMeta = useDSGMeta({
		columns: cmsColumns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: p42.custGrid
	});

	const handleLastField = useCallback(() => {
		rangeGridMeta.setActiveCell({ col: 0, row: 0 });
	}, [rangeGridMeta]);

	const formMeta = useFormMeta(
		`
		ComID,
		SalDate,
		bookingOrder,
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
		cashier,
		Remark,
		SnRemark,
		hotel,
		HotelCms,
		HotelPay,
		`, {
		lastField: handleLastField
	}
	);



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

	useChangeTracking(() => {
		if (p42.itemDataReady) {
			console.log(`p42 form reset`, p42.itemData);
			reset(p42.itemData);
		}
	}, [p42.itemData, p42.itemDataReady]);

	return (

		<DialogEx
			title={title}
			ref={ref}
			fullScreen={xlOrDown}
			responsive
			fullWidth
			maxWidth="lg"
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
			<FormMetaProvider {...formMeta} rangeGridMeta={rangeGridMeta} cmsGridMeta={cmsGridMeta} isFieldDisabled={isFieldDisabled}>
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
		</DialogEx>
	);
});

P42DialogContainer.displayName = "P42DialogContainer";




