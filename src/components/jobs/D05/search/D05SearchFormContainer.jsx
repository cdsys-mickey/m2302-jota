import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import D05SearchForm from "./D05SearchForm";


const D05SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvDate,
		lvEmployee,
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<D05SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

D05SearchFormContainer.displayName = "D05SearchFormContainer";
export default D05SearchFormContainer;