import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { BContext } from "@/contexts/B/BContext";
import { B011Context } from "@/contexts/B011/B011Context";
import { B031Context } from "@/contexts/B031/B031Context";
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
import PropTypes from "prop-types";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import B011Drawer from "../B011Drawer";
import B011DialogForm from "./B011DialogForm";
import { B011DialogToolbarContainer } from "./toolbar/B011DialogToolbarContainer";
import { toastEx } from "@/helpers/toastEx";
import { useHotkeys } from "react-hotkeys-hook";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const B011DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const _height = useMemo(() => {
		return height - 120
	}, [height])
	const form = useFormContext();
	const b = useContext(BContext);
	const b011 = useContext(b.forNew ? B031Context : B011Context);
	const { importProdsDialogOpen } = b011;
	const dlgDate = useWatch({
		name: "dlgDate",
		control: form.control
	})

	const dlgEmployee = useWatch({
		name: "dlgEmployee",
		control: form.control
	})
	const dlgCustomer = useWatch({
		name: "dlgCustomer",
		control: form.control
	})

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (b011.creating) {
			return b.forNew ? "新增新客戶報價" : "新增客戶報價";
		} else if (b011.updating) {
			return b.forNew ? "修改新客戶報價" : "修改客戶報價";
		} else {
			return b.forNew ? "目前新客戶報價" : "目前客戶報價";
		}
	}, [b.forNew, b011.creating, b011.updating]);

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

	const handleSubmit = useCallback(() => {
		if (b011.editing) {
			form.handleSubmit(
				b011.onEditorSubmit,
				b011.onEditorSubmitError
			)()
		}
	}, [b011.editing, b011.onEditorSubmit, b011.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const readOnly = useMemo(() => {
		return !b011.editing
			|| (b011.editing && (!dlgCustomer || !dlgEmployee));
	}, [b011.editing, dlgCustomer, dlgEmployee]);

	const quotedPriceTitle = useMemo(() => {
		return b.forNew ? "新客戶報價" : "客戶報價";
	}, [b.forNew])

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
						focusOnDisabled: true
					})
				),
				title: "商品編號",
				minWidth: 122,
				maxWidth: 140,
				disabled: readOnly || !b011.creating,
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
				// maxWidth: 120,
				disabled: true,
			},
			{
				...keyColumn("QPrice", createFloatColumn(2)),
				title: quotedPriceTitle,
				minWidth: 120,
				// maxWidth: 120,
				disabled: readOnly,
			},
			...(!b011.creating ? [
				{
					// ...keyColumn("QDate", dateFieldColumnEx),
					...keyColumn("QDate", dateInputColumn),
					title: "報價日",
					minWidth: 110,
					maxWidth: 110,
					disabled: true,
				},
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
			] : [])
		],
		[b011.creating, quotedPriceTitle, readOnly]
	);

	const gridMeta = useDSGMeta({
		data: b011.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: b011.creating ? DSGLastCellBehavior.CREATE_ROW : DSGLastCellBehavior.STOP_EDITING
	})

	const handleLastField = useCallback(() => {
		if (!dlgCustomer) {
			toastEx.error("請先輸入客戶代碼");
			form.setFocus("dlgCustomer");
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
	}, [dlgCustomer, dlgDate, dlgEmployee, form, gridMeta]);

	const formMeta = useFormMeta(
		`
		dlgCustomer,
		dlgEmployee,
		dlgDate,
		`,
		{
			lastField: handleLastField
		}
	);

	useChangeTracking(() => {
		if (b011.itemDataReady) {
			console.log("b011 form reset", b011.itemData);
			form.reset(b011.itemData);
		}
	}, [b011.itemData, b011.itemDataReady]);

	useEffect(() => {
		if (!importProdsDialogOpen) {
			form.setFocus("dlgCustomer", {
				shouldSelect: true
			});
		}
	}, [form, importProdsDialogOpen]);

	const _maxWidth = useMemo(() => {
		return b011.creating ? "md" : "md";
	}, [b011.creating])

	return (

		<DialogEx
			ref={ref}
			title={memoisedTitle}
			// fullScreen
			responsive
			fullWidth
			maxWidth={_maxWidth}
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
		</DialogEx>
	);
});
B011DialogContainer.propTypes = {
	forNew: PropTypes.bool
}
B011DialogContainer.displayName = "B011DialogContainer";

