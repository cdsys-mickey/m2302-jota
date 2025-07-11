import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import C05SearchForm from "./C05SearchForm";

export const C05SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvSupplier,
		rd,
		rd2,
		lvEmployee,
		`
	);

	return (
		<FormMetaProvider {...formMeta}>
			<C05SearchForm {...rest} />
		</FormMetaProvider>
	);
};

C05SearchFormContainer.displayName = "C05SearchFormContainer";
