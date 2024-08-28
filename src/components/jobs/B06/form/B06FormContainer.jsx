import { FormProvider, useFormContext } from "react-hook-form";
import B06Form from "./B06Form";
import { useContext } from "react";
import { B06Context } from "@/contexts/B06/B06Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useMemo } from "react";
import { useCallback } from "react";

export const B06FormContainer = () => {
	const b06 = useContext(B06Context);
	const form = useFormContext({
		defaultValues: {
			quotes: [],
		},
	});

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			b06.onSearchSubmit,
			b06.onSearchSubmitError
		)
	}, [b06.onSearchSubmit, b06.onSearchSubmitError, form]);

	const handleLastField = useCallback(() => {
		document.activeElement.blur();
		handleSubmit();
	}, [handleSubmit]);

	const formMeta = useFormMeta(
		`
		supplier,
		supplier2,
		date1,
		date2,
		sprod,
		eprod,
		orderBy
		`,
		{
			lastField: handleLastField
		}
	);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta}>
				<B06Form onSubmit={handleSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

B06FormContainer.displayName = "B06FormContainer";
