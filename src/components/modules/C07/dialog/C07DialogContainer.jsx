import { C07Context } from "@/contexts/C07/C07Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C07DialogForm from "./C07DialogForm";
import { C07DialogToolbarContainer } from "./toolbar/C07DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const C07DialogContainer = forwardRef((props, ref) => {
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

	const c07 = useContext(C07Context);

	const scrollable = useScrollable({
		height,
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

	const handleSubmit = form.handleSubmit(
		c07.onEditorSubmit,
		c07.onEditorSubmitError
	);

	useEffect(() => {
		if (c07.itemDataReady) {
			console.log("c07 form reset", c07.itemData);
			reset(c07.itemData);
		}
	}, [c07.itemData, c07.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
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
						minHeight: "30em",
						paddingTop: 0,
						// paddingLeft: 0,
						// paddingRight: 0,
					},
					scrollable.scroller,
				]}
				{...rest}>
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
					handleTaxTypeChanged={c07.handleTaxTypeChanged({
						setValue: form.setValue,
						getValues: form.getValues,
					})}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

C07DialogContainer.displayName = "C07DialogContainer";
