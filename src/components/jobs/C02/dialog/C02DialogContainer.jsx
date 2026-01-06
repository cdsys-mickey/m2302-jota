import { C02Context } from "@/contexts/C02/C02Context";
import Colors from "@/modules/Colors.mjs";
import { DialogEx } from "@/shared-components";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C02DialogForm from "./C02DialogForm";
import { C02DialogToolbarContainer } from "./toolbar/C02DialogToolbarContainer";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useCallback } from "react";
import { FormMetaProvider } from "@/shared-components";
import C02Drawer from "../C02Drawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { keyColumn } from "react-datasheet-grid";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import { ProdPickerComponentContainer } from "@/components/dsg/columns/prod-picker/ProdPickerComponentContainer";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useHotkeys } from "react-hotkeys-hook";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { SupplierPickerComponentContainer } from "@/components/dsg/columns/supplier-picker/SupplierPickerComponentContainer";

export const C02DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useForm({
		mode: "onSubmit",
		defaultValues: {
			prods: [],
		},
	});
	const { reset } = form;

	const c02 = useContext(C02Context);

	const _height = useMemo(() => {
		return height - 120
	}, [height])

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c02.creating) {
			return "建立請購單";
		} else if (c02.updating) {
			return "修改請購單";
		} else {
			return "請購單內容";
		}
	}, [c02.creating, c02.updating]);

	const handleClose = useMemo(() => {
		return c02.creating
			? c02.confirmQuitCreating
			: c02.updating
				? c02.confirmQuitUpdating
				: c02.reading
					? c02.reset
					: null;
	}, [
		c02.reset,
		c02.confirmQuitCreating,
		c02.confirmQuitUpdating,
		c02.creating,
		c02.reading,
		c02.updating,
	]);

	const handleSubmit = useCallback(() => {
		if (c02.editing) {
			form.handleSubmit(
				c02.onEditorSubmit,
				c02.onEditorSubmitError
			)()
		}
	}, [c02.editing, c02.onEditorSubmit, c02.onEditorSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const rqtDate = useWatch({
		name: "RqtDate",
		control: form.control
	})
	const employee = useWatch({
		name: "employee",
		control: form.control
	})
	const pdline = useWatch({
		name: "pdline",
		control: form.control
	})

	const readOnly = useMemo(() => {
		return !c02.editing || !employee || !rqtDate || !pdline;
	}, [c02.editing, employee, pdline, rqtDate]);

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
				grow: 1.5,
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
			// 	title: "庫存",
			// 	minWidth: 100,
			// 	maxWidth: 100,
			// 	disabled: true,
			// },
			{
				...keyColumn("SRqtQty", createFloatColumn(2)),
				title: "請購量",
				minWidth: 100,
				// maxWidth: 150,
				disabled: readOnly || c02.rqtQtyDisabled,
			},
			{
				...keyColumn("SOrdQty", createFloatColumn(2)),
				title: "採購量",
				minWidth: 100,
				// maxWidth: 150,
				disabled: true,
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
				disabled: readOnly,
			},
			// {
			// 	...keyColumn(
			// 		"SFactID",
			// 		createTextColumnEx({
			// 			continuousUpdates: false,
			// 		})
			// 	),
			// 	title: "供應商",
			// 	// minWidth: 80,
			// 	maxWidth: 80,
			// 	// disabled: true,
			// 	disabled: readOnly,
			// },
			{
				...keyColumn(
					"SFactNa",
					createTextColumnEx({
						continuousUpdates: false,
					})
				),
				title: "名稱",
				// grow: 2,
				minWidth: 120,
				// disabled: true,
				disabled: readOnly || c02.supplierNameDisabled,
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
		[c02.rqtQtyDisabled, c02.supplierNameDisabled, readOnly]
	);

	const gridMeta = useDSGMeta({
		data: c02.grid.gridData,
		columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW
	})

	const handleLastField = useCallback(() => {
		gridMeta.setActiveCell({ col: 0, row: 0 });
	}, [gridMeta]);

	const formMeta = useFormMeta(
		`
		RqtDate,
		employee,
		pdline,
		`,
		{
			lastField: handleLastField
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

	useChangeTracking(() => {
		if (c02.itemDataReady) {
			console.log("c02 form reset", c02.itemData);
			reset(c02.itemData);
		}
	}, [c02.itemData, c02.itemDataReady]);

	return (
		<FormProvider {...form}>
			<DialogEx
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="xl"
				TitleButtonsComponent={C02DialogToolbarContainer}
				open={c02.itemViewOpen}
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
					<form onSubmit={handleSubmit}>
						<C02DialogForm
							reading={c02.reading}
							creating={c02.creating}
							editing={c02.editing}
							updating={c02.updating}
							readWorking={c02.readWorking}
							readError={c02.readError}
							data={c02.itemData}
							itemDataReady={c02.itemDataReady}
							onSubmit={handleSubmit}
						// validateDate={c02.validateDate}
						/>
						<C02Drawer BackdropProps={{ sx: [MuiStyles.BACKDROP_TRANSPARENT] }} />
					</form>
				</FormMetaProvider>
			</DialogEx>
		</FormProvider>
	);
});

C02DialogContainer.displayName = "C02DialogContainer";
