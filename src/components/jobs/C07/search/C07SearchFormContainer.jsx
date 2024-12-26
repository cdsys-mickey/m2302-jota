import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import C07SearchForm from "./C07SearchForm";


const C07SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvOrdDate,
		lvArrDate,
		lvDept,
		lvEmployee,
		lvSquared,
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<C07SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

C07SearchFormContainer.displayName = "C07SearchFormContainer";
export default C07SearchFormContainer;