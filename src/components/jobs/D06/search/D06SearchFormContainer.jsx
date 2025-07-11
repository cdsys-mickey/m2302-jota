import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import D06SearchForm from "./D06SearchForm";


const D06SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvEmployee,
		lvDate,
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<D06SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

D06SearchFormContainer.displayName = "D06SearchFormContainer";
export default D06SearchFormContainer;