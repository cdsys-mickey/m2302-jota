import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { C03Context } from "@/contexts/C03/C03Context";
import toastEx from "@/shared-components/ToastEx/toastEx";
import Colors from "@/modules/Colors.mjs";
import { DialogEx } from "@/shared-components";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import MuiStyles from "@/shared-modules/MuiStyles";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import {
	FormProvider,
	useForm,
	useWatch
} from "react-hook-form";
import C03Drawer from "../C03Drawer";
import C03DialogForm from "./C03DialogForm";
import { C03DialogToolbarContainer } from "./toolbar/C03DialogToolbarContainer";
import { useHotkeys } from "react-hotkeys-hook";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const C03DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const _height = useMemo(() => {
		return height - 120
	}, [height])
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;


	const employee = useWatch({
		name: "employee",
		control: form.control,
	});
	const supplier = useWatch({
		name: "supplier",
		control: form.control,
	});

	const supplierName = useWatch({
		name: "FactData",
		control: form.control
	})

	const ordDate = useWatch({
		name: "OrdDate",
		control: form.control
	})

	const c03 = useContext(C03Context);

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c03.creating) {
			return "建立採購單";
		} else if (c03.updating) {
			return "修改採購單";
		} else {
			return "採購單內容";
		}
	}, [c03.creating, c03.updating]);

	const handleClose = useMemo(() => {
		return c03.creating
			? c03.confirmQuitCreating
			: c03.updating
				? c03.confirmQuitUpdating
				: c03.reading
					? c03.reset
					: null;
	}, [
		c03.confirmQuitCreating,
		c03.confirmQuitUpdating,
		c03.creating,
		c03.reading,
		c03.reset,
		c03.updating,
	]);

	const handleSubmit = useCallback(() => {
		if (c03.editing) {
			form.handleSubmit(
				c03.onEditorSubmit,
				c03.onEditorSubmitError
			)();
		}
	}, [c03.editing, c03.onEditorSubmit, c03.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const handleRefreshGridSubmit = form.handleSubmit(
		c03.onRefreshGridSubmit({ setValue: form.setValue }),
		c03.onRefreshGridSubmitError
	);

	const supplierNameDisabled = useMemo(() => {
		return c03.isSupplierNameDisabled(supplier);
	}, [c03, supplier]);

	const readOnly = useMemo(() => {
		return !c03.editing || !!c03.itemData?.GinID_N || !employee || !supplier || !ordDate || !supplier || (supplier?.FactID === "*" && !supplierName);
	}, [c03.editing, c03.itemData?.GinID_N, employee, ordDate, supplier, supplierName]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						packageType: "i",
						forId: true,
						disableClearable: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
						focusOnDisabled: true,
						// disableClose: true
					})
				),
				title: "商品編號",
				minWidth: 130,
				maxWidth: 150,
				disabled: readOnly || c03.prodDisabled,
			},
			{
				...keyColumn(
					"ProdData",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				disabled: true,
				grow: 2,
			},
			{
				...keyColumn(
					"PackData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "包裝說明",
				minWidth: 120,
				maxWidth: 120,
				disabled: true,
			},
			{
				...keyColumn(
					"SInqFlag",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				minWidth: 38,
				maxWidth: 38,
				title: "詢",
				disabled: true,
				cellClassName: "star",
			},
			{
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "單價",
				minWidth: 100,
				disabled: readOnly || c03.spriceDisabled,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || c03.sqtyDisabled,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
			{
				...keyColumn("SNotQty", createFloatColumn(2)),
				title: "未進量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || c03.sNotQtyDisabled,
			},
		],
		[c03.prodDisabled, c03.sNotQtyDisabled, c03.spriceDisabled, c03.sqtyDisabled, readOnly]
	);

	const gridMeta = useDSGMeta({
		data: c03.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: c03.creating ? DSGLastCellBehavior.CREATE_ROW : DSGLastCellBehavior.STOP_EDITING
	})

	const isFieldDisabled = useCallback((field) => {
		switch (field.name) {
			case "FactData":
				return supplierNameDisabled;
			default:
				return !c03.editing;
		}
	}, [c03.editing, supplierNameDisabled]);

	const handleLastField = useCallback(() => {
		if (!ordDate) {
			toastEx.error("請先輸入採購日期");
			form.setFocus("OrdDate");
			return;
		}

		if (!supplier) {
			toastEx.error("請先輸入供應商");
			form.setFocus("supplier");
			return;
		}

		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [form, gridMeta, ordDate, supplier]);

	const formMeta = useFormMeta(
		`
		employee,
		squared,
		OrdDate,
		ArrDate,
		supplier,
		FactData,
		`,
		{
			lastField: handleLastField
		}
	)

	useChangeTracking(() => {
		if (c03.itemDataReady) {
			console.log("c03 form reset", c03.itemData);
			reset(c03.itemData);
		}
	}, [c03.itemData, c03.itemDataReady]);

	return (
		<FormProvider {...form}>
			<DialogEx
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C03DialogToolbarContainer}
				open={c03.itemViewOpen}
				onClose={handleClose}
				// onReturn={handleReturn}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: Colors.DIALOG_BG,
					},
				}}
				contentSx={[
					{
						minHeight: "30em",
						paddingTop: 0,
						// paddingLeft: 0,
						// paddingRight: 0,
					},
					scrollable.scroller,
				]}
				{...rest}>
				<FormMetaProvider
					{...formMeta}
					isFieldDisabled={isFieldDisabled}
					gridMeta={gridMeta}
					readOnly={readOnly}
				>
					<form onSubmit={handleSubmit}>
						<C03DialogForm
							creating={c03.creating}
							editing={c03.editing}
							updating={c03.updating}
							readWorking={c03.readWorking}
							readError={c03.readError}
							data={c03.itemData}
							itemDataReady={c03.itemDataReady}
							handleSupplierChanged={c03.supplierChangedHandler({
								setValue: form.setValue,
								getValues: form.getValues,
								handleSubmit: handleRefreshGridSubmit,
							})}
							handleOrdDateChanged={c03.buildOrdDateChangeHandler({
								getValues: form.getValues,
								setValue: form.setValue,
								handleSubmit: handleRefreshGridSubmit,
							})}
							supplierPickerDisabled={c03.supplierPickerDisabled}
							squaredFlagDisabled={c03.squaredFlagDisabled}
							sNotQtyDisabled={c03.sNotQtyDisabled}
							// supplier={supplier}
							// isSupplierNameDisabled={c03.isSupplierNameDisabled}
							supplierNameDisabled={supplierNameDisabled}
						/>
					</form>
				</FormMetaProvider>
				<C03Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogEx>
		</FormProvider>
	);
});

C03DialogContainer.displayName = "C03DialogContainer";
