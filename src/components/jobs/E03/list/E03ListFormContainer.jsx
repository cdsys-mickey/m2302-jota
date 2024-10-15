import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import E03ListForm from "./E03ListForm";

export const E03ListFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		q,
		lvRtnDate,
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
			<E03ListForm  {...rest} />
		</FormMetaProvider>
	)
}

E03ListFormContainer.displayName = "E03ListFormContainer";


