import { E01Context } from "@/contexts/E01/E01Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-components";
import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import E01ImportProdsForm from "./E01ImportProdsForm";

const E01ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const e01 = useContext(E01Context);
	// const formMeta = useContext(FormMetaContext);
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		e01.onImportProdsSubmit({ form }),
		e01.onImportProdsSubmitError
	);

	return (
		<DialogExContainer
			ref={ref}
			responsive
			fullWidth
			maxWidth="sm"
			title="帶入商品"
			open={e01.importProdsDialogOpen}
			onClose={e01.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...e01.loadProdFormMeta}>
					<E01ImportProdsForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

E01ImportProdsDialogContainer.propTypes = {};

E01ImportProdsDialogContainer.displayName = "E01ImportProdsDialogContainer";
export default E01ImportProdsDialogContainer;


