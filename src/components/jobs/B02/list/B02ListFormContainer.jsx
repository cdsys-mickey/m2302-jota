import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import B02ListForm from "./B02ListForm";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { LastFieldBehavior } from "@/shared-contexts/form-meta/LastFieldBehavior";
import B02ListToolbar from "./B02ListToolbar";

export const B02ListFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		customer,
		customer2,
		prod,
		prod2,
		date,
		date2
		`

	)
	return (
		<FormMetaProvider {...formMeta}>
			<B02ListForm  {...rest} />
		</FormMetaProvider>
	)
}

B02ListFormContainer.displayName = "B02ListFormContainer";
