import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import D01SearchForm from "./D01SearchForm";


const D01SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvEmployee,
		lvDate,
		lvPdline,
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<D01SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

D01SearchFormContainer.displayName = "D01SearchFormContainer";
export default D01SearchFormContainer;