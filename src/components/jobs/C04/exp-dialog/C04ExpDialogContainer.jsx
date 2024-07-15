import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { C04Context } from "../../../../contexts/C04/C04Context";
import { DialogExContainer } from "../../../../shared-components/dialog/DialogExContainer";
import { forwardRef } from "react";
import C04ExpDialogForm from "./C04ExpDialogForm";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";

export const C04ExpDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {},
	});
	const c04 = useContext(C04Context);

	const handleSubmit = form.handleSubmit(
		c04.onExpSubmit,
		c04.onExpSubmitError
	);

	useChangeTracking(() => {
		if (open) {
			form.reset({
				expProd: c04.expProd,
				expDate: c04.expDate,
			});
		}
	}, [open, c04.expProd, c04.expDate]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title="有效日期檢查"
				responsive
				fullWidth
				maxWidth="xs"
				open={c04.expPrompting}
				onClose={c04.onExpDialogClose}
				onSubmit={handleSubmit}
				confirmText="執行"
				onCancel={c04.onExpDialogClose}>
				<C04ExpDialogForm onSubmit={handleSubmit} />
			</DialogExContainer>
		</FormProvider>
	);
});

C04ExpDialogContainer.displayName = "C04ExpDialogContainer";
