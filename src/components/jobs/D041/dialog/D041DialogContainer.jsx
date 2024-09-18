import { D041Context } from "@/contexts/D041/D041Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D041DialogForm from "./D041DialogForm";
import { D041DialogToolbarContainer } from "./toolbar/D041DialogToolbarContainer";
import Colors from "@/modules/md-colors";
import D041Drawer from "../D041Drawer";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { dateFnsDateColumn } from "@/shared-components/dsg/columns/date/dateFnsDateColumn";
import { OutboundTypePickerComponentContainer } from "@/components/dsg/columns/outbound-type-picker/OutboundTypePickerComponentContainer";
import { createCheckboxExColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxExColumn";
import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useCallback } from "react";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const D041DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;
	const employee = useWatch({
		name: "employee",
		control: form.control,
	});
	const entDate = useWatch({
		name: "EntDate",
		control: form.control,
	});
	const pdline = useWatch({
		name: "pdline",
		control: form.control,
	});

	const d041 = useContext(D041Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d041.creating) {
			return "建立入庫單";
		} else if (d041.updating) {
			return "修改入庫單";
		} else {
			return "入庫單內容";
		}
	}, [d041.creating, d041.updating]);

	const handleClose = useMemo(() => {
		return d041.creating
			? d041.confirmQuitCreating
			: d041.updating
				? d041.confirmQuitUpdating
				: d041.reading
					? d041.cancelAction
					: null;
	}, [
		d041.cancelAction,
		d041.confirmQuitCreating,
		d041.confirmQuitUpdating,
		d041.creating,
		d041.reading,
		d041.updating,
	]);

	const handleSubmit = form.handleSubmit(
		d041.onEditorSubmit,
		d041.onEditorSubmitError
	);

	const readOnly = useMemo(() => {
		return !d041.editing || !employee || !pdline || !entDate;
	}, [d041.editing, employee, entDate, pdline]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						withBomPackageName: true,
						forId: true,
						disableClearable: true,
						fuzzy: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
						// selectOnFocus: true,
						// triggerDelay: 300,
						// queryRequired: true,
						// filterByServer: true,
						// disableOpenOnInput: true,
						// hideControlsOnActive: false,
						// autoHighlight: true,
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
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("SExpDate", dateFnsDateColumn),
				title: "有效日期",
				minWidth: 140,
				maxWidth: 160,
				disabled: readOnly,
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
				title: "不良",
				minWidth: 140,
				maxWidth: 160,
				disabled: readOnly || d041.dtypeDisabled,
			},
			{
				...keyColumn(
					"reworked",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "重",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || d041.reworkedDisabled,
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
				minWidth: 80,
				maxWidth: 80,
				disabled: readOnly || d041.stypeDisabled,
			},
			{
				...keyColumn(
					"SRemark",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "備註",
				grow: 3,
				disabled: readOnly,
			},
		],
		[d041.dtypeDisabled, d041.reworkedDisabled, d041.stypeDisabled, readOnly]
	);

	const gridMeta = useDSGMeta({
		data: d041.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		gridMeta.setActiveCell({ row: 0, col: 0 });
	}, [gridMeta]);

	const formMeta = useFormMeta(
		`
		employee,
		EntDate,
		pdline
		`, {
		lastField: handleLastField
	}
	)

	useEffect(() => {
		if (d041.itemDataReady) {
			console.log("d041 form reset", d041.itemData);
			reset(d041.itemData);
		}
	}, [d041.itemData, d041.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={D041DialogToolbarContainer}
				open={d041.itemViewOpen}
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
				<FormMetaProvider {...formMeta} gridMeta={gridMeta} readOnly={readOnly}>
					<D041DialogForm
						onSubmit={handleSubmit}
						creating={d041.creating}
						editing={d041.editing}
						updating={d041.updating}
						readWorking={d041.readWorking}
						readError={d041.readError}
						data={d041.itemData}
						itemDataReady={d041.itemDataReady}
					/>
				</FormMetaProvider>
				<D041Drawer />
			</DialogExContainer>
		</FormProvider>
	);
});

D041DialogContainer.displayName = "D041DialogContainer";
