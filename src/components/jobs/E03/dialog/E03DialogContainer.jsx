import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";
import { OutboundTypePickerComponentContainer } from "@/components/dsg/columns/outbound-type-picker/OutboundTypePickerComponentContainer";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { E03Context } from "@/contexts/E03/E03Context";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import E03Drawer from "../E03Drawer";
import E03DialogForm from "./E03DialogForm";
import { E03DialogToolbarContainer } from "./toolbar/E03DialogToolbarContainer";

export const E03DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			quotes: [],
		},
	});

	const e03 = useContext(E03Context);

	const returnDate = useWatch({
		name: "RetDate",
		control: form.control
	})

	const compTel = useWatch({
		name: "CompTel",
		control: form.control
	})
	const custName = useWatch({
		name: "CustName",
		control: form.control
	})
	const retail = useWatch({
		name: "retail",
		control: form.control
	})
	const customer = useWatch({
		name: "customer",
		control: form.control
	})

	const employee = useWatch({
		name: "employee",
		control: form.control
	})

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (e03.creating) {
			return "建立客戶銷退單";
		} else if (e03.updating) {
			return "修改客戶銷退單";
		} else {
			return "客戶銷退單內容";
		}
	}, [e03.creating, e03.updating]);

	const handleClose = useMemo(() => {
		return e03.creating
			? e03.confirmQuitCreating
			: e03.updating
				? e03.confirmQuitUpdating
				: e03.reading
					? e03.cancelAction
					: null;
	}, [
		e03.cancelAction,
		e03.confirmQuitCreating,
		e03.confirmQuitUpdating,
		e03.creating,
		e03.reading,
		e03.updating,
	]);



	const readOnly = useMemo(() => {
		return !e03.editing || !returnDate || !compTel || !custName || !employee || (!retail && !customer);
	}, [e03.editing, returnDate, compTel, custName, employee, retail, customer]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "innerProd",
						packageType: "s",
						forId: true,
						cst: customer?.CustID || "",
						retail: retail,
						compTel: compTel,
						disableClearable: true,
						withPrice: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
						resetOptionsOnChange: true,
						// debug: true
					})
				),
				title: "商品編號",
				minWidth: 140,
				maxWidth: 140,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"ProdData_N",
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
				title: "包裝",
				minWidth: 80,
				maxWidth: 80,
				disabled: true,
			},
			{
				...keyColumn("SQflag", createTextColumnEx({
					continuousUpdates: false,
				})),
				minWidth: 38,
				maxWidth: 38,
				title: "報",
				disabled: true,
				cellClassName: "star",
			},
			{
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "單價",
				minWidth: 120,
				maxWidth: 120,
				disabled: readOnly || e03.spriceDisabled,
				cellClassName: e03.getSPriceClassName,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 100,
				maxWidth: 100,
				disabled: readOnly || e03.sqtyDisabled,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "金額",
				minWidth: 120,
				maxWidth: 120,
				disabled: true,
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
						forcePopupIcon: false
					})
				),
				title: "試贈樣",
				minWidth: 70,
				maxWidth: 70,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"dtype",
					optionPickerColumn(OutboundTypePickerComponentContainer, {
						name: "dtype",
						// optionLabelSize: "md",
						disableOpenOnInput: true,
						disableClearable: true,
						selectOnFocus: true,
						forcePopupIcon: false,
						autoHighlight: true,
						slotProps: {
							paper: {
								sx: {
									width: 260,
								},
							},
						},
					})
				),
				title: "原因",
				minWidth: 140,
				maxWidth: 160,
				disabled: readOnly || e03.dtypeDisabled,
			},
			{
				...keyColumn(
					"SRemark",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "備註",
				grow: 2,
				disabled: readOnly,
			},
		],
		[compTel, customer?.CustID, e03.dtypeDisabled, e03.getSPriceClassName, e03.spriceDisabled, e03.sqtyDisabled, readOnly, retail]
	);

	const gridMeta = useDSGMeta({
		data: e03.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!returnDate) {
			toast.error("請先輸入銷退日期", {
				position: "top-center",
			});
			form.setFocus("OrdDate");
			return;
		}
		if (!compTel) {
			toast.error("請先輸入電話", {
				position: "top-center",
			});
			form.setFocus("CompTel");
			return;
		}
		if (!custName) {
			toast.error("請先輸入客戶名稱", {
				position: "top-center",
			});
			form.setFocus("CustName");
			return;
		}
		if (!retail && !customer) {
			toast.error("非零售請先輸入客戶代碼", {
				position: "top-center",
			});
			form.setFocus("customer");
			return;
		}

		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [returnDate, compTel, custName, retail, customer, gridMeta, form]);

	const validateCustomer = useCallback((value) => {
		if (!retail && !value) {
			return "未勾選「零售」則「客戶編號」為必填";
		}
		return true;
	}, [retail]);

	const customerRequired = useMemo(() => {
		return !retail;
	}, [retail])

	const customerOrdersDisabled = useMemo(() => {
		return !!e03.itemData?.SalID || (!customer && !retail);
	}, [customer, e03.itemData?.SalID, retail])

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "customerOrders":
					return customerOrdersDisabled;
				default:
					return false;
			}
		},
		[customerOrdersDisabled]
	);

	const formMeta = useFormMeta(
		`
		RetDate,
		retail,
		customer,
		paymentType,
		CustName,
		CompTel,
		employee,
		taxExcluded,
		RecAddr,
		transType,
		InvAddr,
		InvNo,
		UniForm,
		`,
		{
			lastField: handleLastField
		}
	);

	const handleSubmit = form.handleSubmit(
		e03.onEditorSubmit,
		e03.onEditorSubmitError
	);

	useEffect(() => {
		if (e03.itemDataReady) {
			console.log("e03 form reset", e03.itemData);
			form.reset(e03.itemData);
		}
	}, [e03.itemData, e03.itemDataReady, form]);

	useEffect(() => {
		if (e03.committed) {
			console.log("committed", e03.grid.gridData);
			handleSubmit();
		}
	}, [e03.committed, e03.grid.gridData, handleSubmit]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} gridMeta={gridMeta} readOnly={readOnly} isFieldDisabled={isFieldDisabled}>
				<DialogExContainer
					ref={ref}
					title={memoisedTitle}
					// fullScreen
					responsive
					fullWidth
					maxWidth="lg"
					TitleButtonsComponent={E03DialogToolbarContainer}
					open={e03.itemViewOpen}
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

					<form onSubmit={handleSubmit}>

						<E03DialogForm
							creating={e03.creating}
							editing={e03.editing}
							updating={e03.updating}
							readWorking={e03.readWorking}
							readError={e03.readError}
							data={e03.itemData}
							itemDataReady={e03.itemDataReady}
							squaredDisabled={e03.squaredDisabled}
							handleCustomerChange={e03.handleCustomerChange({ setValue: form.setValue, getValues: form.getValues, formMeta, gridMeta })}
							handleRetailChange={e03.handleRetailChange({ setValue: form.setValue, gridMeta })}
							validateCustomer={validateCustomer}
							customerRequired={customerRequired}
							handleTaxTypeChange={e03.handleTaxTypeChange({ setValue: form.setValue, getValues: form.getValues })}
							handleRfdAmtChange={e03.handleRfdAmtChange}
						/>

					</form>

					{/* 側邊欄 */}
					<E03Drawer />
				</DialogExContainer>
			</FormMetaProvider>
		</FormProvider>
	);
});

E03DialogContainer.displayName = "E03DialogContainer";




