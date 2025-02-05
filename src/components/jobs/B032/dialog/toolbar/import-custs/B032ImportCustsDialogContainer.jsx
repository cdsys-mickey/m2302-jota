import { B032Context } from "@/contexts/B032/B032Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import B032ImportCustsForm from "./B032ImportCustsForm";
import { B012Context } from "@/contexts/B012/B012Context";
import { BContext } from "@/contexts/B/BContext";

const B032ImportCustsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const b = useContext(BContext);
	const b032 = useContext(b.forNew ? B032Context : B012Context);
	// const formMeta = useContext(FormMetaContext);
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		b032.onImportCustsSubmit({ form }),
		b032.onImportCustsSubmitError
	);

	return (
		<DialogExContainer
			ref={ref}
			responsive
			fullWidth
			maxWidth="sm"
			title="帶入新客戶"
			open={b032.importCustsDialogOpen}
			onClose={b032.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...b032.importCustsFormMeta}>
					<B032ImportCustsForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

B032ImportCustsDialogContainer.propTypes = {};

B032ImportCustsDialogContainer.displayName = "B032ImportProdsDialogContainer";
export default B032ImportCustsDialogContainer;



