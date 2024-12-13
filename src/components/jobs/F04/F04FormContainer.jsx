import { useMemo } from "react";
import F04Form from "./F04Form";
import { FormProvider, useFormContext } from "react-hook-form";
import { useContext } from "react";
import { F04Context } from "@/contexts/F04/F04Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useInit } from "@/shared-hooks/useInit";
import { useEffect } from "react";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const F04FormContainer = () => {
	const form = useFormContext();
	const { reset } = form;
	const f04 = useContext(F04Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			f04.onSubmit,
			f04.onSubmitError
		)
	}, [f04.onSubmit, f04.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			f04.onDebugSubmit,
		)
	}, [f04.onDebugSubmit, form]);

	useInit(() => {
		f04.load();
	}, []);

	useChangeTracking(() => {
		if (f04.itemDataReady) {
			console.log("f04 form reset", f04.itemData);
			reset(f04.itemData);
		}
	}, [f04.itemData, f04.itemDataReady]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...f04.formMeta}>
				<F04Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

F04FormContainer.displayName = "F04FormContainer";

