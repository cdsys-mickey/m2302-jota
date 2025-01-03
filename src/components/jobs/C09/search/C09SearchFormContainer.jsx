import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import C09SearchForm from "./C09SearchForm";


const C09SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvTxiDate,
		lvEmployee,
		lvDept,
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<C09SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

C09SearchFormContainer.displayName = "C09SearchFormContainer";
export default C09SearchFormContainer;