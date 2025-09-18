import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { C04Context } from "@/contexts/C04/C04Context";
import { toastEx } from "@/helpers/toastEx";
import Colors from "@/modules/Colors.mjs";
import { DialogEx } from "@/shared-components";
import { dateInputColumn } from "@/shared-components/dsg/columns/date-input/dateInputColumn";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import MuiStyles from "@/shared-modules/MuiStyles";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C04Drawer from "../C04Drawer";
import C04DialogForm from "./C04DialogForm";
import { C04DialogToolbarContainer } from "./toolbar/C04DialogToolbarContainer";
import { useHotkeys } from "react-hotkeys-hook";

export const C04DialogContainer = forwardRef((props, ref) => {
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


	const ordId = useWatch({
		name: "GinID",
		control: form.control,
	})

	const supplier = useWatch({
		name: "supplier",
		control: form.control,
	});

	const stkDate = useWatch({
		name: "GinDate",
		control: form.control,
	});

	const purchaseOrders = useWatch({
		name: "purchaseOrders",
		control: form.control
	})

	const c04 = useContext(C04Context);

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c04.creating) {
			return "建立進貨單";
		} else if (c04.updating) {
			return "修改進貨單";
		} else {
			return "進貨單內容";
		}
	}, [c04.creating, c04.updating]);

	const handleClose = useMemo(() => {
		return c04.creating
			? c04.confirmQuitCreating
			: c04.updating
				? c04.confirmQuitUpdating
				: c04.reading
					? c04.cancelAction
					: null;
	}, [
		c04.cancelAction,
		c04.confirmQuitCreating,
		c04.confirmQuitUpdating,
		c04.creating,
		c04.reading,
		c04.updating,
	]);

	const handleSubmit = useCallback(() => {
		if (c04.editing) {
			form.handleSubmit(
				c04.onEditorSubmit,
				c04.onEditorSubmitError
			)()
		}
	}, [c04.editing, c04.onEditorSubmit, c04.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	// const handleRefreshGridSubmit = form.handleSubmit(
	// 	c04.onRefreshGridSubmit2,
	// 	c04.onRefreshGridSubmitError
	// );

	const handleLoadProdsSubmit = form.handleSubmit(
		c04.onLoadProdsSubmit({ setValue: form.setValue }),
		c04.onLoadProdsSubmitError
	);

	// -------------------- CELL --------------------
	const readOnly = useMemo(() => {
		return !c04.editing || !supplier || !stkDate;
	}, [c04.editing, stkDate, supplier]);

	const columns = useMemo(
		() => [

			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						packageType: "i",
						// selectOnFocus: true,
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

					})
				),
				title: "商品編號",
				minWidth: 170,
				maxWidth: 170,
				disabled: readOnly || c04.prodDisabled,
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
				grow: 1.5,
			},
			{
				...keyColumn(
					"PackData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "包裝",
				minWidth: 80,
				maxWidth: 80,
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
				title: "進貨單價",
				minWidth: 120,
				disabled: readOnly || c04.spriceDisabled,
				cellClassName: c04.getSPriceClassName,
			},
			{
				...keyColumn(
					"stype",
					optionPickerColumn(FreeProdTypePickerComponentContainer, {
						name: "stype",
						disableClearable: true,
						disableOpenOnInput: true,
						autoHighlight: true,
						selectOnFocus: true,
						// forcePopupIcon: false
					})
				),
				title: "試贈樣",
				minWidth: 70,
				maxWidth: 70,
				disabled: readOnly,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "進貨數量",
				minWidth: 90,
				disabled: readOnly,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "進貨金額",
				minWidth: 120,
				disabled: true,
			},
			{
				// ...keyColumn("SExpDate", dateFieldColumnEx),
				...keyColumn("SExpDate", dateInputColumn),
				title: "有效日期",
				minWidth: 110,
				maxWidth: 110,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"ordId",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "採購單號",
				minWidth: 120,
				maxWidth: 120,
				disabled: true,
			},
			{
				...keyColumn(
					"SOrdFlag_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				minWidth: 38,
				maxWidth: 38,
				title: "採",
				disabled: true,
				cellClassName: "star",
			},
		],
		[c04.getSPriceClassName, c04.prodDisabled, c04.spriceDisabled, readOnly]
	);

	const gridMeta = useDSGMeta({
		data: c04.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})
	// -------------------- FormMeta --------------------
	const supplierNameDisable = useMemo(() => {
		return c04.isSupplierNameDisabled(supplier)
	}, [c04, supplier]);

	// const supplierDisabled = useMemo(() => {
	// 	return purchaseOrders?.length > 0 && c04.updating
	// }, [c04.updating, purchaseOrders?.length])

	const purchaseOrdersDisabled = useMemo(() => {
		return !!c04.itemData?.GinID || !supplier;
	}, [c04.itemData?.GinID, supplier]);

	const isFieldDisabled = useCallback((field) => {
		switch (field.name) {
			case "supplier":
				return c04.supplierDisabled;
			case "FactData":
				return supplierNameDisable;
			case "purchaseOrders":
				return purchaseOrdersDisabled;
			default:
				return false;
		}
	}, [c04.supplierDisabled, supplierNameDisable, purchaseOrdersDisabled]);

	const handleLastField = useCallback(() => {
		if (!stkDate) {
			toastEx.error("請先輸入進貨日期");
			form.setFocus("GinDate");
			return;
		}
		if (!supplier) {
			toastEx.error("請先輸入供應商");
			form.setFocus("supplier");
			return;
		}

		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [stkDate, supplier, gridMeta, form]);

	const formMeta = useFormMeta(
		`
		GinDate,
		employee,
		supplier,
		FactData,
		Uniform,
		TaxType,
		InvNo,
		FactAddr,
		purchaseOrders
		`,
		{
			lastField: handleLastField
		}
	)

	const debouncedStkDate = useDebounce(stkDate, 1000);

	const supplierNameDisabled = useMemo(() => {
		return c04.isSupplierNameDisabled(supplier);
	}, [c04, supplier])


	useChangeTracking(() => {
		// 進入編輯後的變更才算
		if (c04.editing) {
			c04.refreshGrid({ formData: form.getValues(), setValue: form.setValue });
		}
	}, [debouncedStkDate], {
		debug: true,
		tag: C04DialogContainer.displayName
	});

	useChangeTracking(() => {
		if (c04.itemDataReady) {
			console.log("c04 form reset", c04.itemData);
			reset(c04.itemData);
		}
	}, [c04.itemData, c04.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogEx
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C04DialogToolbarContainer}
				open={c04.itemViewOpen}
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
				<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled} gridMeta={gridMeta} readOnly={readOnly}>
					<C04DialogForm
						onSubmit={handleSubmit}
						creating={c04.creating}
						editing={c04.editing}
						updating={c04.updating}
						readWorking={c04.readWorking}
						readError={c04.readError}
						data={c04.itemData}
						itemDataReady={c04.itemDataReady}
						handleSupplierChanged={c04.handleSupplierChanged({
							setValue: form.setValue,
							getValues: form.getValues,
							// handleRefreshGridSubmit,
						})}
						handleStkDateChanged={c04.handleStkDateChanged({
							setValue: form.setValue,
							getValues: form.getValues,
							// handleRefreshGridSubmit,
						})}
						handlePurchaseOrdersChanged={c04.handlePurchaseOrdersChanged(
							{
								setValue: form.setValue,
								getValues: form.getValues,
							}
						)}
						supplier={supplier}
						// isSupplierNameDisabled={c04.isSupplierNameDisabled}
						supplierNameDisabled={supplierNameDisabled}
						purchaseOrdersDisabled={purchaseOrdersDisabled}
						// handleRefreshGridSubmit={handleRefreshGridSubmit}
						handleLoadProdsSubmit={handleLoadProdsSubmit}
						handleTaxTypeChange={c04.handleTaxTypeChange({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
						supplierDisabled={c04.supplierDisabled}
					/>
				</FormMetaProvider>
				<C04Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogEx>
		</FormProvider>
	);
});

C04DialogContainer.displayName = "C04DialogContainer";
