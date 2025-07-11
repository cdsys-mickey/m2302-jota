import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import G02SearchForm from "./G02SearchForm";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

const G02SearchFormContainer = (props) => {
	const { ...rest } = props;

	const formMeta = useFormMeta(
		`
		lvEDate,
		lvCustID,
		lvCustName,
		lvTel,
		lvID
		`);

	const form = useFormContext();

	const handleCustomerChange = useCallback((newCustomer) => {
		form.setValue("lvCustName", newCustomer?.AbbrName ?? "");
	}, [form]);


	return (
		<FormMetaProvider {...formMeta}>
			<G02SearchForm onCustomerChange={handleCustomerChange} {...rest} />
		</FormMetaProvider>
	);

}

G02SearchFormContainer.displayName = "G02SearchFormContainer";
export default G02SearchFormContainer;
