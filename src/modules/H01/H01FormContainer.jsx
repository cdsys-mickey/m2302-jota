import { FormProvider, useFormContext } from "react-hook-form";
import H01Form from "./H01Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H01Context } from "./H01Context";
import { useHotkeys } from "react-hotkeys-hook";

export const H01FormContainer = () => {
	const form = useFormContext();
	const h01 = useContext(H01Context);

	const handleSubmit = useMemo(() => {
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

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return <FormProvider {...form}>
		<FormMetaProvider {...h01.formMeta}>
			<H01Form
				onDebugSubmit={onDebugSubmit}
				onSubmit={handleSubmit}
			// onSelect={h01.onSelect({ setValue: form.setValue })}
			/>
		</FormMetaProvider>
	</FormProvider>;
};

H01FormContainer.displayName = "H01FormContainer";


