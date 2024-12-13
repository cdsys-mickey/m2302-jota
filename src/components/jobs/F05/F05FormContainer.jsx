import { useMemo } from "react";
import F05Form from "./F05Form";
import { FormProvider, useFormContext } from "react-hook-form";
import { useContext } from "react";
import { F05Context } from "@/contexts/F05/F05Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useInit } from "@/shared-hooks/useInit";
import { useEffect } from "react";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const F05FormContainer = () => {
	const form = useFormContext();
	const { reset } = form;
	const f05 = useContext(F05Context);

	const onSubmit = useMemo(() => {
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
				<F05Form onSubmit={onSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

F05FormContainer.displayName = "F05FormContainer";

