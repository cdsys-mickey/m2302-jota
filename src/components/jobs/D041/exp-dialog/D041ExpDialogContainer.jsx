import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { D041Context } from "@/contexts/D041/D041Context";
import { DialogEx } from "@/shared-components";
import { forwardRef } from "react";
import D041ExpDialogForm from "./D041ExpDialogForm";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useMemo } from "react";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";

export const D041ExpDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {},
	});
	const d041 = useContext(D041Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			d041.onExpSubmit,
			d041.onExpSubmitError
		)
	}, [d041.onExpSubmit, d041.onExpSubmitError, form]);

	const formMeta = useFormMeta(
		`
		expProd,
		expDate
		`, {
		lastField: handleSubmit
	}
	)

	useChangeTracking(() => {
		if (open) {
			form.reset({
				expProd: d041.expProd,
				expDate: d041.expDate,
			});
		}
	}, [open, d041.expProd, d041.expDate]);

	return (
		<FormProvider {...form}>
			<DialogEx
				ref={ref}
				title="有效日期檢查"
				responsive
				fullWidth
				maxWidth="xs"
				open={d041.expPrompting}
				onClose={d041.onExpDialogClose}
				onSubmit={handleSubmit}
				confirmText="執行"
				onCancel={d041.onExpDialogClose}>
				<FormMetaProvider {...formMeta}>
					<D041ExpDialogForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</DialogEx>
		</FormProvider>
	);
});

D041ExpDialogContainer.displayName = "D041ExpDialogContainer";


