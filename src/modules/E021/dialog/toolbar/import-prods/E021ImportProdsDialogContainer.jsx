import { E021Context } from "@/modules/E021/E021Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-components";
import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import E021ImportProdsForm from "./E021ImportProdsForm";

const E021ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const e021 = useContext(E021Context);
	// const formMeta = useContext(FormMetaContext);
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		e021.onImportProdsSubmit({ form }),
		e021.onImportProdsSubmitError
	);

	return (
		<DialogExContainer
			ref={ref}
			responsive
			fullWidth
			maxWidth="sm"
			title="帶入商品"
			open={e021.importProdsDialogOpen}
			onClose={e021.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...e021.loadProdFormMeta}>
					<E021ImportProdsForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

E021ImportProdsDialogContainer.propTypes = {};

E021ImportProdsDialogContainer.displayName = "E021ImportProdsDialogContainer";
export default E021ImportProdsDialogContainer;



