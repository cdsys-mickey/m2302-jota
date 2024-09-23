import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import B012ListForm from "./B012ListForm";

export const B012ListFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		lvProd,
		lvProd2,
		lvCust,
		lvCust2,
		lvDate,
		lvDate2
		`

	)
	return (
		<FormMetaProvider {...formMeta}>
			<B012ListForm  {...rest} />
		</FormMetaProvider>
	)
}

B012ListFormContainer.displayName = "B012ListFormContainer";
