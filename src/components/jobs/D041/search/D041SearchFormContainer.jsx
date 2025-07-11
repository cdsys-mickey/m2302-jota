import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import D041SearchForm from "./D041SearchForm";


const D041SearchFormContainer = (props) => {
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
			<D041SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

D041SearchFormContainer.displayName = "D041SearchFormContainer";
export default D041SearchFormContainer;