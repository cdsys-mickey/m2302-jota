import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import C03SearchForm from "./C03SearchForm";
import C03ListToolbar from "../list/C03ListToolbar";


const C03SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvOrder,
		lvEmployee,
		lvOrdDate,
		lvArrDate,
		lvSupplier,
		lvSquared,
		lvReviewState,
		`);

	return (
		<FormMetaProvider {...formMeta}>
			<C03SearchForm  {...rest} />
			{/* 工具列 */}
			<C03ListToolbar />
		</FormMetaProvider>
	);

}

C03SearchFormContainer.displayName = "C03SearchFormContainer";
export default C03SearchFormContainer;