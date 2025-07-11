import { AuthContext } from "@/contexts/auth/AuthContext";
import { FormMetaProvider } from "@/shared-components";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import Auth from "../md-auth";
import { U08Context } from "./U08Context";
import U08Form from "./U08Form";

export const U08FormContainer = () => {
	const form = useFormContext();
	const { operator } = useContext(AuthContext);
	const u08 = useContext(U08Context);

	const deptDisabled = useMemo(() => {
		return operator?.Class < Auth.SCOPES.ROOT;
	}, [operator?.Class])

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			u08.onSubmit,
			u08.onSubmitError
		)
	}, [u08.onSubmit, u08.onSubmitError, form]);

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			u08.onDebugSubmit,
		)
	}, [u08.onDebugSubmit, form]);

	return (
		<FormMetaProvider {...u08.formMeta}>
			<U08Form
				onSubmit={handleSubmit}
				onDebugSubmit={onDebugSubmit}
				deptDisabled={deptDisabled}
			/>
		</FormMetaProvider>
	);
};

U08FormContainer.displayName = "U08FormContainer";




