import { B012Context } from "@/contexts/B012/B012Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import B012ImportCustsForm from "./B012ImportCustsForm";
import { BContext } from "@/contexts/B/BContext";
import { B032Context } from "@/contexts/B032/B032Context";

const B012ImportCustsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const b = useContext(BContext);
	const b012 = useContext(b.forNew ? B032Context : B012Context);
	// const formMeta = useContext(FormMetaContext);
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		b012.onImportCustsSubmit({ form }),
		b012.onImportCustsSubmitError
	);

	return (
		<DialogExContainer
			ref={ref}
			responsive
			fullWidth
			maxWidth="sm"
			title="帶入商品"
			open={b012.importCustsDialogOpen}
			onClose={b012.cancelImportCusts}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...b012.importCustsFormMeta}>
					<B012ImportCustsForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

B012ImportCustsDialogContainer.propTypes = {};

B012ImportCustsDialogContainer.displayName = "B012ImportProdsDialogContainer";
export default B012ImportCustsDialogContainer;


