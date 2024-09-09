import { C09Context } from "@/contexts/C09/C09Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C09DialogForm from "./C09DialogForm";
import { C09DialogToolbarContainer } from "./toolbar/C09DialogToolbarContainer";
import Colors from "@/modules/md-colors";
import { keyColumn } from "react-datasheet-grid";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";
import { OutboundTypePickerComponentContainer } from "@/components/dsg/columns/outbound-type-picker/OutboundTypePickerComponentContainer";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const C09DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const c09 = useContext(C09Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c09.creating) {
			return "建立撥入單";
		} else if (c09.updating) {
			return "修改撥入單";
		} else {
			return "撥入單內容";
		}
	}, [c09.creating, c09.updating]);

	const handleClose = useMemo(() => {
		return c09.creating
			? c09.confirmQuitCreating
			: c09.updating
				? c09.confirmQuitUpdating
				: c09.reading
					? c09.cancelAction
					: null;
	}, [
		c09.cancelAction,
		c09.confirmQuitCreating,
		c09.confirmQuitUpdating,
		c09.creating,
		c09.reading,
		c09.updating,
	]);

	const txoDept = useWatch({
		name: "txoDept",
		control: form.control,
	});

	const txoOrder = useWatch({
		name: "txoOrder",
		control: form.control,
	});

	const remarkDisabled = useMemo(() => {
		return !!txoOrder;
	}, [txoOrder]);

	const readOnly = useMemo(() => {
		return !c09.editing || !txoDept || !!txoOrder;
	}, [c09.editing, txoDept, txoOrder]);

	const columns = useMemo(
		() => [

			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						selectOnFocus: true,
						triggerDelay: 300,
						queryRequired: true,
						filterByServer: true,
						disableOpenOnInput: true,
						hideControlsOnActive: false,
						forId: true,
						disableClearable: true,
						fuzzy: true,
						autoHighlight: true,
						componentsProps: {
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
				disabled: readOnly || c09.sprodDisabled,
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
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "撥入單價",
				minWidth: 100,
				grow: 1,
				disabled: true,
				cellClassName: c09.getSPriceClassName,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "撥入數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || c09.sqtyDisabled,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "撥入金額",
				minWidth: 90,
				grow: 1,
				disabled: true,
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
				minWidth: 70,
				maxWidth: 70,
				disabled: readOnly || c09.stypeDisabled,
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
						componentsProps: {
							paper: {
								sx: {
									width: 260,
								},
							},
						},
					})
				),
				title: "原因",
				minWidth: 140,
				maxWidth: 160,
				disabled: readOnly || c09.dtypeDisabled,
			},
			{
				...keyColumn("SoFlag_N", createTextColumnEx({
					continuousUpdates: false,
				})),
				minWidth: 38,
				maxWidth: 38,
				title: "出",
				disabled: true,
				cellClassName: "star",
			},
		],
		[readOnly, c09.sprodDisabled, c09.getSPriceClassName, c09.sqtyDisabled, c09.stypeDisabled, c09.dtypeDisabled]
	);

	const gridMeta = useDSGMeta({
		data: c09.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!txoDept) {
			toast.error("請先輸入撥出門市", {
				position: "top-center",
			});
			form.setFocus("txoDept");
			return;
		}

		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [form, gridMeta, txoDept]);

	const formMeta = useFormMeta(
		`
		txiDate,
		employee,
		txoOrder,
		depOrders,
		txoDept
		`,
		{
			lastField: handleLastField
		}
	)

	const handleSubmit = form.handleSubmit(
		c09.onEditorSubmit,
		c09.onEditorSubmitError
	);

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "depOrders":
					return true;
				default:
					return false;
			}
		},
		[]
	);

	useEffect(() => {
		if (c09.itemDataReady) {
			console.log("c09 form reset", c09.itemData);
			reset(c09.itemData);
		}
	}, [c09.itemData, c09.itemDataReady, reset]);


	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C09DialogToolbarContainer}
				open={c09.itemViewOpen}
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
				<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled} gridMeta={gridMeta} readOnly={readOnly}>
					<C09DialogForm
						onSubmit={handleSubmit}
						creating={c09.creating}
						editing={c09.editing}
						updating={c09.updating}
						readWorking={c09.readWorking}
						readError={c09.readError}
						data={c09.itemData}
						itemDataReady={c09.itemDataReady}
						handleTxoOrdersChanged={c09.handleTxoOrdersChanged({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
						handleTxoDeptChanged={c09.handleTxoDeptChanged({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
						// txoDeptDisabled={txoDeptDisabled}
						remarkDisabled={remarkDisabled}
					/>
				</FormMetaProvider>
			</DialogExContainer>
		</FormProvider>
	);
});

C09DialogContainer.displayName = "C09DialogContainer";
