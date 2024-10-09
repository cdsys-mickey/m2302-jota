import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import E021ListForm from "./E021ListForm";

export const E021ListFormContainer = (props) => {
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
			<E021ListForm  {...rest} />
		</FormMetaProvider>
	)
}

E021ListFormContainer.displayName = "E021ListFormContainer";

