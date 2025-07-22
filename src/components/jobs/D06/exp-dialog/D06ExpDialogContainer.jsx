import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { D06Context } from "@/contexts/D06/D06Context";
import { DialogEx } from "@/shared-components";
import { forwardRef } from "react";
import D06ExpDialogForm from "./D06ExpDialogForm";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const D06ExpDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {},
	});
	const d06 = useContext(D06Context);

	const handleSubmit = form.handleSubmit(
		d06.onExpSubmit,
		d06.onExpSubmitError
	);

	useChangeTracking(() => {
		if (open) {
			form.reset({
				expProd: d06.expProd,
				expDate: d06.expDate,
			});
		}
	}, [open, d06.expProd, d06.expDate]);

	return (
		<FormProvider {...form}>
			<DialogEx
				ref={ref}
				title="有效日期檢查"
				responsive
				fullWidth
				maxWidth="xs"
				open={d06.expPrompting}
				onClose={d06.onExpDialogClose}
				onSubmit={handleSubmit}
				confirmText="執行"
				onCancel={d06.onExpDialogClose}>
				<D06ExpDialogForm onSubmit={handleSubmit} />
			</DialogEx>
		</FormProvider>
	);
});

D06ExpDialogContainer.displayName = "D06ExpDialogContainer";


