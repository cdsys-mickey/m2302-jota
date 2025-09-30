import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { E01Context } from "@/contexts/E01/E01Context";
import toastEx from "@/helpers/toastEx";
import Colors from "@/modules/Colors.mjs";
import { DialogEx } from "@/shared-components";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import E01Drawer from "../E01Drawer";
import E01DialogForm from "./E01DialogForm";
import { E01DialogToolbarContainer } from "./toolbar/E01DialogToolbarContainer";
import { useHotkeys } from "react-hotkeys-hook";

export const E01DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const _height = useMemo(() => {
		return height - 120
	}, [height])
	const form = useForm({
		defaultValues: {
			quotes: [],
		},
	});

	const e01 = useContext(E01Context);

	// const activeCell = useWatch({
	// 	name: "activeCell",
	// 	control: form.control
	// })

	// const debouncedActiveCell = useDebounceObject(activeCell, 800);

	// useChangeTracking(() => {
	// 	form.setValue("msg", `col: ${debouncedActiveCell.col}, row: ${debouncedActiveCell.row}`);
	// }, [debouncedActiveCell]);

	const ordDate = useWatch({
		name: "OrdDate",
		control: form.control
	})

	const debouncedOrdDate = useDebounceObject(ordDate, 300);

	useChangeTracking(() => {
		if (e01.editing) {
			form.setValue("ArrDate", debouncedOrdDate);
		}
	}, [debouncedOrdDate]);

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

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (e01.creating) {
			return "建立客戶訂貨單";
		} else if (e01.updating) {
			return "修改客戶訂貨單";
		} else {
			return "客戶訂貨單內容";
		}
	}, [e01.creating, e01.updating]);

	const handleClose = useMemo(() => {
		return e01.creating
			? e01.confirmQuitCreating
			: e01.updating
				? e01.confirmQuitUpdating
				: e01.reading
					? e01.cancelAction
					: null;
	}, [
		e01.cancelAction,
		e01.confirmQuitCreating,
		e01.confirmQuitUpdating,
		e01.creating,
		e01.reading,
		e01.updating,
	]);

	const handleSubmit = useCallback(() => {
		if (e01.editing) {
			form.handleSubmit(
				e01.onEditorSubmit,
				e01.onEditorSubmitError
			)();
		}
	}, [e01.editing, e01.onEditorSubmit, e01.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const handleRefreshGridSubmit = form.handleSubmit(
		e01.onRefreshGridSubmit({ setValue: form.setValue }),
		e01.onRefreshGridSubmitError
	);

	const readOnly = useMemo(() => {
		return !e01.editing || !ordDate || !arrDate || !custName || (!retail && !customer);
	}, [arrDate, custName, customer, e01.editing, ordDate, retail]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						packageType: "s",
						forId: true,
						cst: customer?.CustID || "",
						retail: retail,
						// compTel: compTel,
						disableClearable: true,
						withPrice: true,
						withStock: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
						clearOptionsOnChange: true,
						focusOnDisabled: true
					})
				),
				title: "商品編號",
				minWidth: 122,
				maxWidth: 140,
				disabled: readOnly || e01.sprodDisabled,
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
				// maxWidth: 120,
				disabled: readOnly || e01.spriceDisabled,
				cellClassName: e01.getSPriceClassName,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "訂貨數量",
				minWidth: 100,
				// maxWidth: 100,
				disabled: readOnly || e01.sqtyDisabled,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "訂貨金額",
				minWidth: 120,
				// maxWidth: 120,
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
						// forcePopupIcon: false
					})
				),
				title: "試贈樣",
				minWidth: 70,
				maxWidth: 70,
				disabled: readOnly || e01.stypeDisabled,
			},
			{
				...keyColumn(
					"SRemark",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "備註",
				grow: 1,
				disabled: readOnly,
			},
			// 已出量不顯示
			{
				...keyColumn("SNotQty", createFloatColumn(2)),
				title: "未出量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || e01.sNotQtyDisabled,
			},
		],
		[customer?.CustID, e01.getSPriceClassName, e01.sNotQtyDisabled, e01.spriceDisabled, e01.sprodDisabled, e01.sqtyDisabled, e01.stypeDisabled, readOnly, retail]
	);

	const gridMeta = useDSGMeta({
		data: e01.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		// onActiveCellChange: e01.onActiveCellChange({ setValue: form.setValue })
	})

	const handleLastField = useCallback(() => {
		if (!ordDate) {
			toastEx.error("請先輸入訂貨日期");
			form.setFocus("OrdDate");
			return;
		}
		if (!arrDate) {
			toastEx.error("請先輸入到貨日期");
			form.setFocus("ArrDate");
			return;
		}
		if (!compTel) {
			toastEx.error("請先輸入電話");
			form.setFocus("CompTel");
			return;
		}
		if (!custName) {
			toastEx.error("請先輸入客戶名稱");
			form.setFocus("CustName");
			return;
		}
		if (!retail && !customer) {
			toastEx.error("非零售請先輸入客戶代碼");
			form.setFocus("customer");
			return;
		}

		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [arrDate, compTel, custName, customer, form, gridMeta, ordDate, retail]);

	const formMeta = useFormMeta(
		`
		OrdDate,
		ArrDate,
		squared,
		dontPrtAmt,
		employee,
		retail,
		customer,
		CustName,
		paymentType,
		CompTel,
		taxExcluded,
		RecAddr,
		transType,
		InvAddr,
		UniForm,
		`,
		{
			lastField: handleLastField
		}
	);

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "squared":
					return e01.squaredDisabled;
				default:
					return false;
			}
		},
		[e01.squaredDisabled]
	);

	const validateCustomer = useCallback((value) => {
		if (!retail && !value) {
			return "未勾選「零售」則「客戶編號」為必填";
		}
		return true;
	}, [retail]);

	const customerRequired = useMemo(() => {
		return !retail;
	}, [retail])

	useChangeTracking(() => {
		if (e01.itemDataReady) {
			console.log("e01 form reset", e01.itemData);
			form.reset(e01.itemData);
		}
	}, [e01.itemData, e01.itemDataReady]);

	return (
		<FormProvider {...form}>
			<DialogEx
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={E01DialogToolbarContainer}
				open={e01.itemViewOpen}
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
					<FormMetaProvider {...formMeta} gridMeta={gridMeta} readOnly={readOnly} isFieldDisabled={isFieldDisabled}>
						<E01DialogForm
							creating={e01.creating}
							editing={e01.editing}
							updating={e01.updating}
							readWorking={e01.readWorking}
							readError={e01.readError}
							data={e01.itemData}
							itemDataReady={e01.itemDataReady}
							squaredDisabled={e01.squaredDisabled}
							handleCustomerChange={e01.handleCustomerChange({
								setValue: form.setValue,
								getValues: form.getValues,
								formMeta,
								gridMeta,
								handleSubmit: handleRefreshGridSubmit
							})}
							handleRetailChange={e01.handleRetailChange({ setValue: form.setValue, gridMeta })}
							validateCustomer={validateCustomer}
							customerRequired={customerRequired}
							handleTaxTypeChange={e01.handleTaxTypeChange({
								setValue: form.setValue,
								getValues: form.getValues
							})}
						/>

					</FormMetaProvider>
				</form>

				{/* 側邊欄 */}
				<E01Drawer />
			</DialogEx>
		</FormProvider>
	);
});

E01DialogContainer.displayName = "E01DialogContainer";


