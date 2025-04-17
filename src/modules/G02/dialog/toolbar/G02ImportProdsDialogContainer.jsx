import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import G02LoadProdsForm from "./import-prods/G02ImportProdsForm";
import { G02Context } from "@/modules/G02/G02Context";

const G02ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const g02 = useContext(G02Context);
	// const { importProdsDialogOpen } = g02;
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		g02.onImportProdsSubmit,
		g02.onImportProdsSubmitError
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
			open={g02.importProdsDialogOpen}
			onClose={g02.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...g02.loadProdFormMeta}>
					<G02LoadProdsForm handleSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

G02ImportProdsDialogContainer.propTypes = {};

G02ImportProdsDialogContainer.displayName = "G02ImportProdsDialogContainer";
export default G02ImportProdsDialogContainer;

