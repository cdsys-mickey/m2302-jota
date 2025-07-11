import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import C08SearchForm from "./C08SearchForm";


const C08SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvTxoDate,
		lvEmployee,
		lvDeliveryEmployee,
		lvDept,
		lvTransType
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<C08SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

C08SearchFormContainer.displayName = "C08SearchFormContainer";
export default C08SearchFormContainer;