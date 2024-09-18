import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { B011Context } from "../../../../../contexts/B011/B011Context";
import { DialogExContainer } from "../../../../../shared-components/dialog/DialogExContainer";
import { OptionPickerProvider } from "../../../../../shared-components/option-picker/OptionPickerProvider";
import B011LoadProdsForm from "./import-prods/B011ImportProdsForm";
import { FormMetaProvider } from "../../../../../shared-contexts/form-meta/FormMetaProvider";

const B011ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const b011 = useContext(B011Context);
	const { importProdsDialogOpen } = b011;
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		b011.onImportProdsSubmit,
		b011.onImportProdsSubmitError
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
			open={b011.importProdsDialogOpen}
			onClose={b011.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...b011.loadProdFormMeta}>
					<B011LoadProdsForm handleSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

B011ImportProdsDialogContainer.propTypes = {};

B011ImportProdsDialogContainer.displayName = "B011ImportProdsDialogContainer";
export default B011ImportProdsDialogContainer;

