import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { D01Context } from "@/contexts/D01/D01Context";
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
import D01Drawer from "../D01Drawer";
import D01DialogForm from "./D01DialogForm";
import { D01DialogToolbarContainer } from "./toolbar/D01DialogToolbarContainer";

export const D01DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;
	const pdline = useWatch({
		name: "pdline",
		control: form.control,
	});

	const d01 = useContext(D01Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (d01.creating) {
			return "建立領料單";
		} else if (d01.updating) {
			return "修改領料單";
		} else {
			return "領料單內容";
		}
	}, [d01.creating, d01.updating]);

	const handleClose = useMemo(() => {
		return d01.creating
			? d01.confirmQuitCreating
			: d01.updating
				? d01.confirmQuitUpdating
				: d01.reading
					? d01.cancelAction
					: null;
	}, [
		d01.cancelAction,
		d01.confirmQuitCreating,
		d01.confirmQuitUpdating,
		d01.creating,
		d01.reading,
		d01.updating,
	]);



	const readOnly = useMemo(() => {
		return !d01.editing || !pdline;
	}, [d01.editing, pdline]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						packageType: "m",
						forId: true,
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
			{
				...keyColumn("StockQty_N", createFloatColumn(2)),
				title: "庫存",
				minWidth: 90,
				disabled: true,
			},
			{
				...keyColumn(
					"SQtyNote",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "強",
				minWidth: 38,
				maxWidth: 38,
				disabled: true,
				cellClassName: "star",
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "進貨數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("SExpDate", dateFieldColumnEx),
				title: "有效日期",
				minWidth: 150,
				maxWidth: 150,
				disabled: readOnly,
			},

		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: d01.grid.gridData,
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
		OutDate,
		pdline
		`, {
		lastField: handleLastField
	}
	)

	const handleSubmit = form.handleSubmit(
		d01.onEditorSubmit({ setValue: form.setValue, gridMeta }),
		d01.onEditorSubmitError
	);


	useEffect(() => {
		if (d01.itemDataReady) {
			console.log("d01 form reset", d01.itemData);
			reset(d01.itemData);
		}
	}, [d01.itemData, d01.itemDataReady, reset]);

	useEffect(() => {
		if (d01.committed) {
			console.log("committed", d01.grid.gridData);
			handleSubmit();
		}
	}, [d01.committed, d01.grid.gridData, handleSubmit]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} gridMeta={gridMeta} readOnly={readOnly}>
				<DialogExContainer
					ref={ref}
					title={memoisedTitle}
					// fullScreen
					responsive
					fullWidth
					maxWidth="md"
					TitleButtonsComponent={D01DialogToolbarContainer}
					open={d01.itemViewOpen}
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

					<D01DialogForm
						onSubmit={handleSubmit}
						creating={d01.creating}
						editing={d01.editing}
						updating={d01.updating}
						readWorking={d01.readWorking}
						readError={d01.readError}
						data={d01.itemData}
						itemDataReady={d01.itemDataReady}
					/>

					<D01Drawer />
				</DialogExContainer>
			</FormMetaProvider>
		</FormProvider>
	);
});

D01DialogContainer.displayName = "D01DialogContainer";
