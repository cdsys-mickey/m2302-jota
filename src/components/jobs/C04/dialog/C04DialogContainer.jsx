import { C04Context } from "@/contexts/C04/C04Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C04DialogForm from "./C04DialogForm";
import { C04DialogToolbarContainer } from "./toolbar/C04DialogToolbarContainer";
import Colors from "@/modules/md-colors";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useCallback } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const C04DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
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

	const c04 = useContext(C04Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c04.creating) {
			return "建立進貨單";
		} else if (c04.updating) {
			return "修改進貨單";
		} else {
			return "進貨單內容";
		}
	}, [c04.creating, c04.updating]);

	const handleClose = useMemo(() => {
		return c04.creating
			? c04.confirmQuitCreating
			: c04.updating
				? c04.confirmQuitUpdating
				: c04.reading
					? c04.cancelAction
					: null;
	}, [
		c04.cancelAction,
		c04.confirmQuitCreating,
		c04.confirmQuitUpdating,
		c04.creating,
		c04.reading,
		c04.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c04.onEditorSubmit,
		c04.onEditorSubmitError
	);

	// const handleRefreshGridSubmit = form.handleSubmit(
	// 	c04.onRefreshGridSubmit2,
	// 	c04.onRefreshGridSubmitError
	// );

	const handleLoadProdsSubmit = form.handleSubmit(
		c04.onLoadProdsSubmit({ setValue: form.setValue }),
		c04.onLoadProdsSubmitError
	);

	const supplierNameDisable = useMemo(() => {
		return c04.isSupplierNameDisabled(supplier)
	}, [c04, supplier]);

	const isFieldDisabled = useCallback((field) => {
		switch (field.name) {
			case "FactData":
				return supplierNameDisable;
			default:
				return false;
		}
	}, [supplierNameDisable]);

	const handleLastField = useCallback(() => {
		setTimeout(() => {
			c04.gridMeta.setActiveCell({ col: 0, row: 0 });
		});
	}, [c04.gridMeta]);

	const formMeta = useFormMeta(
		`
		GinDate,
		employee,
		supplier,
		FactData,
		Uniform,
		TaxType,
		InvNo,
		FactAddr,
		purchaseOrders
		`,
		{
			lastField: handleLastField
		}
	)

	useEffect(() => {
		if (c04.itemDataReady) {
			console.log("c04 form reset", c04.itemData);
			reset(c04.itemData);
		}
	}, [c04.itemData, c04.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C04DialogToolbarContainer}
				open={c04.itemViewOpen}
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
				<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
					<C04DialogForm
						onSubmit={handleSubmit}
						creating={c04.creating}
						editing={c04.editing}
						updating={c04.updating}
						readWorking={c04.readWorking}
						readError={c04.readError}
						data={c04.itemData}
						itemDataReady={c04.itemDataReady}
						handleSupplierChanged={c04.handleSupplierChanged({
							setValue: form.setValue,
							getValues: form.getValues,
							// handleRefreshGridSubmit,
						})}
						handleRstDateChanged={c04.handleRstDateChanged({
							setValue: form.setValue,
							getValues: form.getValues,
							// handleRefreshGridSubmit,
						})}
						handlePurchaseOrdersChanged={c04.handlePurchaseOrdersChanged(
							{
								setValue: form.setValue,
								getValues: form.getValues,
							}
						)}
						supplier={supplier}
						isSupplierNameDisabled={c04.isSupplierNameDisabled}
						purchaseOrdersDisabled={c04.purchaseOrdersDisabled}
						// handleRefreshGridSubmit={handleRefreshGridSubmit}
						handleLoadProdsSubmit={handleLoadProdsSubmit}
						handleTaxTypeChanged={c04.handleTaxTypeChanged({
							setValue: form.setValue,
							getValues: form.getValues,
						})}
					/>
				</FormMetaProvider>
			</DialogExContainer>
		</FormProvider>
	);
});

C04DialogContainer.displayName = "C04DialogContainer";
