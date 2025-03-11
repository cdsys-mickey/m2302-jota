import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import E021SearchForm from "./E021SearchForm";

export const E021SearchFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		q,
		lvSalesDate,
		lvArrDate,
		lvEmployee,
		lvSalesType,
		lvRetail,
		lvCust,
		lvCustName,
		lvCompTel,
		`
	)
	return (
		<FormMetaProvider {...formMeta}>
			<E021SearchForm  {...rest} />
		</FormMetaProvider>
	)
}

E021SearchFormContainer.displayName = "E021SearchFormContainer";

