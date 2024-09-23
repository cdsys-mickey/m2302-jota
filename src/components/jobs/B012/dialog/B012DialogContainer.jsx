import { CustomerPickerComponentContainer } from "@/components/dsg/columns/customer-picker/CustomerPickerComponentContainer";
import { EmployeePickerComponentContainer } from "@/components/dsg/columns/employee-picker/EmployeePickerComponentContainer";
import { B012Context } from "@/contexts/B012/B012Context";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { dateFNSDateColumn } from "@/shared-components/dsg/columns/date/dateFNSDateColumn";
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
import B012Drawer from "../B012Drawer";
import B012DialogForm from "./B012DialogForm";
import { B012DialogToolbarContainer } from "./toolbar/B012DialogToolbarContainer";

export const B012DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			quotes: [],
		},
	});

	const b012 = useContext(B012Context);
	const { importCustsDialogOpen } = b012;
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
		if (b012.creating) {
			return "建立詢價單";
		} else if (b012.updating) {
			return "修改詢價單";
		} else {
			return "詢價單內容";
		}
	}, [b012.creating, b012.updating]);

	const handleClose = useMemo(() => {
		return b012.creating
			? b012.confirmQuitCreating
			: b012.updating
				? b012.confirmQuitUpdating
				: b012.reading
					? b012.cancelAction
					: null;
	}, [
		b012.cancelAction,
		b012.confirmQuitCreating,
		b012.confirmQuitUpdating,
		b012.creating,
		b012.reading,
		b012.updating,
	]);

	const handleSubmit = form.handleSubmit(
		b012.onEditorSubmit,
		b012.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !b012.editing
			|| (b012.creating && (!prod || !employee || !date))
			|| (b012.updating && (!prod || !employee));
	}, [b012.editing, b012.creating, b012.updating, prod, employee, date]);

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
				...keyColumn("QDate", dateFNSDateColumn),
				title: "報價日",
				minWidth: 140,
				maxWidth: 140,
				disabled: readOnly,
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
		data: b012.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!prod) {
			toast.error("請先輸入貨品編號", {
				position: "top-center",
			});
			form.setFocus("prod");
			return;
		}
		if (!employee) {
			toast.error("請先輸入報價人員", {
				position: "top-center",
			});
			form.setFocus("employee");
			return;
		}
		if (!date) {
			toast.error("請先輸入報價日期", {
				position: "top-center",
			});
			form.setFocus("Date");
			return;
		}


		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [prod, date, employee, form, gridMeta]);

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
		if (b012.itemDataReady) {
			console.log("b012 form reset", b012.itemData);
			form.reset(b012.itemData);
		}
	}, [b012.itemData, b012.itemDataReady, form]);

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
				TitleButtonsComponent={B012DialogToolbarContainer}
				open={b012.itemViewOpen}
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
						<B012DialogForm
							creating={b012.creating}
							editing={b012.editing}
							updating={b012.updating}
							readWorking={b012.readWorking}
							readError={b012.readError}
							data={b012.itemData}
							itemDataReady={b012.itemDataReady}
							handleProdChange={b012.handleProdChange({ setValue: form.setValue })}
						/>

					</FormMetaProvider>
				</form>

				{/* 側邊欄 */}
				<B012Drawer />
			</DialogExContainer>
		</FormProvider>
	);
});

B012DialogContainer.displayName = "B012DialogContainer";


