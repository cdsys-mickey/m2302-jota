import { B031Context } from "@/contexts/B031/B031Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import B031ImportProdsForm from "./B031ImportProdsForm";

const B031ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const b031 = useContext(B031Context);
	// const formMeta = useContext(FormMetaContext);
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		b031.onImportProdsSubmit({ form }),
		b031.onImportProdsSubmitError
	);

	return (
		<DialogExContainer
			ref={ref}
			responsive
			fullWidth
			maxWidth="sm"
			title="帶入商品"
			open={b031.importProdsDialogOpen}
			onClose={b031.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...b031.loadProdFormMeta}>
					<B031ImportProdsForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

B031ImportProdsDialogContainer.propTypes = {};

B031ImportProdsDialogContainer.displayName = "B031ImportProdsDialogContainer";
export default B031ImportProdsDialogContainer;


