import { FormProvider, useFormContext } from "react-hook-form";
import P15Form from "./P15Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { P15Context } from "./P15Context";

export const P15FormContainer = () => {
	const form = useFormContext();
	const p15 = useContext(P15Context);

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			p15.onSubmit,
			p15.onSubmitError
		)
	}, [p15.onSubmit, p15.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			p15.onDebugSubmit,
		)
	}, [p15.onDebugSubmit, form]);

	return <FormProvider {...form}>
		<FormMetaProvider {...p15.formMeta}>
			<P15Form
				onDebugSubmit={onDebugSubmit}
				onSubmit={onSubmit}
			// onSelect={p15.onSelect({ setValue: form.setValue })}
			/>
		</FormMetaProvider>
	</FormProvider>;
};

P15FormContainer.displayName = "P15FormContainer";



