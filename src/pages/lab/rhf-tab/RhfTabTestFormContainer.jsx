import { FormProvider, useForm, useWatch } from "react-hook-form";
import { RhfTabTestForm } from "./RhfTabTestForm";
import { useContext, useMemo } from "react";
import { RHFTabTestContext } from "./RHFTabTestContext";
import { useCallback } from "react";
import { FormMetaProvider } from "@/shared-components";

export const RhfTabTestFormContainer = () => {
	const form = useForm();
	const { formMeta, ...rest } = useContext(RHFTabTestContext);

	const text2 = useWatch({ name: "text2", control: form.control });

	const text3Disabled = useMemo(() => {
		return !text2 || isNaN(text2);
	}, [text2]);

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "text3":
					return text3Disabled;
				default:
					return false;
			}
		},
		[text3Disabled]
	);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
				<RhfTabTestForm text3Disabled={text3Disabled} {...rest} />
			</FormMetaProvider>
		</FormProvider>
	);
};

RhfTabTestFormContainer.displayName = "RhfTabTestFormContainer";
