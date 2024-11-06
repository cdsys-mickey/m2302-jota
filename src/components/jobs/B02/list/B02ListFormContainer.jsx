import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import B02ListForm from "./B02ListForm";

export const B02ListFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		customer,
		customer2,
		prod,
		prod2,
		date,
		date2,
		orderBy
		`

	)
	return (
		<FormMetaProvider {...formMeta}>
			<B02ListForm  {...rest} />
		</FormMetaProvider>
	)
}

B02ListFormContainer.displayName = "B02ListFormContainer";
