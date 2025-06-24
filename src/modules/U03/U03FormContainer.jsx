import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import U03Form from "./U03Form";
import { U03Context } from "@/modules/U03/U03Context";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const U03FormContainer = () => {
	const form = useFormContext();
	const u03 = useContext(U03Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			u03.onSubmit,
			u03.onSubmitError
		)
	}, [u03.onSubmit, u03.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u03.onDebugSubmit,
		)
	}, [u03.onDebugSubmit, form]);

	const catL = useWatch({
		name: "catL",
		control: form.control,
	});


	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "catM":
					return !catL;
				default:
					return false;
			}
		},
		[catL]
	);

	return <FormProvider {...form}>
		<FormMetaProvider {...u03.formMeta} isFieldDisabled={isFieldDisabled}>
			<U03Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
		</FormMetaProvider>
	</FormProvider>;
};

U03FormContainer.displayName = "U03FormContainer";



