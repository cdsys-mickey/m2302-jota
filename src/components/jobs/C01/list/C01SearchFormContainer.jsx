import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import C01ListToolbar from "./C01ListToolbar";
import C01SearchForm from "./C01SearchForm";

export const C01SearchFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		lvOrder,
		lvDate,
		lvPdline,
		lvEmployee,
		listMode
		`,
		// {
		// 	lastField: LastFieldBehavior.PROMPT,
		// 	lastFieldMessage: "篩選完成後請按「形成採購單」"
		// }
	)
	return (
		<FormMetaProvider {...formMeta}>
			<C01SearchForm  {...rest} />
			{/* 工具列 */}
			<C01ListToolbar />
		</FormMetaProvider>
	)
}

C01SearchFormContainer.displayName = "C01SearchFormContainer";