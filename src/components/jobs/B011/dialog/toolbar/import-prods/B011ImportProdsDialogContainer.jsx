import { B011Context } from "@/contexts/B011/B011Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { forwardRef, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import B011ImportProdsForm from "./B011ImportProdsForm";
import PropTypes from "prop-types";
import { B031Context } from "@/contexts/B031/B031Context";
import { BContext } from "@/contexts/B/BContext";

const B011ImportProdsDialogContainer = forwardRef((props, ref) => {
	const { forNew = false, ...rest } = props;
	const b = useContext(BContext);
	const b011 = useContext(b.forNew ? B031Context : B011Context);
	// const formMeta = useContext(FormMetaContext);
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		b011.onImportProdsSubmit({ form }),
		b011.onImportProdsSubmitError
	);

	return (
		<DialogExContainer
			ref={ref}
			responsive
			fullWidth
			maxWidth="sm"
			title="帶入商品"
			open={b011.importProdsDialogOpen}
			onClose={b011.cancelImportProds}
			hideCloseButton={false}
			confirmTooltip="shift+Enter"
			{...rest}>
			<FormProvider {...form}>
				<FormMetaProvider {...b011.loadProdFormMeta}>
					<B011ImportProdsForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

B011ImportProdsDialogContainer.propTypes = {
	forNew: PropTypes.bool
};

B011ImportProdsDialogContainer.displayName = "B011ImportProdsDialogContainer";
export default B011ImportProdsDialogContainer;

