import { FormProvider, useFormContext } from "react-hook-form";
import H01Form from "./H01Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H01Context } from "./H01Context";

export const H01FormContainer = () => {
	const form = useFormContext();
	const h01 = useContext(H01Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h01.onSubmit,
			h01.onSubmitError
		)
	}, [h01.onSubmit, h01.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h01.onDebugSubmit,
		)
	}, [h01.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h01.formMeta}>
			<H01Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H01FormContainer.displayName = "H01FormContainer";


