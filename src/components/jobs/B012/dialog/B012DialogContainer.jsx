import { CustomerPickerComponentContainer } from "@/components/dsg/columns/customer-picker/CustomerPickerComponentContainer";
import { BContext } from "@/contexts/B/BContext";
import { B012Context } from "@/contexts/B012/B012Context";
import { B032Context } from "@/contexts/B032/B032Context";
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
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import B012Drawer from "../B012Drawer";
import B012DialogForm from "./B012DialogForm";
import { B012DialogToolbarContainer } from "./toolbar/B012DialogToolbarContainer";
import { toastEx } from "@/helpers/toastEx";
import { useHotkeys } from "react-hotkeys-hook";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const B012DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const _height = useMemo(() => {
		return height - 120
	}, [height])
	const form = useFormContext();

	const b = useContext(BContext);
	const b012 = useContext(b.forNew ? B032Context : B012Context);
	const { importCustsDialogOpen } = b012;
	const dlgDate = useWatch({
		name: "dlgDate",
		control: form.control
	})

	const dlgEmployee = useWatch({
		name: "dlgEmployee",
		control: form.control
	})
	const dlgProd = useWatch({
		name: "dlgProd",
		control: form.control
	})

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (b012.creating) {
			return b.forNew ? "新增貨品新客戶報價" : "新增貨品客戶報價";
		} else if (b012.updating) {
			return b.forNew ? "修改貨品新客戶報價" : "修改貨品客戶報價";
		} else {
			return b.forNew ? "目前貨品新客戶報價" : "目前貨品客戶報價";
		}
	}, [b.forNew, b012.creating, b012.updating]);

	const qpriceTitle = useMemo(() => {
		return b.forNew ? "新客戶報價" : "客戶報價";
	}, [b.forNew])

	const cust = useMemo(() => {
		return b.forNew ? "新客戶編號" : "客戶編號";
	}, [b.forNew])

	const custName = useMemo(() => {
		return b.forNew ? "新客戶名稱" : "客戶名稱";
	}, [b.forNew])

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

	const handleSubmit = useCallback(() => {
		if (b012.editing) {
			form.handleSubmit(
				b012.onEditorSubmit,
				b012.onEditorSubmitError
			)();
		}
	}, [b012.editing, b012.onEditorSubmit, b012.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const readOnly = useMemo(() => {
		return !b012.editing
			|| (b012.editing && (!dlgProd || !dlgEmployee || !dlgDate));
	}, [b012.editing, dlgProd, dlgEmployee, dlgDate]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"customer",
					optionPickerColumn(CustomerPickerComponentContainer, {
						name: "customer",
						forId: true,
						disableClearable: true,
						forNew: b.forNew,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
						focusOnDisabled: true
					})
				),
				title: cust,
				minWidth: 180,
				maxWidth: 180,
				disabled: readOnly || !b012.creating,
			},
			{
				...keyColumn(
					"CustData_N",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: custName,
				disabled: true,
				grow: 2,
			},
			{
				...keyColumn("QPrice", createFloatColumn(2)),
				title: qpriceTitle,
				minWidth: 120,
				// maxWidth: 120,
				disabled: readOnly,
			},
			...(!b012.creating ? [
				{
					// ...keyColumn("QDate", dateFieldColumnEx),
					...keyColumn("QDate", dateInputColumn),
					title: "報價日",
					minWidth: 110,
					maxWidth: 110,
					disabled: true,
				},
			] : [])
			// {
			// 	...keyColumn(
			// 		"dlgEmployee",
			// 		optionPickerColumn(EmployeePickerComponentContainer, {
			// 			name: "dlgEmployee",
			// 			disableClearable: true,
			// 			slotProps: {
			// 				paper: {
			// 					sx: {
			// 						width: 360,
			// 					},
			// 				},
			// 			},
			// 		})
			// 	),
			// 	title: "報價人",
			// 	minWidth: 140,
			// 	maxWidth: 140,
			// 	disabled: true,
			// },
		],
		[b.forNew, b012.creating, cust, custName, qpriceTitle, readOnly]
	);

	const gridMeta = useDSGMeta({
		data: b012.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: b012.creating ? DSGLastCellBehavior.CREATE_ROW : DSGLastCellBehavior.STOP_EDITING
	})

	const handleLastField = useCallback(() => {
		if (!dlgProd) {
			toastEx.error("請先輸入貨品編號");
			form.setFocus("dlgProd");
			return;
		}
		if (!dlgEmployee) {
			toastEx.error("請先輸入報價人員");
			form.setFocus("dlgEmployee");
			return;
		}
		if (!dlgDate) {
			toastEx.error("請先輸入報價日期");
			form.setFocus("Date");
			return;
		}


		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [dlgProd, dlgEmployee, dlgDate, gridMeta, form]);

	const formMeta = useFormMeta(
		`
		dlgProd,
		dlgEmployee,
		dlgDate,
		`,
		{
			lastField: handleLastField
		}
	);

	useChangeTracking(() => {
		if (b012.itemDataReady) {
			console.log("b012 form reset", b012.itemData);
			form.reset(b012.itemData);
		}
	}, [b012.itemData, b012.itemDataReady]);

	useEffect(() => {
		if (!importCustsDialogOpen) {
			form.setFocus("dlgProd", {
				shouldSelect: true
			});
		}
	}, [form, importCustsDialogOpen]);

	return (

		<DialogEx
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
		</DialogEx>
	);
});

B012DialogContainer.displayName = "B012DialogContainer";


