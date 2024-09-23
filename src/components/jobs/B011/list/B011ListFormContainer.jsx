import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import B011ListForm from "./B011ListForm";

export const B011ListFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		lvCust,
		lvCust2,
		lvProd,
		lvProd2,
		lvDate,
		lvDate2
		`

	)
	return (
		<FormMetaProvider {...formMeta}>
			<B011ListForm  {...rest} />
		</FormMetaProvider>
	)
}

B011ListFormContainer.displayName = "B011ListFormContainer";