import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { D07Context } from "@/contexts/D07/D07Context";
import { DialogEx } from "@/shared-components";
import { forwardRef } from "react";
import D07ExpDialogForm from "./D07ExpDialogForm";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const D07ExpDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {},
	});
	const d07 = useContext(D07Context);

	const handleSubmit = form.handleSubmit(
		d07.onExpSubmit,
		d07.onExpSubmitError
	);

	useChangeTracking(() => {
		if (open) {
			form.reset({
				expProd: d07.expProd,
				expDate: d07.expDate,
			});
		}
	}, [open, d07.expProd, d07.expDate]);

	return (
		<FormProvider {...form}>
			<DialogEx
				ref={ref}
				title="有效日期檢查"
				responsive
				fullWidth
				maxWidth="xs"
				open={d07.expPrompting}
				onClose={d07.onExpDialogClose}
				onSubmit={handleSubmit}
				confirmText="執行"
				onCancel={d07.onExpDialogClose}>
				<D07ExpDialogForm onSubmit={handleSubmit} />
			</DialogEx>
		</FormProvider>
	);
});

D07ExpDialogContainer.displayName = "D07ExpDialogContainer";



