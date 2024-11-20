import { D05Context } from "@/contexts/D05/D05Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D05DialogForm from "./D05DialogForm";
import { D05DialogToolbarContainer } from "./toolbar/D05DialogToolbarContainer";
import Colors from "@/modules/md-colors";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { OutboundTypePickerComponentContainer } from "@/components/dsg/columns/outbound-type-picker/OutboundTypePickerComponentContainer";
import { CustomerPickerComponentContainer } from "@/components/dsg/columns/customer-picker/CustomerPickerComponentContainer";
import { DeptPickerComponentContainer } from "@/components/dsg/columns/dept-picker/DeptPickerComponentContainer";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { LastFieldBehavior } from "@/shared-contexts/form-meta/LastFieldBehavior";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import D05Drawer from "../D05Drawer";

export const D05DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const d05 = useContext(D05Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d05.creating) {
			return "建立報廢單";
		} else if (d05.updating) {
			return "修改報廢單";
		} else {
			return "報廢單內容";
		}
	}, [d05.creating, d05.updating]);

	const handleClose = useMemo(() => {
		return d05.creating
			? d05.confirmQuitCreating
			: d05.updating
				? d05.confirmQuitUpdating
				: d05.reading
					? d05.cancelAction
					: null;
	}, [
		d05.cancelAction,
		d05.confirmQuitCreating,
		d05.confirmQuitUpdating,
		d05.creating,
		d05.reading,
		d05.updating,
	]);

	const wdate = useWatch({
		name: "wdate",
		control: form.control
	})

	const employee = useWatch({
		name: "employee",
		control: form.control
	})

	const readOnly = useMemo(() => {
		return !d05.editing || !wdate || !employee;
	}, [d05.editing, employee, wdate]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						packageType: "b",
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
				minWidth: 160,
				maxWidth: 160,
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
				minWidth: 60,
				title: "包裝",
				disabled: true,
			},
			// {
			// 	...keyColumn("StockQty_N", createFloatColumn(2)),
			// 	title: "庫存",
			// 	minWidth: 90,
			// 	disabled: true,
			// },
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || d05.sqtyDisabled,
			},
			{
				...keyColumn(
					"dtype",
					optionPickerColumn(OutboundTypePickerComponentContainer, {
						name: "dtype",
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
				disabled: readOnly || d05.dtypeDisabled,
			},
			{
				...keyColumn(
					"customer",
					optionPickerColumn(CustomerPickerComponentContainer, {
						name: "customer",
						forId: true,
						selectOnFocus: true,
						triggerDelay: 100,
						// filterByServer: true,
						virtualize: true,
						// queryRequired: true,
						disableOpenOnInput: true,
						disableClearable: true,
						autoHighlight: true,
						slotProps: {
							paper: {
								sx: {
									width: 380,
								},
							},
						},
					})
				),
				title: "客戶代碼",
				minWidth: 140,
				maxWidth: 140,
				disabled: readOnly || d05.customerDisabled,
			},
			{
				...keyColumn(
					"dept",
					optionPickerColumn(DeptPickerComponentContainer, {
						name: "dept",
						disableOpenOnInput: true,
						// hideControlsOnActive: true,
						forId: true,
						disableClearable: true,
						selectOnFocus: true,
						autoHighlight: true,
						slotProps: {
							paper: {
								sx: {
									width: 200,
								},
							},
						},
					})
				),
				title: "門市碼",
				minWidth: 140,
				maxWidth: 140,
				disabled: readOnly || d05.deptDisabled,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
			},
		],
		[d05.customerDisabled, d05.deptDisabled, d05.dtypeDisabled, d05.sqtyDisabled, readOnly]
	);

	const gridMeta = useDSGMeta({
		data: d05.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!wdate) {
			toast.error("請先輸入報廢日期", {
				position: "top-right",
			});
			form.setFocus("wdate");
			return;
		}
		if (!employee) {
			toast.error("請先輸入倉管人員", {
				position: "top-right",
			});
			form.setFocus("employee");
			return;
		}

		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [employee, form, gridMeta, wdate]);

	const formMeta = useFormMeta(
		`
		wdate,
		employee
		`,
		{
			lastField: handleLastField,
		}
	);

	const handleSubmit = form.handleSubmit(
		d05.onEditorSubmit({ setValue: form.setValue, gridMeta }),
		d05.onEditorSubmitError
	);

	useEffect(() => {
		if (d05.itemDataReady) {
			console.log("d05 form reset", d05.itemData);
			reset(d05.itemData);
		}
	}, [d05.itemData, d05.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider
				{...formMeta}
				gridMeta={gridMeta}
				readOnly={readOnly}
			>
				<DialogExContainer
					ref={ref}
					title={memoisedTitle}
					// fullScreen
					responsive
					fullWidth
					maxWidth="lg"
					TitleButtonsComponent={D05DialogToolbarContainer}
					open={d05.itemViewOpen}
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

					<D05DialogForm
						onSubmit={handleSubmit}
						creating={d05.creating}
						editing={d05.editing}
						updating={d05.updating}
						readWorking={d05.readWorking}
						readError={d05.readError}
						data={d05.itemData}
						itemDataReady={d05.itemDataReady}
					/>
					<D05Drawer />
				</DialogExContainer>
			</FormMetaProvider>
		</FormProvider>
	);
});

D05DialogContainer.displayName = "D05DialogContainer";
