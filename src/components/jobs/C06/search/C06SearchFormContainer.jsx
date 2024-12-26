import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import C06SearchForm from "./C06SearchForm";


const C06SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvOrdDate,
		lvArrDate,
		lvSquared,
		lvDept,
		lvEmployee
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<C06SearchForm  {...rest} />
		</FormMetaProvider>
	);

}

C06SearchFormContainer.displayName = "C06SearchFormContainer";
export default C06SearchFormContainer;