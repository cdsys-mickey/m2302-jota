import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import G08ListForm from "./G08ListForm";
import { useFormContext } from "react-hook-form";
import { useCallback } from "react";

export const G08ListFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		q,
		lvAdjDate,
		lvCust,
		lvCustName
		`
	)
	const form = useFormContext();

	const handleCustomerChange = useCallback((newCustomer) => {
		form.setValue("lvCustName", newCustomer?.AbbrName || "");
	}, [form]);


	return (
		<FormMetaProvider {...formMeta}>
			<G08ListForm onCustomerChange={handleCustomerChange}  {...rest} />
		</FormMetaProvider>
	)
}

G08ListFormContainer.displayName = "G08ListFormContainer";


