import { FormProvider, useForm, useWatch } from "react-hook-form";
import { RhfTabTestForm } from "./RhfTabTestForm";
import { useContext, useMemo } from "react";
import { RHFTabTestContext } from "./RHFTabTestContext";
import { useCallback } from "react";
import { FormManagerProvider } from "@/shared-contexts/form-manager/FormManagerProvider";

export const RhfTabTestFormContainer = () => {
	const form = useForm();
	const { formManager, ...rest } = useContext(RHFTabTestContext);

	const text2 = useWatch({ name: "text2", control: form.control });

	const text3Disabled = useMemo(() => {
		return !text2 || isNaN(text2);
	}, [text2]);

	const isDisabled = useCallback(
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
			<FormManagerProvider {...formManager} isDisabled={isDisabled}>
				<RhfTabTestForm text3Disabled={text3Disabled} {...rest} />
			</FormManagerProvider>
		</FormProvider>
	);
};

RhfTabTestFormContainer.displayName = "RhfTabTestFormContainer";
