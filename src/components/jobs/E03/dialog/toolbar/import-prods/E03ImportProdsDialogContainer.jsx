import { E03Context } from "@/contexts/E03/E03Context";
import { DialogEx } from "@/shared-components";
import { FormMetaProvider } from "@/shared-components";
import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import E03ImportProdsForm from "./E03ImportProdsForm";

const E03ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const e03 = useContext(E03Context);
	// const formMeta = useContext(FormMetaContext);
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		e03.onImportProdsSubmit({ form }),
		e03.onImportProdsSubmitError
	);

	return (
		<DialogEx
			ref={ref}
			responsive
			fullWidth
			maxWidth="sm"
			title="帶入商品"
			open={e03.importProdsDialogOpen}
			onClose={e03.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...e03.loadProdFormMeta}>
					<E03ImportProdsForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogEx>
	);
});

E03ImportProdsDialogContainer.propTypes = {};

E03ImportProdsDialogContainer.displayName = "E03ImportProdsDialogContainer";
export default E03ImportProdsDialogContainer;




