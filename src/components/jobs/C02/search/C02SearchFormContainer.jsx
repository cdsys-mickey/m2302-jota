import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import C02SearchForm from "./C02SearchForm";
import C02ListToolbar from "../list/C02ListToolbar";


const C02SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvEmployee,
		lvDate,
		lvPdline,
		listMode
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<C02SearchForm  {...rest} />

		</FormMetaProvider>
	);

}

C02SearchFormContainer.displayName = "C02SearchFormContainer";
export default C02SearchFormContainer;