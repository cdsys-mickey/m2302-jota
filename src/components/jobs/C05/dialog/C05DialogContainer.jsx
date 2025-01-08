import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { C05Context } from "@/contexts/C05/C05Context";
import { toastEx } from "@/helpers/toast-ex";
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
import MuiStyles from "@/shared-modules/sd-mui-styles";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C05Drawer from "../C05Drawer";
import C05DialogForm from "./C05DialogForm";
import { C05DialogToolbarContainer } from "./toolbar/C05DialogToolbarContainer";

export const C05DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const c05 = useContext(C05Context);

	const supplier = useWatch({
		name: "supplier",
		control: form.control,
	});

	const rtnDate = useWatch({
		name: "GrtDate",
		control: form.control
	})

	const readOnly = useMemo(() => {
		return !c05.editing || !supplier || !rtnDate;
	}, [c05.editing, rtnDate, supplier]);

	// const debouncedRtnDate = useDebounce(rtnDate, 800);

	// useChangeTracking(() => {
	// 	console.log(`${c05.itemData?.GrtID}.debouncedRtnDate`, debouncedRtnDate);
	// 	c05.refreshGrid({ formData: form.getValues(), setValue: form.setValue });
	// }, [debouncedRtnDate]);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c05.creating) {
			return "建立退貨單";
		} else if (c05.updating) {
			return "修改退貨單";
		} else {
			return "退貨單內容";
		}
	}, [c05.creating, c05.updating]);

	const handleClose = useMemo(() => {
		return c05.creating
			? c05.confirmQuitCreating
			: c05.updating
				? c05.confirmQuitUpdating
				: c05.reading
					? c05.cancelAction
					: null;
	}, [
		c05.cancelAction,
		c05.confirmQuitCreating,
		c05.confirmQuitUpdating,
		c05.creating,
		c05.reading,
		c05.updating,
	]);

	// -------------------- GRID --------------------
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
					})
				),
				title: "商品編號",
				minWidth: 180,
				maxWidth: 180,
				disabled: readOnly,
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
				title: "退貨單價",
				minWidth: 100,
				maxnWidth: 100,
				disabled: readOnly,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "退貨數量",
				minWidth: 100,
				maxWidth: 100,
				disabled: readOnly,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "退貨金額",
				minWidth: 120,
				maxWidth: 120,
				disabled: true,
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
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: c05.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleSubmit = form.handleSubmit(
		c05.onEditorSubmit,
		c05.onEditorSubmitError
	);

	const handleLastField = useCallback(() => {
		if (!rtnDate) {
			toastEx.error("請先輸入退貨日期");
			form.setFocus("GrtDate");
			return;
		}
		if (!supplier) {
			toastEx.error("請先輸入供應商");
			form.setFocus("supplier");
			return;
		}

		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [form, gridMeta, rtnDate, supplier]);

	const formMeta = useFormMeta(
		`
		GrtDate,
		employee,
		InvNo,
		supplier,
		FactData,
		Uniform,
		TaxType,
		FactAddr,
		`,
		{
			lastField: handleLastField
		}
	)

	const isFieldDisabled = useCallback((field) => {
		switch (field.name) {
			case "FactData":
				return c05.isSupplierNameDisabled(supplier);
			default:
				return false;
		}
	}, [c05, supplier]);

	useEffect(() => {
		if (c05.itemDataReady) {
			console.log("c05 form reset", c05.itemData);
			reset(c05.itemData);
		}
	}, [c05.itemData, c05.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C05DialogToolbarContainer}
				open={c05.itemViewOpen}
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
					<C05DialogForm
						onSubmit={handleSubmit}
						creating={c05.creating}
						editing={c05.editing}
						updating={c05.updating}
						readWorking={c05.readWorking}
						readError={c05.readError}
						data={c05.itemData}
						itemDataReady={c05.itemDataReady}
						handleSupplierChanged={c05.handleSupplierChanged({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
						// handleRtnDateChanged={c05.handleRtnDateChanged({
						// 	setValue: form.setValue,
						// 	getValues: form.getValues,
						// })}
						supplier={supplier}
						isSupplierNameDisabled={c05.isSupplierNameDisabled}
						purchaseOrdersDisabled={c05.purchaseOrdersDisabled}
						handleTaxTypeChange={c05.handleTaxTypeChange({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
					/>
				</FormMetaProvider>
			</DialogExContainer>
			<C05Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
		</FormProvider>
	);
});

C05DialogContainer.displayName = "C05DialogContainer";
