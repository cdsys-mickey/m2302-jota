import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import B012ListForm from "./B012ListForm";

export const B012ListFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		lvProd,
		lvEmployee,
		lvDate,
		`

	)
	return (
		<FormMetaProvider {...formMeta}>
			<B012ListForm  {...rest} />
		</FormMetaProvider>
	)
}

B012ListFormContainer.displayName = "B012ListFormContainer";
