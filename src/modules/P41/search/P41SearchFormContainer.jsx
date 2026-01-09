import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import P41SearchForm from "./P41SearchForm";
import P41Toolbar from "../P41Toolbar";


const P41SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		qs,
		lvArrDate,
		lvArrDateDir,
		lvOrdDate,
		lvFilterMode,
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<P41SearchForm  {...rest} />
			<P41Toolbar />
		</FormMetaProvider>
	);

}

P41SearchFormContainer.displayName = "P41SearchFormContainer";
export default P41SearchFormContainer;