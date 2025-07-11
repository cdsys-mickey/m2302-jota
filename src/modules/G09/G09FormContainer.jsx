import { G09Context } from "@/modules/G09/G09Context";
import { FormMetaProvider } from "@/shared-components";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import G09Form from "./G09Form";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Forms from "@/shared-modules/Forms.mjs";

export const G09FormContainer = () => {
	const form = useFormContext();
	const g09 = useContext(G09Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			g09.onSubmit,
			g09.onSubmitError
		)
	}, [g09.onSubmit, g09.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			g09.onDebugSubmit,
		)
	}, [g09.onDebugSubmit, form]);

	const retail = useWatch({
		name: "retail",
		control: form.control
	})

	const reportType = useWatch({
		name: "RptType",
		control: form.control
	})

	const onSessionChanged = useCallback((newSession) => {
		form.setValue("CustID", null);

		if (newSession?.AccYM) {
			form.setValue("AccYM", Forms.parseDate(newSession?.AccYM + "/01"))
		}
	}, [form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...g09.formMeta}>
			<G09Form
				forNewCustomer={retail}
				onSubmit={handleSubmit}
				onDebugSubmit={onDebugSubmit}
				onSessionChanged={onSessionChanged}
				htmlOnly={reportType?.id == 2}
			/>
		</FormMetaProvider>
	</FormProvider>;
};

G09FormContainer.displayName = "G09FormContainer";






