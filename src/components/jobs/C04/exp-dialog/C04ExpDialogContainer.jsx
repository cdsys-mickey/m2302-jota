import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { C04Context } from "../../../../contexts/C04/C04Context";
import { DialogExContainer } from "../../../../shared-components/dialog/DialogExContainer";
import { forwardRef } from "react";
import C04ExpDialogForm from "./C04ExpDialogForm";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { useCallback } from "react";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

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

	const handleLastField = useCallback(() => {
		handleSubmit();
	}, [handleSubmit]);

	const formMeta = useFormMeta(
		`
		expProd,
		expDate
		`,
		{
			lastField: handleLastField
		}
	)

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
				<FormMetaProvider {...formMeta}>
					<C04ExpDialogForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</DialogExContainer>
		</FormProvider>
	);
});

C04ExpDialogContainer.displayName = "C04ExpDialogContainer";
