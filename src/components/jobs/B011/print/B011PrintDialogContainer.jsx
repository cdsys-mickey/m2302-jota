import { B011Context } from "@/contexts/B011/B011Context";
import { B031Context } from "@/contexts/B031/B031Context";
import DialogEx from "@/shared-components/dialog/DialogEx";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import B011PrintDialogForm from "./B011PrintDialogForm";
import { BContext } from "@/contexts/B/BContext";

const B011PrintDialogContainer = (props) => {
	const { forNew = false } = props;
	const b = useContext(BContext);
	const b011 = useContext(b.forNew ? B031Context : B011Context);
	const form = useForm({
		defaultValues: {},
	});
	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			b011.onPrintSubmit,
			b011.onPrintSubmitError
		)
	}, [b011.onPrintSubmit, b011.onPrintSubmitError, form]);

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
				open={b011.printDialogOpen}
				onClose={b011.cancelPrint}
				onCancel={b011.cancelPrint}
				onConfirm={handleSubmit}
				confirmText="執行"
			>
				<FormMetaProvider {...formMeta}>
					<B011PrintDialogForm onSubmit={handleSubmit} />
				</FormMetaProvider>
			</DialogEx>
		</FormProvider>
	);
}

B011PrintDialogContainer.propTypes = {
	forNew: PropTypes.bool
}

B011PrintDialogContainer.displayName = "B011PrintDialogContainer";
export default B011PrintDialogContainer;