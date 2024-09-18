import { C08Context } from "@/contexts/C08/C08Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C08DialogForm from "./C08DialogForm";
import { C08DialogToolbarContainer } from "./toolbar/C08DialogToolbarContainer";
import Colors from "@/modules/md-colors";
import useDebounce from "@/shared-hooks/useDebounce";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import C08Drawer from "../C08Drawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createCheckboxExColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxExColumn";
import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";
import { OutboundTypePickerComponentContainer } from "@/components/dsg/columns/outbound-type-picker/OutboundTypePickerComponentContainer";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const C08DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;
	const txiDept = useWatch({
		name: "txiDept",
		control: form.control,
	});

	const c08 = useContext(C08Context);
	// const { getSOrdId } = c08;

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c08.creating) {
			return "建立撥出單";
		} else if (c08.updating) {
			return "修改撥出單";
		} else {
			return "撥出單內容";
		}
	}, [c08.creating, c08.updating]);

	const handleClose = useMemo(() => {
		return c08.creating
			? c08.confirmQuitCreating
			: c08.updating
				? c08.confirmQuitUpdating
				: c08.reading
					? c08.cancelAction
					: null;
	}, [
		c08.cancelAction,
		c08.confirmQuitCreating,
		c08.confirmQuitUpdating,
		c08.creating,
		c08.reading,
		c08.updating,
	]);

	// -------------------- GRID --------------------
	const readOnly = useMemo(() => {
		return !c08.editing || !txiDept;
	}, [c08.editing, txiDept]);

	const columns = useMemo(
		() => [

			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						withPurchasePackageName: true,
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
				disabled: readOnly || c08.sprodDisabled,
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
				title: "調撥單價",
				minWidth: 100,
				grow: 1,
				disabled: true,
				cellClassName: c08.getSPriceClassName,
			},
			{
				...keyColumn("StockQty_N", createFloatColumn(2)),
				title: "庫存",
				minWidth: 90,
				disabled: true,
			},
			{
				...keyColumn(
					"overrideSQty",
					createCheckboxExColumn({
						size: "medium",
					})
				),
				title: "註",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || c08.overrideSQtyDisabled,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "調撥數量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || c08.sqtyDisabled,
				cellClassName: c08.getSQtyClassName,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "金額",
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
				title: "贈品",
				minWidth: 80,
				maxWidth: 80,
				disabled: readOnly || c08.stypeDisabled,
			},
			{
				...keyColumn(
					"dtype",
					optionPickerColumn(OutboundTypePickerComponentContainer, {
						name: "dtype",
						// optionLabelSize: "md",
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
				title: "原因",
				minWidth: 140,
				maxWidth: 160,
				disabled: readOnly || c08.dtypeDisabled,
			},
			{
				...keyColumn("SOrdFlag_N", createTextColumnEx({
					continuousUpdates: false,
				})),
				minWidth: 38,
				maxWidth: 38,
				title: "訂",
				disabled: true,
				cellClassName: "star",
			},
			// {
			// 	...keyColumn("SMsg", textColumn),
			// 	title: "訊息",
			// 	minWidth: 140,
			// 	disabled: true,
			// },
		],
		[readOnly, c08.sprodDisabled, c08.getSPriceClassName, c08.overrideSQtyDisabled, c08.sqtyDisabled, c08.getSQtyClassName, c08.stypeDisabled, c08.dtypeDisabled]
	);

	const gridMeta = useDSGMeta({
		data: c08.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		if (!txiDept) {
			toast.error("請先輸入退貨日期", {
				position: "top-center",
			});
			form.setFocus("GrtDate");
			return;
		}
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [form, gridMeta, txiDept]);



	const handleSubmit = form.handleSubmit(
		c08.onEditorSubmit,
		c08.onEditorSubmitError
	);

	const formMeta = useFormMeta(
		`
		TxoDate,
		employee,
		txiDept,
		depOrders,
		transType,
		deliveryEmployee,
		HDNo
		`,
		{
			lastField: handleLastField
		}
	)

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "depOrders":
					return !txiDept;
				default:
					return false;
			}
		},
		[txiDept]
	);

	useEffect(() => {
		if (c08.itemDataReady) {
			console.log("c08 form reset", c08.itemData);
			reset(c08.itemData);
		}
	}, [c08.itemData, c08.itemDataReady, reset]);

	// 非同步獲取 sord 資訊
	// const sordId = useMemo(() => {
	// 	return getSOrdId();
	// }, [getSOrdId]);
	// const debouncedSOrdId = useDebounce(sordId, 300);

	// useChangeTracking(() => {
	// 	console.log("sordId", debouncedSOrdId);
	// }, [debouncedSOrdId]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C08DialogToolbarContainer}
				open={c08.itemViewOpen}
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
					<C08DialogForm
						onSubmit={handleSubmit}
						creating={c08.creating}
						editing={c08.editing}
						updating={c08.updating}
						readWorking={c08.readWorking}
						readError={c08.readError}
						data={c08.itemData}
						itemDataReady={c08.itemDataReady}
						handleDepOrdersChanged={c08.handleDepOrdersChanged({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
						handleTxiDeptChanged={c08.handleTxiDeptChanged({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
						purchaseOrdersDisabled={!txiDept}
					/>
				</FormMetaProvider>
				<C08Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogExContainer>
		</FormProvider>
	);
});

C08DialogContainer.displayName = "C08DialogContainer";
