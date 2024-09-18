import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { B02Context } from "../../../../../contexts/B02/B02Context";
import { DialogExContainer } from "../../../../../shared-components/dialog/DialogExContainer";
import { OptionPickerProvider } from "../../../../../shared-components/option-picker/OptionPickerProvider";
import B02LoadProdsForm from "./import-prods/B02ImportProdsForm";
import { FormMetaProvider } from "../../../../../shared-contexts/form-meta/FormMetaProvider";

const B02ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const b02 = useContext(B02Context);
	const { importProdsDialogOpen } = b02;
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		b02.onImportProdsSubmit,
		b02.onImportProdsSubmitError
	);

	// useChangeTracking(() => {
	// 	if (!importProdsDialogOpen) {
	// 		form.reset({});
	// 	}
	// }, [importProdsDialogOpen]);

	return (
		<DialogExContainer
			ref={ref}
			responsive
			fullWidth
			maxWidth="sm"
			title="帶入商品"
			open={b02.importProdsDialogOpen}
			onClose={b02.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...b02.loadProdFormMeta}>
					<B02LoadProdsForm handleSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

B02ImportProdsDialogContainer.propTypes = {};

B02ImportProdsDialogContainer.displayName = "B02ImportProdsDialogContainer";
export default B02ImportProdsDialogContainer;


