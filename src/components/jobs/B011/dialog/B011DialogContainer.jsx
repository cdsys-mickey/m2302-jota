import { EmployeePickerComponentContainer } from "@/components/dsg/columns/employee-picker/EmployeePickerComponentContainer";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { B011Context } from "@/contexts/B011/B011Context";
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
import B011Drawer from "../B011Drawer";
import B011DialogForm from "./B011DialogForm";
import { B011DialogToolbarContainer } from "./toolbar/B011DialogToolbarContainer";

export const B011DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			quotes: [],
		},
	});

	const b011 = useContext(B011Context);
	const { importProdsDialogOpen } = b011;
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
		if (b011.creating) {
			return "建立詢價單";
		} else if (b011.updating) {
			return "修改詢價單";
		} else {
			return "詢價單內容";
		}
	}, [b011.creating, b011.updating]);

	const handleClose = useMemo(() => {
		return b011.creating
			? b011.confirmQuitCreating
			: b011.updating
				? b011.confirmQuitUpdating
				: b011.reading
					? b011.cancelAction
					: null;
	}, [
		b011.cancelAction,
		b011.confirmQuitCreating,
		b011.confirmQuitUpdating,
		b011.creating,
		b011.reading,
		b011.updating,
	]);

	const handleSubmit = form.handleSubmit(
		b011.onEditorSubmit,
		b011.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !b011.editing
			|| (b011.creating && (!customer || !employee || !date))
			|| (b011.updating && (!customer || !employee));
	}, [b011.editing, b011.creating, b011.updating, customer, employee, date]);

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
				...keyColumn("QDate", dateFieldColumnEx),
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
		data: b011.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!customer) {
			toast.error("請先輸入客戶代碼", {
				position: "top-center",
			});
			form.setFocus("customer");
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
		if (b011.itemDataReady) {
			console.log("b011 form reset", b011.itemData);
			form.reset(b011.itemData);
		}
	}, [b011.itemData, b011.itemDataReady, form]);

	useEffect(() => {
		if (!importProdsDialogOpen) {
			form.setFocus("customer", {
				shouldSelect: true
			});
		}
	}, [importProdsDialogOpen]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={B011DialogToolbarContainer}
				open={b011.itemViewOpen}
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
						<B011DialogForm
							creating={b011.creating}
							editing={b011.editing}
							updating={b011.updating}
							readWorking={b011.readWorking}
							readError={b011.readError}
							data={b011.itemData}
							itemDataReady={b011.itemDataReady}
						/>

					</FormMetaProvider>
				</form>

				{/* 側邊欄 */}
				<B011Drawer />
			</DialogExContainer>
		</FormProvider>
	);
});

B011DialogContainer.displayName = "B011DialogContainer";

