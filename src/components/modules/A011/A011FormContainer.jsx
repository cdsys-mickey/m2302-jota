import { FormProvider, useForm } from "react-hook-form";
import A011Form from "./A011Form";
import { useA011 } from "@/hooks/modules/useA011";
import CatLProvider from "@/contexts/A03/CatLProvider";
import CatMProvider from "@/contexts/A03/CatMProvider";
import CatSProvider from "@/contexts/A03/CatSProvider";

export const A011FormContainer = () => {
	const form = useForm();
	const a011 = useA011();

	return (
		<FormProvider {...form}>
			<A011Form
				handleSubmit={form.handleSubmit(
					a011.onSubmit,
					a011.onSubmitError
				)}
			/>
		</FormProvider>
	);
};

A011FormContainer.displayName = "A011FormContainer";
