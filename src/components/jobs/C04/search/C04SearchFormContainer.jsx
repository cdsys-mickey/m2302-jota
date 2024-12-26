import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import C04SearchForm from "./C04SearchForm";


const C04SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvRstDate,
		lvEmployee,
		lvSupplier,
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<C04SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

C04SearchFormContainer.displayName = "C04SearchFormContainer";
export default C04SearchFormContainer;