import { useMemo } from "react";
import F06Form from "./F06Form";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { useContext } from "react";
import { F06Context } from "@/contexts/F06/F06Context";
import { FormMetaProvider } from "@/shared-components";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const F06FormContainer = () => {
	const form = useFormContext();
	const f06 = useContext(F06Context);

	const accEntry = useWatch({
		name: "accEntry",
		control: form.control
	})

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			f06.onSubmit,
			f06.onSubmitError
		)
	}, [f06.onSubmit, f06.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			f06.onDebugSubmit,
		)
	}, [f06.onDebugSubmit, form]);

	useChangeTracking(() => {
		form.setValue("PhyIDs", accEntry?.PhyIDs || "")
	}, [accEntry]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...f06.formMeta}>
				<F06Form onSubmit={handleSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

F06FormContainer.displayName = "F06FormContainer";

