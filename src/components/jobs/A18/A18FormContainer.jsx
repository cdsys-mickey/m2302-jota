import { useMemo } from "react";
import A18Form from "./A18Form";
import { FormProvider, useFormContext } from "react-hook-form";
import { useContext } from "react";
import { A18Context } from "@/contexts/A18/A18Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "@/modules/md-auth";
import { useCallback } from "react";

export const A18FormContainer = () => {
	const form = useFormContext();
	const a18 = useContext(A18Context);
	const { operator } = useContext(AuthContext);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			a18.onSubmit,
			a18.onSubmitError
		)
	}, [a18.onSubmit, a18.onSubmitError, form]);

	// const handleClick = useCallback((e) => {
	// 	return form.handleSubmit(
	// 		data => a18.onSubmit(data, e),
	// 		a18.onSubmitError
	// 	)();
	// }, [a18, form])

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			a18.onDebugSubmit,
		)
	}, [a18.onDebugSubmit, form]);

	const deptDisabled = useMemo(() => {
		return operator?.Class < Auth.SCOPES.ROOT;
	}, [operator?.Class])

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...a18.formMeta}>
				<A18Form
					onSubmit={handleSubmit}
					// onSubmit={handleClick}
					onDebugSubmit={onDebugSubmit}
					deptDisabled={deptDisabled}
				/>
			</FormMetaProvider>
		</FormProvider>
	);
};

A18FormContainer.displayName = "A18FormContainer";
