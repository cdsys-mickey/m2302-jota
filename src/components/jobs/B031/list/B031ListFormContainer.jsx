import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import B031ListForm from "./B031ListForm";

export const B031ListFormContainer = (props) => {
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
			<B031ListForm  {...rest} />
		</FormMetaProvider>
	)
}

B031ListFormContainer.displayName = "B031ListFormContainer";
