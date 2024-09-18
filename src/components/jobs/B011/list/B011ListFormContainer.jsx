import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import B011ListForm from "./B011ListForm";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { LastFieldBehavior } from "@/shared-contexts/form-meta/LastFieldBehavior";
import B011ListToolbar from "./B011ListToolbar";

export const B011ListFormContainer = (props) => {
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
			<B011ListForm  {...rest} />
		</FormMetaProvider>
	)
}

B011ListFormContainer.displayName = "B011ListFormContainer";