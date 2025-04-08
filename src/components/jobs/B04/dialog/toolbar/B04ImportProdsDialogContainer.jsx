import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { B04Context } from "@/contexts/B04/B04Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import B04LoadProdsForm from "./import-prods/B04ImportProdsForm";

const B04ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const b04 = useContext(B04Context);
	const { importProdsDialogOpen } = b04;
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		b04.onImportProdsSubmit,
		b04.onImportProdsSubmitError
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
			open={b04.importProdsDialogOpen}
			onClose={b04.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...b04.loadProdFormMeta}>
					<B04LoadProdsForm handleSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

B04ImportProdsDialogContainer.propTypes = {};

B04ImportProdsDialogContainer.displayName = "B04ImportProdsDialogContainer";
export default B04ImportProdsDialogContainer;



