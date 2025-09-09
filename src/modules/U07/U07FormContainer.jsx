import { FormProvider, useFormContext } from "react-hook-form";
import U07Form from "./U07Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-components";
import { U07Context } from "./U07Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Auth from "../md-auth";
import { useHotkeys } from "react-hotkeys-hook";

export const U07FormContainer = () => {
	const form = useFormContext();
	const u07 = useContext(U07Context);
	const auth = useContext(AuthContext);
	const { operator } = auth;

	const deptDisabled = useMemo(() => {
		return operator?.Class < Auth.SCOPES.ROOT && operator.CurHeadOffice != 1;
	}, [operator?.Class, operator.CurHeadOffice])


	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			u07.onSubmit,
			u07.onSubmitError
		)
	}, [u07.onSubmit, u07.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u07.onDebugSubmit,
		)
	}, [u07.onDebugSubmit, form]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...u07.formMeta}>
				<U07Form
					onSubmit={handleSubmit}
					onDebugSubmit={onDebugSubmit}
					scope={operator.CurHeadOffice ? Auth.SCOPES.BRANCH_HQ : Auth.SCOPES.DEPT}
					deptDisabled={deptDisabled}
				/>
			</FormMetaProvider>
		</FormProvider>
	);
};

U07FormContainer.displayName = "U07FormContainer";




