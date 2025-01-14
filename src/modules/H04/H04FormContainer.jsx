import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import H04Form from "./H04Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H04Context } from "./H04Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useCallback } from "react";

export const H04FormContainer = () => {
	const form = useFormContext();
	const h04 = useContext(H04Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			catL,
			catM,
			InclTX,
			InclTest,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h04.onSubmit,
			h04.onSubmitError
		)
	}, [h04.onSubmit, h04.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h04.onDebugSubmit,
		)
	}, [h04.onDebugSubmit, form]);

	const catL = useWatch({
		name: "catL",
		control: form.control,
	});


	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "catM":
					return !catL;
				default:
					return false;
			}
		},
		[catL]
	);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
				<H04Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H04FormContainer.displayName = "H04FormContainer";




