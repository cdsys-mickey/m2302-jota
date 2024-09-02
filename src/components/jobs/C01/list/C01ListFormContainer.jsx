import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import C01ListForm from "./C01ListForm";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { LastFieldBehavior } from "@/shared-contexts/form-meta/LastFieldBehavior";

export const C01ListFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		listMode,
		reqOrder,
		date,
		pdline,
		employee
		`,
		{
			lastField: LastFieldBehavior.PROMPT,
			lastFieldMessage: "篩選完成後請按「形成採購單」"
		}
	)
	return <FormMetaProvider {...formMeta}>
		<C01ListForm  {...rest} />
	</FormMetaProvider>
}

C01ListFormContainer.displayName = "C01ListFormContainer";