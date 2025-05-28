import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { H11Context } from "./H11Context";
import H11Form from "./H11Form";
import { useHotkeys } from "react-hotkeys-hook";

export const H11FormContainer = () => {
	const form = useFormContext();
	const h11 = useContext(H11Context);

	const formMeta = useFormMeta(
		`
			Year,
			Season,
			SAreaID,
			EAreaID,
			SLineID,
			ELineID,
			SalType,
			TopNo,
			reportType,
			outputType,
			ranks[0],
			numbers[0],
			ranks[1],
			numbers[1],
			ranks[2],
			numbers[2],
			ranks[3],
			numbers[3],
			ranks[4],
			numbers[4],
			ranks[5],
			numbers[5],
			`
	)

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			h11.onSubmit,
			h11.onSubmitError
		)
	}, [h11.onSubmit, h11.onSubmitError, form]);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h11.onDebugSubmit,
		)
	}, [h11.onDebugSubmit, form]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} >
				<H11Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H11FormContainer.displayName = "H11FormContainer";






