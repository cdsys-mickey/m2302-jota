import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { D01Context } from "@/contexts/D01/D01Context";
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
import { FormProvider, useForm, useWatch } from "react-hook-form";
import D01Drawer from "../D01Drawer";
import D01DialogForm from "./D01DialogForm";
import { D01DialogToolbarContainer } from "./toolbar/D01DialogToolbarContainer";
import { useHotkeys } from "react-hotkeys-hook";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const D01DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const _height = useMemo(() => {
		return height - 120
	}, [height])
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
		height: _height,
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
						packageType: "b",
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
			// {
			// 	...keyColumn("StockQty_N", createFloatColumn(2)),
			// 	title: "庫存",
			// 	minWidth: 90,
			// 	disabled: true,
			// },
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
				title: "領料數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("SExpDate", dateInputColumn),
				title: "有效日期",
				minWidth: 110,
				maxWidth: 110,
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

	useHotkeys(["Control+Enter"], () => d01.editing ? setTimeout(handleSubmit) : null, {
		enableOnFormTags: true
	})

	useChangeTracking(() => {
		if (d01.itemDataReady) {
			console.log("d01 form reset", d01.itemData);
			reset(d01.itemData);
		}
	}, [d01.itemData, d01.itemDataReady]);

	useEffect(() => {
		if (d01.committed) {
			console.log("committed", d01.grid.gridData);
			handleSubmit();
		}
	}, [d01.committed, d01.grid.gridData, handleSubmit]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} gridMeta={gridMeta} readOnly={readOnly}>
				<DialogEx
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
					// validateDate={d01.validateDate}
					/>

					<D01Drawer />
				</DialogEx>
			</FormMetaProvider>
		</FormProvider>
	);
});

D01DialogContainer.displayName = "D01DialogContainer";
