import { EmployeePickerComponentContainer } from "@/components/dsg/columns/employee-picker/EmployeePickerComponentContainer";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { E021Context } from "@/contexts/E021/E021Context";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { dateFieldColumnEx } from "@/shared-components/dsg/columns/date/dateFieldColumnEx";
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
import E021Drawer from "../E021Drawer";
import E021DialogForm from "./E021DialogForm";
import { E021DialogToolbarContainer } from "./toolbar/E021DialogToolbarContainer";
import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";

export const E021DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			quotes: [],
		},
	});

	const e021 = useContext(E021Context);

	const salesDate = useWatch({
		name: "SalDate",
		control: form.control
	})

	const arrDate = useWatch({
		name: "ArrDate",
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
		if (e021.creating) {
			return "建立客戶銷貨單";
		} else if (e021.updating) {
			return "修改客戶銷貨單";
		} else {
			return "客戶銷貨單內容";
		}
	}, [e021.creating, e021.updating]);

	const handleClose = useMemo(() => {
		return e021.creating
			? e021.confirmQuitCreating
			: e021.updating
				? e021.confirmQuitUpdating
				: e021.reading
					? e021.cancelAction
					: null;
	}, [
		e021.cancelAction,
		e021.confirmQuitCreating,
		e021.confirmQuitUpdating,
		e021.creating,
		e021.reading,
		e021.updating,
	]);



	const readOnly = useMemo(() => {
		return !e021.editing || !salesDate || !arrDate || !compTel || !custName || !employee || (!retail && !customer);
	}, [e021.editing, salesDate, arrDate, compTel, custName, employee, retail, customer]);

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
						disableClearable: true,
						withPrice: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
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
				disabled: readOnly || e021.spriceDisabled,
				cellClassName: e021.getSPriceClassName,
			},
			{
				...keyColumn("SQtyNote", createTextColumnEx({
					continuousUpdates: false,
				})),
				minWidth: 38,
				maxWidth: 38,
				title: "強",
				disabled: true,
				cellClassName: "star",
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "銷貨數量",
				minWidth: 100,
				maxWidth: 100,
				disabled: readOnly || e021.sqtyDisabled,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "銷貨金額",
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
		[customer?.CustID, e021.getSPriceClassName, e021.spriceDisabled, e021.sqtyDisabled, readOnly, retail]
	);

	const gridMeta = useDSGMeta({
		data: e021.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!salesDate) {
			toast.error("請先輸入銷貨日期", {
				position: "top-center",
			});
			form.setFocus("OrdDate");
			return;
		}
		if (!arrDate) {
			toast.error("請先輸入到貨日期", {
				position: "top-center",
			});
			form.setFocus("ArrDate");
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
	}, [arrDate, compTel, custName, customer, form, gridMeta, salesDate, retail]);

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
		return !!e021.itemData?.SalID || (!customer && !retail);
	}, [customer, e021.itemData?.SalID, retail])

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
		SalDate,
		ArrDate,
		RetDate,
		dontPrtAmt,
		retail,
		customer,
		customerOrders,
		CustName,
		CompTel,
		employee,
		RecAddr,
		transType,
		taxExcluded,
		paymentType,
		InvAddr,
		UniForm,
		deliveryEmployee,
		HDNo,
		InvNo
		`,
		{
			lastField: handleLastField
		}
	);

	const handleSubmit = form.handleSubmit(
		e021.onEditorSubmit({
			setValue: form.setValue, gridMeta
		}),
		e021.onEditorSubmitError
	);

	useEffect(() => {
		if (e021.itemDataReady) {
			console.log("e021 form reset", e021.itemData);
			form.reset(e021.itemData);
		}
	}, [e021.itemData, e021.itemDataReady, form]);

	useEffect(() => {
		if (e021.committed) {
			console.log("committed", e021.grid.gridData);
			handleSubmit();
		}
	}, [e021.committed, e021.grid.gridData, handleSubmit]);

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
					TitleButtonsComponent={E021DialogToolbarContainer}
					open={e021.itemViewOpen}
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

						<E021DialogForm
							creating={e021.creating}
							editing={e021.editing}
							updating={e021.updating}
							readWorking={e021.readWorking}
							readError={e021.readError}
							data={e021.itemData}
							itemDataReady={e021.itemDataReady}
							squaredDisabled={e021.squaredDisabled}
							handleCustomerChange={e021.handleCustomerChange({ setValue: form.setValue, getValues: form.getValues, formMeta })}
							handleRetailChange={e021.handleRetailChange({ setValue: form.setValue })}
							validateCustomer={validateCustomer}
							customerRequired={customerRequired}
							handleTaxTypeChange={e021.handleTaxTypeChange({ setValue: form.setValue, getValues: form.getValues })}

							customerOrdersDisabled={customerOrdersDisabled}
							handleCustomerOrdersChanged={e021.handleCustomerOrdersChanged({
								setValue: form.setValue,
								getValues: form.getValues,
							})}
						/>

					</form>

					{/* 側邊欄 */}
					<E021Drawer />
				</DialogExContainer>
			</FormMetaProvider>
		</FormProvider>
	);
});

E021DialogContainer.displayName = "E021DialogContainer";



