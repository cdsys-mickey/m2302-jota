import { C07Context } from "@/contexts/C07/C07Context";
import { DialogEx } from "@/shared-components";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C07DialogForm from "./C07DialogForm";
import { C07DialogToolbarContainer } from "./toolbar/C07DialogToolbarContainer";
import Colors from "@/modules/Colors.mjs";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useCallback } from "react";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { LastFieldBehavior } from "@/shared-components/form-meta/LastFieldBehavior";
import { FormMetaProvider } from "@/shared-components";
import MuiStyles from "@/shared-modules/MuiStyles";
import C07Drawer from "../C07Drawer";
import { useHotkeys } from "react-hotkeys-hook";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const C07DialogContainer = forwardRef((props, ref) => {
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
	const supplier = useWatch({
		name: "supplier",
		control: form.control,
	});

	const c07 = useContext(C07Context);

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c07.creating) {
			return "建立訂貨單";
		} else if (c07.updating) {
			return "修改訂貨單";
		} else {
			return "訂貨單內容";
		}
	}, [c07.creating, c07.updating]);

	const handleClose = useMemo(() => {
		return c07.creating
			? c07.confirmQuitCreating
			: c07.updating
				? c07.confirmQuitUpdating
				: c07.reading
					? c07.cancelAction
					: null;
	}, [
		c07.cancelAction,
		c07.confirmQuitCreating,
		c07.confirmQuitUpdating,
		c07.creating,
		c07.reading,
		c07.updating,
	]);

	const readOnly = useMemo(() => {
		return !c07.editing;
	}, [c07.editing]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						packageType: "i",
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
				minWidth: 130,
				maxWidth: 150,
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
				maxWidth: 60,
				title: "包裝",
				disabled: true,
			},
			{
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "單價",
				minWidth: 100,
				// grow: 1,
				disabled: readOnly,
				cellClassName: c07.getSPriceClassName,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "訂貨量",
				minWidth: 90,
				// grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "金額",
				minWidth: 100,
				// grow: 1,
				disabled: true,
			},
			{
				...keyColumn(
					"stype",
					optionPickerColumn(FreeProdTypePickerComponentContainer, {
						name: "stype",
						disableClearable: true,
					})
				),
				title: "贈品",
				minWidth: 80,
				maxWidth: 80,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"SRemark",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "備註",
				minWidth: 120,
				disabled: readOnly,
			},
			{
				...keyColumn("SNotQty", createFloatColumn(2)),
				title: "未到量",
				minWidth: 90,
				// grow: 1,
				disabled: readOnly,
			},
		],
		[c07.getSPriceClassName, readOnly]
	);

	const gridMeta = useDSGMeta({
		data: c07.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [gridMeta]);

	const formMeta = useFormMeta(
		`
		OrdDate,
		ArrDate,
		employee,
		ordDept,
		squared
		`,
		{
			lastField: handleLastField,
		}
	)

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				default:
					return false;
			}
		},
		[]
	);

	const handleSubmit = useCallback(() => {
		if (c07.editing) {
			form.handleSubmit(
				c07.onEditorSubmit,
				c07.onEditorSubmitError
			)();
		}
	}, [c07.editing, c07.onEditorSubmit, c07.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	useChangeTracking(() => {
		if (c07.itemDataReady) {
			console.log("c07 form reset", c07.itemData);
			reset(c07.itemData);
		}
	}, [c07.itemData, c07.itemDataReady]);

	return (
		<FormProvider {...form}>
			<DialogEx
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="xl"
				TitleButtonsComponent={C07DialogToolbarContainer}
				open={c07.itemViewOpen}
				onClose={handleClose}
				// onReturn={handleReturn}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: Colors.DIALOG_BG,
					},
				}}
				contentSx={[
					{
						// minHeight: "30em",
						paddingTop: 0,
						// paddingLeft: 0,
						// paddingRight: 0,
					},
					scrollable.scroller,
				]}
				{...rest}>
				<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled} gridMeta={gridMeta} readOnly={readOnly}>
					<C07DialogForm
						onSubmit={handleSubmit}
						creating={c07.creating}
						editing={c07.editing}
						updating={c07.updating}
						readWorking={c07.readWorking}
						readError={c07.readError}
						data={c07.itemData}
						itemDataReady={c07.itemDataReady}
						handleSupplierChanged={c07.handleSupplierChanged({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
						handleRtnDateChanged={c07.handleRtnDateChanged({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
						supplier={supplier}
						isSupplierNameDisabled={c07.isSupplierNameDisabled}
						purchaseOrdersDisabled={c07.purchaseOrdersDisabled}
						handleTaxTypeChange={c07.handleTaxTypeChange({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
					/>
				</FormMetaProvider>
				<C07Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogEx>
		</FormProvider>
	);
});

C07DialogContainer.displayName = "C07DialogContainer";
