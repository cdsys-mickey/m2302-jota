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
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import { useRef } from "react";
import CrudContext from "@/contexts/crud/CrudContext";

export const P42DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const xlOrDown = useMediaQuery((theme) => theme.breakpoints.down('xl'));
	const crud = useContext(CrudContext);
	const form = useFormContext();
	const { reset } = form;
	const p42 = useContext(P42Context);
	const _height = useMemo(() => {
		return height - 40
	}, [height])

	const readOnly = useMemo(() => {
		return !p42.editing;
	}, [p42.editing])

	const rangeColumns = useMemo(
		() => [
			{
				...keyColumn(
					"SCustID",
					createTextColumnEx({
						// alignRight: true
					})
				),
				title: "卡號起",
				disabled: readOnly,
				minWidth: 110,
				maxWidth: 110,
			},
			{
				...keyColumn(
					"ECustID",
					createTextColumnEx({
						// alignRight: true
					})
				),
				title: "~迄",
				disabled: readOnly,
				grow: 1
				// minWidth: 100,
				// maxWidth: 120,
			},
		],
		[readOnly]
	);

	const rangeGridMeta = useDSGMeta({
		columns: rangeColumns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: p42.rangeGrid,
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
				disabled: true,
			},
			{
				...keyColumn(
					"SSalAmt",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "消費總額",
				disabled: true,
				minWidth: 120,
				maxWidth: 120,
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
				disabled: true,
				minWidth: 120,
				maxWidth: 120,
			},
			{
				...keyColumn(
					"STrvCmsGap",
					createTextColumnEx({
						alignRight: true
					})
				),
				disabled: true,
				minWidth: 25,
				maxWidth: 25,
			},
			{
				...keyColumn(
					"SCndCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "導遊佣金",
				disabled: true,
				minWidth: 120,
				maxWidth: 120,
			},
			{
				...keyColumn(
					"SCndCmsGap",
					createTextColumnEx({
						alignRight: true
					})
				),
				disabled: true,
				minWidth: 25,
				maxWidth: 25,
			},
			{
				...keyColumn(
					"SDrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "司機佣金",
				disabled: true,
				minWidth: 120,
				maxWidth: 120,
			},
			{
				...keyColumn(
					"SDrvCmsGap",
					createTextColumnEx({
						alignRight: true
					})
				),
				disabled: true,
				minWidth: 25,
				maxWidth: 25,
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
				minWidth: 120,
				maxWidth: 120,
			},
		],
		[readOnly]
	);

	const cmsGridMeta = useDSGMeta({
		columns: cmsColumns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: p42.cmsGrid,
	});

	const handleLastField = useCallback(() => {
		rangeGridMeta.setActiveCell({ col: 0, row: 0 });
	}, [rangeGridMeta]);

	const formMeta = useFormMeta(
		`
		TrvTotCmsC,
		TrvPay,
		CndTotCmsC,
		CndPay,
		DrvTotCmsC,
		DrvPay,
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
		hotel,
		HotelTotCms,
		HotelPay,
		Remark,
		SnRemark,
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

	const handleSubmit = useCallback(() => {
		if (p42.editing) {
			form.handleSubmit(p42.onEditorSubmit, p42.onEditorSubmitError)();
		}
	}, [form, p42.editing, p42.onEditorSubmit, p42.onEditorSubmitError]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	// *** 欄位連動

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

	const prevBookingOrder = useRef();
	useChangeTracking(() => {
		if (p42.itemDataReady) {
			console.log(`p42 form reset`, p42.itemData);
			reset(p42.itemData);
			// crud.finishedReading({
			// 	data: p42.itemData,
			// });
			prevBookingOrder.current = p42.itemData?.bookingOrder;
		} else {
			prevBookingOrder.current = null;
		}
	}, [p42.itemData, p42.itemDataReady]);

	// 預約單
	const bookingOrder = useWatch({
		name: "bookingOrder",
		control: form.control
	})

	useChangeTracking(() => {
		if (bookingOrder?.OrdID !== prevBookingOrder.current?.OrdID) {
			console.log("bookingOrder changed", prevBookingOrder.current, bookingOrder);
			p42.handleBookingOrderChange({ form })(bookingOrder);
			prevBookingOrder.current = bookingOrder;
		}
	}, [bookingOrder]);

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "area":
					// return !city;
					return true;
				default:
					return false;
			}
		},
		[]
	);

	// 佣金小計
	const fields = ["HotelTotCms", "TrvTotCms", "CndTotCms", "DrvTotCms"];
	const watchedValues = useWatch({
		control: form.control,
		name: fields,
	});

	useChangeTracking(
		() => {
			console.log("watchedValues", watchedValues);
			const sum = watchedValues.reduce((sum, value) => {
				return sum + (parseFloat(value) || 0);
			}, 0);
			form.setValue("TotCms_N", sum)
		},
		watchedValues,
		{ debug: true, tag: "TotCms_N", debounce: 300 }
	);

	// PC端佣金小計
	const pcFields = ["HotelTotCms", "TrvTotCmsC", "CndTotCmsC", "DrvTotCmsC"];

	// // 使用 useWatch 監聽欄位
	const pcWatchedValues = useWatch({
		control: form.control,
		name: pcFields,
	});

	useChangeTracking(
		() => {
			console.log("pcWatchedValues", watchedValues);
			const sum = pcWatchedValues.reduce((sum, value) => {
				return sum + (parseFloat(value) || 0);
			}, 0);
			form.setValue("TotCmsC_N", sum)
		},
		pcWatchedValues,
		{ debug: true, tag: "TotCmsC_N", debounce: 300 }
	);

	return (

		<DialogEx
			title={title}
			ref={ref}
			fullScreen={xlOrDown}
			responsive
			fullWidth
			maxWidth="xl"
			// minWidth={1300}
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
				{
					// paddingTop: 0,
					// paddingBottom: 0,
				},
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
					itemDataLoaded={p42.itemDataLoaded}
					onCityChange={handleCityChange}
					onBusCompChange={handleBusCompChange}
					onTourGroupChange={handleTourGroupChange}
					onTourGuideChange={handleTourGuideChange}
				/>
			</FormMetaProvider>
			<P42Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
		</DialogEx>
	);
});

P42DialogContainer.displayName = "P42DialogContainer";




