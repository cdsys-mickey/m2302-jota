import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import E01ListForm from "./E01ListForm";

export const E01ListFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		q,
		lvOrdDate,
		lvArrDate,
		lvSquared,
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
			<E01ListForm  {...rest} />
		</FormMetaProvider>
	)
}

E01ListFormContainer.displayName = "E01ListFormContainer";
