import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import G06ListForm from "./G06ListForm";
import { useFormContext } from "react-hook-form";
import { useCallback } from "react";

export const G06ListFormContainer = (props) => {
	const { ...rest } = props;
	const formMeta = useFormMeta(
		`
		lvSession,
		lvCust,
		`
	)
	const form = useFormContext();

	// const handleCustomerChange = useCallback((newCustomer) => {
	// 	form.setValue("lvCustName", newCustomer?.AbbrName || "");
	// }, [form]);

	// const handleSessionChange = useCallback(() => {
	// 	form.setValue("lvCust", null);
	// }, [form]);


	return (
		<FormMetaProvider {...formMeta}>
			<G06ListForm
				// onCustomerChange={handleCustomerChange}  
				// onSessionChange={handleSessionChange}
				{...rest} />
		</FormMetaProvider>
	)
}

G06ListFormContainer.displayName = "G06ListFormContainer";


