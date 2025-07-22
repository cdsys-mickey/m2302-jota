import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DialogEx } from "@/shared-components";
import { FormMetaProvider } from "@/shared-components";
import B05LoadProdsForm from "./import-prods/B05ImportProdsForm";
import { B05Context } from "@/modules/B05/B05Context";

const B05ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const b05 = useContext(B05Context);
	// const { importProdsDialogOpen } = b05;
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
		<DialogEx
			ref={ref}
			responsive
			fullWidth
			maxWidth="sm"
			title="帶入商品"
			open={b05.importProdsDialogOpen}
			onClose={b05.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...b05.loadProdFormMeta}>
					<B05LoadProdsForm handleSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogEx>
	);
});

B05ImportProdsDialogContainer.propTypes = {};

B05ImportProdsDialogContainer.displayName = "B05ImportProdsDialogContainer";
export default B05ImportProdsDialogContainer;
