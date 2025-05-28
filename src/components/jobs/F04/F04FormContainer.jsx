import { F04Context } from "@/contexts/F04/F04Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useInit } from "@/shared-hooks/useInit";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import F04Form from "./F04Form";

export const F04FormContainer = () => {
	const form = useFormContext();
	const { reset } = form;
	const f04 = useContext(F04Context);

	const handleSubmit = useMemo(() => {
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

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})


	useChangeTracking(() => {
		if (f04.itemDataReady) {
			console.log("f04 form reset", f04.itemData);
			reset(f04.itemData);
		}
	}, [f04.itemData, f04.itemDataReady]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...f04.formMeta}>
				<F04Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

F04FormContainer.displayName = "F04FormContainer";

