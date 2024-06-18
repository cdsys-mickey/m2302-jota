import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { B05Context } from "../../../../../contexts/B05/B05Context";
import { DialogExContainer } from "../../../../../shared-components/dialog/DialogExContainer";
import { OptionPickerProvider } from "../../../../../shared-components/option-picker/OptionPickerProvider";
import B05LoadProdsForm from "./import-prods/B05ImportProdsForm";

const B05ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const b05 = useContext(B05Context);
	const { importProdsDialogOpen } = b05;
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		b05.onImportProdsSubmit,
		b05.onImportProdsSubmitError
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
			open={b05.importProdsDialogOpen}
			onClose={b05.cancelImportProds}
			{...rest}>
			<FormProvider {...form}>
				<OptionPickerProvider>
					<B05LoadProdsForm handleSubmit={handleSubmit} />
				</OptionPickerProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

B05ImportProdsDialogContainer.propTypes = {};

B05ImportProdsDialogContainer.displayName = "B05ImportProdsDialogContainer";
export default B05ImportProdsDialogContainer;
