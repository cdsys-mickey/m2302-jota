import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import B011ListForm from "./B011ListForm";
import { BContext } from "@/contexts/B/BContext";
import { useContext } from "react";

export const B011ListFormContainer = (props) => {
	const { ...rest } = props;
	const b = useContext(BContext);
	const formMeta = useFormMeta(
		`
		lvCust,
		lvEmployee,
		lvDate,
		`

	)
	return (
		<FormMetaProvider {...formMeta}>
			<B011ListForm  {...rest} forNew={b.forNew} />
		</FormMetaProvider>
	)
}

B011ListFormContainer.displayName = "B011ListFormContainer";