import { A18Context } from "@/contexts/A18/A18Context";
import { FormMetaProvider } from "@/shared-components";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import A18Form from "./A18Form";

export const A18FormContainer = () => {
	const form = useFormContext();
	const a18 = useContext(A18Context);
	// const { operator } = useContext(AuthContext);

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

	const handleDebugSubmit = form.handleSubmit(a18.onDebugSubmit)

	// const deptDisabled = useMemo(() => {
	// 	return operator?.Class < Auth.SCOPES.ROOT;
	// }, [operator?.Class])

	useHotkeys(["Shift+Enter", "Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return (
		<FormMetaProvider {...a18.formMeta}>
			<A18Form
				onSubmit={handleSubmit}
				// onSubmit={handleClick}
				onDebugSubmit={handleDebugSubmit}
			// deptDisabled={deptDisabled}
			/>
		</FormMetaProvider>
	);
};

A18FormContainer.displayName = "A18FormContainer";
