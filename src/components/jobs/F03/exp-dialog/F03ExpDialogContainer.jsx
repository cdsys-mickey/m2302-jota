import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { F03Context } from "@/contexts/F03/F03Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { forwardRef } from "react";
import F03ExpDialogForm from "./F03ExpDialogForm";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const F03ExpDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {},
	});
	const f03 = useContext(F03Context);

	const handleSubmit = form.handleSubmit(
		f03.onExpSubmit,
		f03.onExpSubmitError
	);

	useChangeTracking(() => {
		if (open) {
			form.reset({
				expProd: f03.expProd,
				expDate: f03.expDate,
			});
		}
	}, [open, f03.expProd, f03.expDate]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title="有效日期檢查"
				responsive
				fullWidth
				maxWidth="xs"
				open={f03.expPrompting}
				onClose={f03.onExpDialogClose}
				onSubmit={handleSubmit}
				confirmText="執行"
				onCancel={f03.onExpDialogClose}>
				<F03ExpDialogForm onSubmit={handleSubmit} />
			</DialogExContainer>
		</FormProvider>
	);
});

F03ExpDialogContainer.displayName = "F03ExpDialogContainer";




