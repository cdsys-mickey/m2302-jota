import { C01Context } from "@/contexts/C01/C01Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useMemo } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import C01DialogForm from "./C01DialogForm";
import { useEffect } from "react";
import { C01DialogToolbarContainer } from "./toolbar/C01DialogToolbarContainer";
import Colors from "@/modules/md-colors";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import C01Drawer from "../C01Drawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { SupplierPickerComponentContainer } from "@/components/dsg/columns/supplier-picker/SupplierPickerComponentContainer";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";

export const C01DialogContainer = forwardRef((props, ref) => {
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

	const c01 = useContext(C01Context);

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c01.creating) {
			return "建立請購單";
		} else if (c01.updating) {
			return "修改請購單採購";
		} else {
			return "請購單採購內容";
		}
	}, [c01.creating, c01.updating]);

	const handleClose = useMemo(() => {
		return c01.creating
			? c01.confirmQuitCreating
			: c01.updating
				? c01.confirmQuitUpdating
				: c01.reading
					? c01.cancelAction
					: null;
	}, [
		c01.cancelAction,
		c01.confirmQuitCreating,
		c01.confirmQuitUpdating,
		c01.creating,
		c01.reading,
		c01.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c01.onEditorSubmit,
		c01.onEditorSubmitError
	);

	const formMeta = useFormMeta(
		`
		remark
		`
	)

	const readOnly = useMemo(() => {
		return !c01.editing
	}, [c01.editing])

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"prod",
					optionPickerColumn(ProdPickerComponentContainer, {
						name: "prod",
						forId: true,
						withStock: true,
						packageType: "i",
						// queryRequired: true,
						disableClearable: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
						selectOnFocus: true,
					})
				),
				id: "SProdID",
				title: "商品編號",
				minWidth: 140,
				maxWidth: 140,
				disabled: !c01.editing || c01.prodDisabled,
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
				title: "單位",
				minWidth: 60,
				maxWidth: 60,
				disabled: true,
			},
			// {
			// 	...keyColumn("StockQty_N", createFloatColumn(2)),
			// 	title: "當下庫存",
			// 	minWidth: 90,
			// 	maxWidth: 90,
			// 	disabled: true,
			// },
			{
				...keyColumn("SRqtQty", createFloatColumn(2)),
				title: "請購量",
				minWidth: 90,
				maxWidth: 90,
				disabled: !c01.editing || c01.rqtQtyDisabled,
			},
			{
				...keyColumn("SOrdQty", createFloatColumn(2)),
				title: "採購量",
				minWidth: 90,
				maxWidth: 90,
				disabled: !c01.editing || c01.orderQtyDisabled,
			},
			{
				...keyColumn(
					"supplier",
					optionPickerColumn(SupplierPickerComponentContainer, {
						name: "supplier",
						selectOnFocus: true,
						forId: true,
						disableClearable: true,
						autoHighlight: true,
						slotProps: {
							paper: {
								sx: {
									width: 360,
								},
							},
						},
					})
				),
				title: "供應商",
				minWidth: 120,
				maxWidth: 120,
				disabled: !c01.editing || c01.supplierDisabled,
			},
			{
				...keyColumn(
					"SFactNa",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "名稱",
				grow: 2,
				disabled: !c01.editing || c01.supplierNameDisabled,
			},
			{
				...keyColumn(
					"SOrdID",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "採購單",
				minWidth: 120,
				disabled: true,
			},
		],
		[c01.editing, c01.orderQtyDisabled, c01.prodDisabled, c01.rqtQtyDisabled, c01.supplierDisabled, c01.supplierNameDisabled]
	);

	const gridMeta = useDSGMeta({
		data: c01.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})


	useEffect(() => {
		if (c01.itemDataReady) {
			console.log("c01 form reset", c01.itemData);
			reset(c01.itemData);
		}
	}, [c01.itemData, c01.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C01DialogToolbarContainer}
				open={c01.itemViewOpen}
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
					<form onSubmit={handleSubmit}>
						<C01DialogForm
							creating={c01.creating}
							editing={c01.editing}
							updating={c01.updating}
							readWorking={c01.readWorking}
							readError={c01.readError}
							data={c01.itemData}
							itemDataReady={c01.itemDataReady}
							onSubmit={handleSubmit}
						/>
					</form>
				</FormMetaProvider>
				<C01Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
			</DialogExContainer>
		</FormProvider>
	);
});

C01DialogContainer.displayName = "C01DialogContainer";
