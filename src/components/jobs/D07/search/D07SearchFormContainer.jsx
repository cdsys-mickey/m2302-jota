import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import D07SearchForm from "./D07SearchForm";


const D07SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		q,
		lvEmployee,
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<D07SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

D07SearchFormContainer.displayName = "D07SearchFormContainer";
export default D07SearchFormContainer;