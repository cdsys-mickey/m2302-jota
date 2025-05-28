import { G07Context } from "@/modules/G07/G07Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import G07Form from "./G07Form";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const G07FormContainer = () => {
	const form = useFormContext();
	const g07 = useContext(G07Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			g07.onSubmit,
			g07.onSubmitError
		)
	}, [g07.onSubmit, g07.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	const onSessionChanged = useCallback(() => {
		form.setValue("CustID", null);
	}, [form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...g07.formMeta}>
			<G07Form
				forNewCustomer={retail}
				onSubmit={handleSubmit}
				onSessionChanged={onSessionChanged}
			/>
		</FormMetaProvider>
	</FormProvider>;
};

G07FormContainer.displayName = "G07FormContainer";








