import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { D02Context } from "@/contexts/D02/D02Context";
import { DialogEx } from "@/shared-components";
import { forwardRef } from "react";
import D02ExpDialogForm from "./D02ExpDialogForm";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const D02ExpDialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {},
	});
	const d02 = useContext(D02Context);

	const handleSubmit = form.handleSubmit(
		d02.onExpSubmit,
		d02.onExpSubmitError
	);

	useChangeTracking(() => {
		if (open) {
			form.reset({
				expProd: d02.expProd,
				expDate: d02.expDate,
			});
		}
	}, [open, d02.expProd, d02.expDate]);

	return (
		<FormProvider {...form}>
			<DialogEx
				ref={ref}
				title="有效日期檢查"
				responsive
				fullWidth
				maxWidth="xs"
				open={d02.expPrompting}
				onClose={d02.onExpDialogClose}
				onSubmit={handleSubmit}
				confirmText="執行"
				onCancel={d02.onExpDialogClose}>
				<D02ExpDialogForm onSubmit={handleSubmit} />
			</DialogEx>
		</FormProvider>
	);
});

D02ExpDialogContainer.displayName = "D02ExpDialogContainer";

