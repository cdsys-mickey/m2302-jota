import { FormProvider, useFormContext } from "react-hook-form";
import H03Form from "./H03Form";
import { H03Context } from "@/contexts/H03/H03Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

export const H03FormContainer = () => {
	const form = useFormContext();
	const h03 = useContext(H03Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h03.onSubmit,
			h03.onSubmitError
		)
	}, [h03.onSubmit, h03.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h03.onDebugSubmit,
		)
	}, [h03.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...h03.formMeta}>
			<H03Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

H03FormContainer.displayName = "H03FormContainer";



