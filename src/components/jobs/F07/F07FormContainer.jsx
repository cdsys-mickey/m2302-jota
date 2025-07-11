import { useMemo } from "react";
import F07Form from "./F07Form";
import { FormProvider, useFormContext } from "react-hook-form";
import { useContext } from "react";
import { F07Context } from "@/contexts/F07/F07Context";
import { FormMetaProvider } from "@/shared-components";
import { useInit } from "@/shared-hooks/useInit";
import { useEffect } from "react";

export const F07FormContainer = () => {
	const form = useFormContext();
	const { reset } = form;
	const f07 = useContext(F07Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			f07.onSubmit,
			f07.onSubmitError
		)
	}, [f07.onSubmit, f07.onSubmitError, form]);

	useInit(() => {
		f07.load();
	}, []);

	useEffect(() => {
		if (f07.itemDataReady) {
			console.log("f07 form reset", f07.itemData);
			reset(f07.itemData);
		}
	}, [f07.itemData, f07.itemDataReady, reset]);


	return (
		<FormProvider {...form}>
			<FormMetaProvider {...f07.formMeta}>
				<F07Form onSubmit={handleSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

F07FormContainer.displayName = "F07FormContainer";

