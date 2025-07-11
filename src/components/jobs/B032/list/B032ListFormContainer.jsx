import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import B032ListForm from "./B032ListForm";

export const B032ListFormContainer = (props) => {
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
			<B032ListForm  {...rest} />
		</FormMetaProvider>
	)
}

B032ListFormContainer.displayName = "B032ListFormContainer";

