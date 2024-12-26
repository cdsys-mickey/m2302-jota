import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import C03SearchForm from "./C03SearchForm";


const C03SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvEmployee,
		lvOrdDate,
		lvArrDate,
		lvSupplier,
		listMode,
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<C03SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

C03SearchFormContainer.displayName = "C03SearchFormContainer";
export default C03SearchFormContainer;