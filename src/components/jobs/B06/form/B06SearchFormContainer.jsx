import { FormProvider, useFormContext } from "react-hook-form";
import B06Form from "./B06SearchForm";
import { useContext } from "react";
import { B06Context } from "@/contexts/B06/B06Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useMemo } from "react";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const B06SearchFormContainer = () => {
	const b06 = useContext(B06Context);
	const form = useFormContext({
		defaultValues: {
			quotes: [],
		},
	});


	const formMeta = useFormMeta(
		`
		lvSupplier,
		lvSupplier2,
		date1,
		date2,
		sprod,
		eprod,
		orderBy
		`
	);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta}>
				<form >
					<B06Form />
				</form>
			</FormMetaProvider>
		</FormProvider>
	);
};

B06SearchFormContainer.displayName = "B06SearchFormContainer";
