/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SettingsContext } from "@/contexts/settings/SettingsContext";
import ChangePwordForm from "./ChangePwordForm";

export const ChangePwordFormContainer = () => {
	const settings = useContext(SettingsContext);
	const form = useForm({
		defaultValues: {
			newPword: "",
			newPword2: "",
		},
	});
	const { setError, reset } = form;

	return (
		<FormProvider {...form}>
			<ChangePwordForm
				verified={settings.verified}
				loading={settings.loading}
				onSubmit={
					settings.verified
						? form.handleSubmit(
								settings.onChangePwordSubmit({
									setError,
									reset,
								}),
								settings.onChangePwordSubmitError
						  )
						: form.handleSubmit(
								settings.onVerifySubmit({ setError, reset }),
								settings.onVerifySubmitError
						  )
				}
			/>
		</FormProvider>
	);
};

ChangePwordFormContainer.displayName = "ChangePwordFormContainer";
