import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import C05SearchForm from "./C05SearchForm";

export const C05SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		supplier,
		rd,
		rd2,
		employee,
		`
	);

	return (
		<FormMetaProvider {...formMeta}>
			<C05SearchForm {...rest} />
		</FormMetaProvider>
	);
};

C05SearchFormContainer.displayName = "C05SearchFormContainer";
