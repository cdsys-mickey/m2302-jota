import { FormProvider, useFormContext } from "react-hook-form";
import P51Form from "./P51Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { P51Context } from "./P51Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useHotkeys } from "react-hotkeys-hook";

export const P51FormContainer = () => {
	const form = useFormContext();
	const p51 = useContext(P51Context);

	const formMeta = useFormMeta(
		`
		SOrdDate,
		EOrdDate,
		SArrDate,
		EArrDate,
		STrvID,
		ETrvID,
		SCarID,
		ECarID,
		reportType,
		OrdName,
		outputType,
		`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			p51.onSubmit,
			p51.onSubmitError
		)
	}, [p51.onSubmit, p51.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p51.onDebugSubmit,
		)
	}, [p51.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...formMeta}>
			<P51Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

P51FormContainer.displayName = "P51FormContainer";






