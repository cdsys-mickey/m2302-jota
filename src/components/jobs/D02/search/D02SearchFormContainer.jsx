import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import D02SearchForm from "./D02SearchForm";


const D02SearchFormContainer = (props) => {
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
			<D02SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

D02SearchFormContainer.displayName = "D02SearchFormContainer";
export default D02SearchFormContainer;