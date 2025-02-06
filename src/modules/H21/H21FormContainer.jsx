import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import H21Form from "./H21Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H21Context } from "./H21Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useCallback } from "react";

export const H21FormContainer = () => {
	const form = useFormContext();
	const h21 = useContext(H21Context);

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
			h21.onSubmit,
			h21.onSubmitError
		)
	}, [h21.onSubmit, h21.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h21.onDebugSubmit,
		)
	}, [h21.onDebugSubmit, form]);

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
				<H21Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H21FormContainer.displayName = "H21FormContainer";




