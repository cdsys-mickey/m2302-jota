import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
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