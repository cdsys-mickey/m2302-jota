import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { D01Context } from "@/contexts/D01/D01Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { forwardRef } from "react";
import D01ExpDialogForm from "./D01ExpDialogForm";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";

export const D01ExpDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {},
	});
	const d01 = useContext(D01Context);

	const handleSubmit = form.handleSubmit(
		d01.onExpSubmit,
		d01.onExpSubmitError
	);

	const formMeta = useFormMeta(
		`
		expProd,
		expDate
		`,
		{
			lastField: handleSubmit
		}
	)

	useChangeTracking(() => {
		if (open) {
			form.reset({
				expProd: d01.expProd,
				expDate: d01.expDate,
			});
		}
	}, [open, d01.expProd, d01.expDate]);

	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title="有效日期檢查"
				responsive
				fullWidth
				maxWidth="xs"
				open={d01.expPrompting}
				onClose={d01.onExpDialogClose}
				onSubmit={handleSubmit}
				confirmText="執行"
				onCancel={d01.onExpDialogClose}>
				<FormMetaProvider {...formMeta}>
					<D01ExpDialogForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</DialogExContainer>
		</FormProvider>
	);
});

D01ExpDialogContainer.displayName = "D01ExpDialogContainer";
