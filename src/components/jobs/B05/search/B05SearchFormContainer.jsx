import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import B05SearchForm from "./B05SearchForm";

const B05SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		q,
		lvSupplier,
		lvDate,
		lvEmployee
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<B05SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

B05SearchFormContainer.displayName = "B05SearchFormContainer";
export default B05SearchFormContainer;