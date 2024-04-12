import { forwardRef } from "react";
import DialogEx from "../../../../../shared-components/dialog/DialogEx";
import { DialogExContainer } from "../../../../../shared-components/dialog/DialogExContainer";
import { useContext } from "react";
import { B05Context } from "../../../../../contexts/B05/B05Context";
import B05LoadProdsForm from "./load-prods/B05LoadProdsForm";
import { FormProvider, useForm } from "react-hook-form";
import { OptionPickerProvider } from "../../../../../shared-components/picker/listbox/OptionPickerProvider";

const B05LoadProdsDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const b05 = useContext(B05Context);
	const form = useForm({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		b05.onLoadProdsSubmit,
		b05.onLoadProdsSubmitError
	);

	return (
		<DialogExContainer
			ref={ref}
			responsive
			fullWidth
			maxWidth="sm"
			title="載入商品"
			open={b05.importProdsDialogOpen}
			onClose={b05.cancelImportProds}
			{...rest}>
			<FormProvider {...form}>
				<OptionPickerProvider>
					<B05LoadProdsForm handleSubmit={handleSubmit} />
				</OptionPickerProvider>
			</FormProvider>
		</DialogExContainer>
	);
});

B05LoadProdsDialogContainer.propTypes = {};

B05LoadProdsDialogContainer.displayName = "B05LoadProdsDialogContainer";
export default B05LoadProdsDialogContainer;
