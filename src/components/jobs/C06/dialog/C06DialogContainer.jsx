import { FreeProdTypePickerComponentContainer } from "@/components/dsg/columns/free-prod-type-picker/FreeProdTypePickerComponentContainer";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { C06Context } from "@/contexts/C06/C06Context";
import { toastEx } from "@/helpers/toast-ex";
import Colors from "@/modules/md-colors";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import { forwardRef, useCallback, useContext, useEffect, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C06Drawer from "../C06Drawer";
import C06DialogForm from "./C06DialogForm";
import { C06DialogToolbarContainer } from "./toolbar/C06DialogToolbarContainer";

export const C06DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const spDept = useWatch({
		name: "spDept",
		control: form.control,
	});

	const c06 = useContext(C06Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c06.creating) {
			return "建立門市訂貨單";
		} else if (c06.updating) {
			return "修改門市訂貨單";
		} else {
			return "門市訂貨單內容";
		}
	}, [c06.creating, c06.updating]);

	const readOnly = useMemo(() => {
		return !c06.editing || !spDept;
	}, [c06.editing, spDept]);

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						withStock: true,
						packageType: "s",
						forId: true,
						disableClearable: true,
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
						focusOnDisabled: true
					})
				),
				title: "商品編號",
				minWidth: 140,
				maxWidth: 140,
				disabled: readOnly || c06.sprodDisabled,
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
				...keyColumn("SPrice", createFloatColumn(2)),
				title: "單價",
				minWidth: 90,
				maxnWidth: 90,
				grow: 1,
				disabled: true,
				cellClassName: c06.getSPriceClassName,
			},
			{
				...keyColumn("SQty", createFloatColumn(2)),
				title: "訂貨量",
				minWidth: 90,
				grow: 1,
				disabled: readOnly || c06.sqtyDisabled,
			},
			{
				...keyColumn("PackData_N", createTextColumnEx({
					continuousUpdates: false,
				})),
				minWidth: 60,
				title: "包裝",
				disabled: true,
			},
			{
				...keyColumn("SAmt", createFloatColumn(2)),
				title: "金額",
				minWidth: 90,
				maxnWidth: 90,
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
						// forcePopupIcon: false
					})
				),
				title: "試贈樣",
				minWidth: 70,
				maxWidth: 70,
				disabled: readOnly || c06.stypeDisabled,
			},
			{
				...keyColumn(
					"SRemark",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "備註",
				grow: 2,
				disabled: readOnly,
			},
			{
				...keyColumn("SNotQty", createFloatColumn(2)),
				title: "未到量",
				minWidth: 90,
				maxnWidth: 90,
				disabled: readOnly || c06.sNotQtyDisabled,
			},
			// {
			// 	...keyColumn("SMsg", createTextColumnEx({
			// 		continuousUpdates: false,
			// 	})),
			// 	title: "訊息",
			// 	minWidth: 140,
			// 	disabled: true,
			// },
		],
		[readOnly, c06.sprodDisabled, c06.getSPriceClassName, c06.sqtyDisabled, c06.stypeDisabled, c06.sNotQtyDisabled]
	);

	const gridMeta = useDSGMeta({
		data: c06.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleClose = useMemo(() => {
		return c06.creating
			? c06.confirmQuitCreating
			: c06.updating
				? c06.confirmQuitUpdating
				: c06.reading
					? c06.cancelAction
					: null;
	}, [
		c06.cancelAction,
		c06.confirmQuitCreating,
		c06.confirmQuitUpdating,
		c06.creating,
		c06.reading,
		c06.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c06.onEditorSubmit,
		c06.onEditorSubmitError
	);

	const handleLastField = useCallback(() => {
		console.log("handleLastField");
		if (!spDept) {
			toastEx.error("請先輸入出貨部門");
			form.setFocus("spDept");
			return;
		}
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [form, gridMeta, spDept]);

	const formMeta = useFormMeta(
		`
		OrdDate,
		ArrDate,
		spDept,
		employee,
		squared,
		`,
		{
			lastField: handleLastField
		}
	)

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "squared":
					return c06.squaredFlagDisabled;
				default:
					return false;
			}
		},
		[c06.squaredFlagDisabled]
	);

	useEffect(() => {
		if (c06.itemDataReady) {
			console.log("c06 form reset", c06.itemData);
			reset(c06.itemData);
		}
	}, [c06.itemData, c06.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C06DialogToolbarContainer}
				open={c06.itemViewOpen}
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
					<C06DialogForm
						onSubmit={handleSubmit}
						creating={c06.creating}
						editing={c06.editing}
						updating={c06.updating}
						readWorking={c06.readWorking}
						readError={c06.readError}
						data={c06.itemData}
						itemDataReady={c06.itemDataReady}
						squaredFlagDisabled={c06.squaredFlagDisabled}
						handleSpDeptChanged={c06.handleSpDeptChanged({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
						spDeptDisabled={c06.spDeptDisabled}
					/>
					<C06Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
				</FormMetaProvider>
			</DialogExContainer>
		</FormProvider>
	);
});

C06DialogContainer.displayName = "C06DialogContainer";
