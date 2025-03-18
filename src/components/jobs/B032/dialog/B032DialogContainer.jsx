import { CustomerPickerComponentContainer } from "@/components/dsg/columns/customer-picker/CustomerPickerComponentContainer";
import { EmployeePickerComponentContainer } from "@/components/dsg/columns/employee-picker/EmployeePickerComponentContainer";
import { BContext } from "@/contexts/B/BContext";
import { B012Context } from "@/contexts/B012/B012Context";
import { B032Context } from "@/contexts/B032/B032Context";
import { toastEx } from "@/helpers/toastEx";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { dateInputColumn } from "@/shared-components/dsg/columns/date-input/dateInputColumn";
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
import B032Drawer from "../B032Drawer";
import B032DialogForm from "./B032DialogForm";
import { B032DialogToolbarContainer } from "./toolbar/B032DialogToolbarContainer";

export const B032DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			quotes: [],
		},
	});
	const b = useContext(BContext);
	const b032 = useContext(b.forNew ? B032Context : B012Context);
	const { importCustsDialogOpen } = b032;
	const date = useWatch({
		name: "Date",
		control: form.control
	})

	const employee = useWatch({
		name: "employee",
		control: form.control
	})
	const prod = useWatch({
		name: "prod",
		control: form.control
	})

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (b032.creating) {
			return "建立詢價單";
		} else if (b032.updating) {
			return "修改詢價單";
		} else {
			return "詢價單內容";
		}
	}, [b032.creating, b032.updating]);

	const handleClose = useMemo(() => {
		return b032.creating
			? b032.confirmQuitCreating
			: b032.updating
				? b032.confirmQuitUpdating
				: b032.reading
					? b032.cancelAction
					: null;
	}, [
		b032.cancelAction,
		b032.confirmQuitCreating,
		b032.confirmQuitUpdating,
		b032.creating,
		b032.reading,
		b032.updating,
	]);

	const handleSubmit = form.handleSubmit(
		b032.onEditorSubmit,
		b032.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !b032.editing
			|| (b032.creating && (!prod || !employee || !date))
			|| (b032.updating && (!prod || !employee));
	}, [b032.editing, b032.creating, b032.updating, prod, employee, date]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"customer",
					optionPickerColumn(CustomerPickerComponentContainer, {
						name: "customer",
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
				title: "客戶代碼",
				minWidth: 180,
				maxWidth: 180,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"CustData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "客戶名稱",
				disabled: true,
				grow: 2,
			},
			{
				...keyColumn("QPrice", createFloatColumn(2)),
				title: "客戶報價",
				minWidth: 120,
				maxWidth: 120,
				disabled: readOnly,
			},
			{
				// ...keyColumn("QDate", dateFieldColumnEx),
				...keyColumn("QDate", dateInputColumn),
				title: "報價日",
				minWidth: 110,
				maxWidth: 110,
				disabled: true,
			},
			{
				...keyColumn(
					"employee",
					optionPickerColumn(EmployeePickerComponentContainer, {
						name: "employee",
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
				title: "報價人",
				minWidth: 140,
				maxWidth: 140,
				disabled: true,
			},
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: b032.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!prod) {
			toastEx.error("請先輸入貨品編號");
			form.setFocus("prod");
			return;
		}
		if (!employee) {
			toastEx.error("請先輸入報價人員");
			form.setFocus("employee");
			return;
		}
		if (!date) {
			toastEx.error("請先輸入報價日期");
			form.setFocus("Date");
			return;
		}


		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [prod, employee, date, gridMeta, form]);

	const formMeta = useFormMeta(
		`
		prod,
		employee,
		Date,
		`,
		{
			lastField: handleLastField
		}
	);

	useEffect(() => {
		if (b032.itemDataReady) {
			console.log("b032 form reset", b032.itemData);
			form.reset(b032.itemData);
		}
	}, [b032.itemData, b032.itemDataReady, form]);

	useEffect(() => {
		if (!importCustsDialogOpen) {
			form.setFocus("prod", {
				shouldSelect: true
			});
		}
	}, [form, importCustsDialogOpen]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={B032DialogToolbarContainer}
				open={b032.itemViewOpen}
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
					<FormMetaProvider {...formMeta} gridMeta={gridMeta} readOnly={readOnly}>
						<B032DialogForm
							creating={b032.creating}
							editing={b032.editing}
							updating={b032.updating}
							readWorking={b032.readWorking}
							readError={b032.readError}
							data={b032.itemData}
							itemDataReady={b032.itemDataReady}
							handleProdChange={b032.handleProdChange({ setValue: form.setValue })}
						/>

					</FormMetaProvider>
				</form>

				{/* 側邊欄 */}
				<B032Drawer />
			</DialogExContainer>
		</FormProvider>
	);
});

B032DialogContainer.displayName = "B032DialogContainer";



