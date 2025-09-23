import { AuthContext } from "@/contexts/auth/AuthContext";
import { FormMetaProvider } from "@/shared-components";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import Auth from "../Auth.mjs";
import { U06Context } from "./U06Context";
import U06Form from "./U06Form";

export const U06FormContainer = () => {
	const form = useFormContext();
	const u06 = useContext(U06Context);
	const { operator } = useContext(AuthContext);

	const deptDisabled = useMemo(() => {
		return operator?.Class < Auth.SCOPES.BRANCH_HQ && operator.CurHeadOffice != 1;
	}, [operator?.Class, operator.CurHeadOffice])

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			u06.onSubmit,
			u06.onSubmitError
		)
	}, [u06.onSubmit, u06.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u06.onDebugSubmit,
		)
	}, [u06.onDebugSubmit, form]);

	return (
		<FormMetaProvider {...u06.formMeta}>
			<U06Form
				onSubmit={handleSubmit}
				onDebugSubmit={onDebugSubmit}
				deptDisabled={deptDisabled}
			/>
		</FormMetaProvider>
	);
};

U06FormContainer.displayName = "U06FormContainer";



