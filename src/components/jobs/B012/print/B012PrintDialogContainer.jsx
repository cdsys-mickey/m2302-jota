import { B012Context } from "@/contexts/B012/B012Context";
import DialogEx from "@/shared-components/dialog/DialogEx";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import B012PrintDialogForm from "./B012PrintDialogForm";
import { BContext } from "@/contexts/B/BContext";
import { B032Context } from "@/contexts/B032/B032Context";

const B012PrintDialogContainer = () => {
	const b = useContext(BContext);
	const b012 = useContext(b.forNew ? B032Context : B012Context);
	const form = useForm({
		defaultValues: {},
	});
	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			b012.onPrintSubmit,
			b012.onPrintSubmitError
		)
	}, [b012.onPrintSubmit, b012.onPrintSubmitError, form]);

	const formMeta = useFormMeta(
		`prtEmployee,
		prtDate,
		outputType
		`,
		{
			lastField: handleSubmit
		}
	)

	return (
		<FormProvider {...form}>
			<DialogEx
				responsive
				maxWidth="xs"
				title="列印"
				open={b012.printDialogOpen}
				onClose={b012.cancelPrint}
				onCancel={b012.cancelPrint}
				onConfirm={handleSubmit}
				confirmText="執行"
			>
				<FormMetaProvider {...formMeta}>
					<B012PrintDialogForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</DialogEx>
		</FormProvider>
	);
}

B012PrintDialogContainer.propTypes = {

}

B012PrintDialogContainer.displayName = "B012PrintDialogContainer";
export default B012PrintDialogContainer;