import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { P14Context } from "@/modules/P14/P14Context";
import { DialogEx } from "@/shared-components";
import { FormMetaProvider } from "@/shared-components";
import P14LoadProdsForm from "./import-prods/P14ImportProdsForm";

const P14ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const p14 = useContext(P14Context);
	const { importProdsDialogOpen } = p14;
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		p14.onImportProdsSubmit,
		p14.onImportProdsSubmitError
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
			open={p14.importProdsDialogOpen}
			onClose={p14.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...p14.loadProdFormMeta}>
					<P14LoadProdsForm handleSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogEx>
	);
});

P14ImportProdsDialogContainer.propTypes = {};

P14ImportProdsDialogContainer.displayName = "P14ImportProdsDialogContainer";
export default P14ImportProdsDialogContainer;


