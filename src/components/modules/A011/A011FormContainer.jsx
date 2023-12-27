import { FormProvider, useForm } from "react-hook-form";
import A011Form from "./A011Form";
import { useA011 } from "@/hooks/modules/useA011";
import CatLProvider from "@/contexts/A03/CatLProvider";
import CatMProvider from "@/contexts/A03/CatMProvider";
import CatSProvider from "@/contexts/A03/CatSProvider";
import { useContext } from "react";
import { A011Context } from "../../../contexts/A011/A011Context";

export const A011FormContainer = () => {
	const form = useForm();
	const a011 = useContext(A011Context);

	return (
		<FormProvider {...form}>
			<CatSProvider>
				<CatMProvider>
					<CatLProvider>
						<A011Form
							handleSubmit={form.handleSubmit(
								a011.onSubmit,
								a011.onSubmitError
							)}
						/>
					</CatLProvider>
				</CatMProvider>
			</CatSProvider>
		</FormProvider>
	);
};

A011FormContainer.displayName = "A011FormContainer";
