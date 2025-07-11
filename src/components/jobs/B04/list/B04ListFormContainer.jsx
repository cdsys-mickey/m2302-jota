import { FormMetaProvider } from "@/shared-components";
import B04ListForm from "./B04ListForm";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { LastFieldBehavior } from "@/shared-components/form-meta/LastFieldBehavior";
import B04ListToolbar from "./B04ListToolbar";

export const B04ListFormContainer = (props) => {
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
			<B04ListForm  {...rest} />
		</FormMetaProvider>
	)
}

B04ListFormContainer.displayName = "B04ListFormContainer";

