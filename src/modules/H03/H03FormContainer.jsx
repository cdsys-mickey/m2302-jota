import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import H03Form from "./H03Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { H03Context } from "./H03Context";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const H03FormContainer = () => {
	const form = useFormContext();
	const h03 = useContext(H03Context);

	const formMeta = useFormMeta(
		`
			SDate,
			EDate,
			catL,
			catM,
			InclTX,
			InclTest,
			outputType,
			`
	)

	const handleSubmit = useMemo(() => {
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



	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
				<H03Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H03FormContainer.displayName = "H03FormContainer";



