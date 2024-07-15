import { C05Context } from "@/contexts/C05/C05Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import C05DialogForm from "./C05DialogForm";
import { C05DialogToolbarContainer } from "./toolbar/C05DialogToolbarContainer";
import Colors from "@/modules/md-colors";

export const C05DialogContainer = forwardRef((props, ref) => {
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

	const c05 = useContext(C05Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const memoisedTitle = useMemo(() => {
		if (c05.creating) {
			return "建立退貨單";
		} else if (c05.updating) {
			return "修改退貨單";
		} else {
			return "退貨單內容";
		}
	}, [c05.creating, c05.updating]);

	const handleClose = useMemo(() => {
		return c05.creating
			? c05.confirmQuitCreating
			: c05.updating
			? c05.confirmQuitUpdating
			: c05.reading
			? c05.cancelAction
			: null;
	}, [
		c05.cancelAction,
		c05.confirmQuitCreating,
		c05.confirmQuitUpdating,
		c05.creating,
		c05.reading,
		c05.updating,
	]);

	const handleSubmit = form.handleSubmit(
		c05.onEditorSubmit,
		c05.onEditorSubmitError
	);

	useEffect(() => {
		if (c05.itemDataReady) {
			console.log("c05 form reset", c05.itemData);
			reset(c05.itemData);
		}
	}, [c05.itemData, c05.itemDataReady, reset]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				// fullScreen
				responsive
				fullWidth
				maxWidth="lg"
				TitleButtonsComponent={C05DialogToolbarContainer}
				open={c05.itemViewOpen}
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
				<C05DialogForm
					onSubmit={handleSubmit}
					creating={c05.creating}
					editing={c05.editing}
					updating={c05.updating}
					readWorking={c05.readWorking}
					readError={c05.readError}
					data={c05.itemData}
					itemDataReady={c05.itemDataReady}
					handleSupplierChanged={c05.handleSupplierChanged({
						setValue: form.setValue,
						getValues: form.getValues,
					})}
					handleRtnDateChanged={c05.handleRtnDateChanged({
						setValue: form.setValue,
						getValues: form.getValues,
					})}
					supplier={supplier}
					isSupplierNameDisabled={c05.isSupplierNameDisabled}
					purchaseOrdersDisabled={c05.purchaseOrdersDisabled}
					handleTaxTypeChanged={c05.handleTaxTypeChanged({
						setValue: form.setValue,
						getValues: form.getValues,
					})}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

C05DialogContainer.displayName = "C05DialogContainer";
