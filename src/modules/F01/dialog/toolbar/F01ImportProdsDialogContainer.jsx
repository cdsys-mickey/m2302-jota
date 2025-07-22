import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { F01Context } from "@/modules/F01/F01Context";
import { DialogEx } from "@/shared-components";
import { FormMetaProvider } from "@/shared-components";
import F01LoadProdsForm from "./import-prods/F01ImportProdsForm";

const F01ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const f01 = useContext(F01Context);
	const { importProdsDialogOpen } = f01;
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		f01.onImportProdsSubmit,
		f01.onImportProdsSubmitError
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
			open={f01.importProdsDialogOpen}
			onClose={f01.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...f01.loadProdFormMeta}>
					<F01LoadProdsForm handleSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogEx>
	);
});

F01ImportProdsDialogContainer.propTypes = {};

F01ImportProdsDialogContainer.displayName = "F01ImportProdsDialogContainer";
export default F01ImportProdsDialogContainer;

