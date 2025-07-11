import { F05Context } from "@/contexts/F05/F05Context";
import { FormMetaProvider } from "@/shared-components";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useInit } from "@/shared-hooks/useInit";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import F05Form from "./F05Form";

export const F05FormContainer = () => {
	const form = useFormContext();
	const { reset } = form;
	const f05 = useContext(F05Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			f05.onSubmit,
			f05.onSubmitError
		)
	}, [f05.onSubmit, f05.onSubmitError, form]);

	useInit(() => {
		f05.load();
	}, []);

	useChangeTracking(() => {
		if (f05.itemDataReady) {
			console.log("f05 form reset", f05.itemData);
			reset(f05.itemData);
		}
	}, [f05.itemData, f05.itemDataReady]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...f05.formMeta}>
				<F05Form onSubmit={handleSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

F05FormContainer.displayName = "F05FormContainer";

