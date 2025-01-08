import { EmployeePickerComponentContainer } from "@/components/dsg/columns/employee-picker/EmployeePickerComponentContainer";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { B031Context } from "@/contexts/B031/B031Context";
import { toastEx } from "@/helpers/toast-ex";
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
import { isValid } from "date-fns";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import B031Drawer from "../B031Drawer";
import B031DialogForm from "./B031DialogForm";
import { B031DialogToolbarContainer } from "./toolbar/B031DialogToolbarContainer";

export const B031DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			quotes: [],
		},
	});
	const b031 = useContext(B031Context);
	const { importProdsDialogOpen } = b031;
	const date = useWatch({
		name: "Date",
		control: form.control
	})

	const employee = useWatch({
		name: "employee",
		control: form.control
	})
	const customer = useWatch({
		name: "customer",
		control: form.control
	})

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (b031.creating) {
			return "建立詢價單";
		} else if (b031.updating) {
			return "修改詢價單";
		} else {
			return "詢價單內容";
		}
	}, [b031.creating, b031.updating]);

	const handleClose = useMemo(() => {
		return b031.creating
			? b031.confirmQuitCreating
			: b031.updating
				? b031.confirmQuitUpdating
				: b031.reading
					? b031.cancelAction
					: null;
	}, [
		b031.cancelAction,
		b031.confirmQuitCreating,
		b031.confirmQuitUpdating,
		b031.creating,
		b031.reading,
		b031.updating,
	]);

	const handleSubmit = form.handleSubmit(
		b031.onEditorSubmit,
		b031.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !b031.editing
			|| (b031.creating && (!customer || !employee || !isValid(date)))
			|| (b031.updating && (!customer || !employee));
	}, [b031.editing, b031.creating, b031.updating, customer, employee, date]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						packageType: "s",
						forId: true,
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
				minWidth: 180,
				maxWidth: 180,
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
				title: "包裝說明",
				minWidth: 120,
				maxWidth: 120,
				disabled: true,
			},
			{
				...keyColumn("Price", createFloatColumn(2)),
				title: "建議售價",
				minWidth: 120,
				maxWidth: 120,
				disabled: true,
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
		data: b031.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!customer) {
			toastEx.error("請先輸入客戶代碼");
			form.setFocus("customer");
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
	}, [customer, date, employee, form, gridMeta]);

	const formMeta = useFormMeta(
		`
		customer,
		employee,
		Date,
		`,
		{
			lastField: handleLastField
		}
	);

	useEffect(() => {
		if (b031.itemDataReady) {
			console.log("b031 form reset", b031.itemData);
			form.reset(b031.itemData);
		}
	}, [b031.itemData, b031.itemDataReady, form]);

	useEffect(() => {
		if (!importProdsDialogOpen) {
			form.setFocus("customer", {
				shouldSelect: true
			});
		}
	}, [form, importProdsDialogOpen]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={B031DialogToolbarContainer}
				open={b031.itemViewOpen}
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
						<B031DialogForm
							creating={b031.creating}
							editing={b031.editing}
							updating={b031.updating}
							readWorking={b031.readWorking}
							readError={b031.readError}
							data={b031.itemData}
							itemDataReady={b031.itemDataReady}
						/>

					</FormMetaProvider>
				</form>

				{/* 側邊欄 */}
				<B031Drawer />
			</DialogExContainer>
		</FormProvider>
	);
});

B031DialogContainer.displayName = "B031DialogContainer";


